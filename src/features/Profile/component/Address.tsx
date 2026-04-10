"use client";
import { faLocationDot, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import AddAddressModal from "./AddAddressModal";
import AddressCard from "./AddressCard";
import { AddressData, AddressFormData } from "../types/address.type";
import { getAllUserAddresses } from "../server/address.action";
import AddressCardSkeleton from "./AddressCardSkeleton";

export default function Address() {
    const [isOpen, setIsOpen] = useState(false);
    const [addresses, setAddresses] = useState<AddressData[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedAddress, setSelectedAddress] = useState<AddressData | null>(null);

    const handleDeleteAddress = async () => {
    await fetchAddresses();
};

    const handleEditAddress = (address: AddressData) => {
        setSelectedAddress(address);
        setIsOpen(true);
    };

    const fetchAddresses = async () => {
        try {
            setLoading(true);
            const response = await getAllUserAddresses();
            setAddresses(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAddresses();
    }, []);

    const handleSaveAddress = async () => {
    await fetchAddresses();
    setIsOpen(false);
    setSelectedAddress(null);
};

    return (
        <>
        <div className="flex justify-between items-center mb-3">
            <h1 className="text-2xl font-bold text-gray-700">My address</h1>
            <button
            className="group relative inline-flex items-center gap-1 px-2 py-3 rounded-3xl text-white font-semibold bg-gradient-to-r from-green-600 to-emerald-500 shadow-xl transition-all duration-300 hover:shadow-2xl"
            onClick={() => setIsOpen(true)}
            >
            <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition rounded-2xl"></span>

            <FontAwesomeIcon icon={faPlus} className="relative z-10" />
            <span className="relative z-10 text-sm">Add New Address</span>
            </button>
        </div>
        {loading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[...Array(4)].map((_, index) => (
                <AddressCardSkeleton key={index} />
            ))}
        </div>
        ):addresses.length === 0 ? (
            <>
            <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 shadow-2xl p-12">
                <div className="absolute -top-20 -right-20 w-72 h-72 bg-emerald-200/30 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-green-200/30 rounded-full blur-3xl"></div>

                <div className="relative text-center">
                
                <div className="relative w-28 h-28 mx-auto mb-8">
                    <div className="absolute inset-0 bg-gradient-to-tr from-green-500 to-emerald-400 rounded-full blur-xl opacity-30"></div>
                    <div className="relative w-full h-full bg-white rounded-full flex items-center justify-center shadow-lg border border-gray-100">
                    <FontAwesomeIcon
                        icon={faLocationDot}
                        className="text-green-600 text-4xl"
                    />
                    </div>
                </div>

                <h2 className="text-3xl font-bold text-gray-800 mb-4 tracking-tight">
                    No Saved Addresses
                </h2>

                <p className="text-gray-500 max-w-lg mx-auto mb-10 leading-relaxed">
                    Add your first delivery address to enjoy faster checkout and a
                    more seamless shopping experience across your account.
                </p>

                <button
                    className="group relative inline-flex items-center gap-3 px-10 py-4 rounded-2xl text-white font-semibold bg-gradient-to-r from-green-600 to-emerald-500 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                    onClick={() => setIsOpen(true)}
                >
                    <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition rounded-2xl"></span>

                    <FontAwesomeIcon icon={faPlus} className="relative z-10" />
                    <span className="relative z-10">Add New Address</span>
                </button>
                </div>
            </div>
            </>
        ) : (
            <>
            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6">
            {addresses.map((address) => (
                <AddressCard key={address._id} address={address} onDelete={handleDeleteAddress} onEdit={handleEditAddress} />
            ))}
        </div>
            </>
        )}
        {isOpen && <AddAddressModal onClose={() => {setIsOpen(false), setSelectedAddress(null);}} onAdd={handleSaveAddress} editAddress={selectedAddress} />}
        </>
    );
}
