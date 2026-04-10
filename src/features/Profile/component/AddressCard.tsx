"use client";

import { faLocationDot, faPhone, faCity, faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AddressData } from "../types/address.type";
import { deleteAddress } from "../server/address.action";
import { toast } from "react-toastify";

export default function AddressCard({ address , onDelete, onEdit}: { address: AddressData ,onDelete: (id: string) => void , onEdit: (address: AddressData) => void}) {
    const { name, details, city, phone,_id } = address;

    const handleDelete = async () => {
        try {
            const response = await deleteAddress({id: _id})
            if(response?.status === "success"){
                toast.success("Address deleted successfully!")
                onDelete(_id)
            }
            
        } catch (error) {
            toast.error("Failed to delete address.")
        }
    }

    const handleEdit = () => {
        onEdit(address);
    };

    return (
        <div className="relative rounded-3xl bg-gradient-to-r from-white via-gray-50 to-white shadow-xl px-5 py-6 w-full hover:shadow-2xl transition-all duration-300">
        
        {/* Delete Button */}
        <button className="absolute top-4 right-4 group w-9 h-9 rounded-full flex items-center justify-center bg-gray-100 text-gray-400 transition-all duration-300 hover:bg-red-50 hover:text-red-500 hover:scale-110 hover:rotate-6">
            <FontAwesomeIcon icon={faTrash} onClick={handleDelete} className="text-sm transition-all duration-300 group-hover:scale-110" />
        </button>

        {/* Edit Button */}
        <button 
        onClick={handleEdit}
            className="absolute top-16 right-4 group w-9 h-9 rounded-full flex items-center justify-center bg-gray-100 text-gray-400 transition-all duration-300 hover:bg-blue-50 hover:text-blue-500 hover:scale-110 hover:-rotate-6"
        >
            <FontAwesomeIcon icon={faPen} className="text-sm transition-all duration-300 group-hover:scale-110" />
        </button>

        {/* Top icon */}
        <div className="flex items-start gap-6">
            <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center shadow-inner">
                <FontAwesomeIcon icon={faLocationDot} className="text-green-600 text-2xl" />
            </div>

            <div className="flex-1">
                <h3 className="font-bold text-gray-900 text-xl mb-1">
                    {name || "Unnamed Address"}
                </h3>
                <p className="text-gray-500 text-xs mb-3">
                    {details || "No details available"}
                </p>

                <div className="flex gap-6 text-gray-700 text-xs">
                    <span className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faPhone} className="text-green-500" />
                        {phone || "No phone number provided"}
                    </span>

                    <span className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faCity} className="text-green-500" />
                        {city || "No city provided"}
                    </span>
                </div>
            </div>
        </div>
        </div>
    );
}