"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSpinner, faTimes } from "@fortawesome/free-solid-svg-icons";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addressSchema } from "../Schema/AddAddressSchema";
import { AddressData, AddressFormData } from "../types/address.type";
import { addAddress, deleteAddress } from "../server/address.action";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

export default function AddAddressModal({onClose, onAdd, editAddress}:{
    onClose: () => void;
    onAdd: () => void;
    editAddress?: AddressData | null;
}) {

    const [isSubmitting, setIsSubmitting] = useState(false)

    const { register, handleSubmit, formState: { errors } , reset } = useForm<AddressFormData>({
        resolver: zodResolver(addressSchema),
        defaultValues: {
            name: '',
            details: '',
            city: '',
            phone: ''
        },

    })

    useEffect(() => {
        if (editAddress) {
            reset({
                name: editAddress.name,
                details: editAddress.details,
                city: editAddress.city,
                phone: editAddress.phone
            });
        } else {
            reset({
                name: '',
                details: '',
                city: '',
                phone: ''
            });
        }
    }, [editAddress, reset]);

    const onSubmit: SubmitHandler<AddressFormData> = async (values) => {
    setIsSubmitting(true);

    try {
        if (editAddress) {
            await deleteAddress({ id: editAddress._id });

            const response = await addAddress({ values });

            if (response?.status === "success") {
                toast.success(response.message);
                onAdd();
                onClose();
            }

        } else {
            const response = await addAddress({ values });

            if (response?.status === "success") {
                toast.success("Address deleted successfully!");
                onAdd();
                onClose();
            }
        }

    } catch (error) {
        toast.error("Something went wrong");
    } finally {
        setIsSubmitting(false);
    }
};

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
        <div className="relative w-[420px] rounded-2xl bg-white p-6 shadow-2xl">

            <button className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200"
            onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} className="h-4 w-4" />
            </button>

            <h2 className="mb-6 text-xl font-semibold text-gray-800">
            {editAddress ? "Edit Address" : "Add New Address"}
            </h2>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4"> 
                <label className="mb-1 block text-sm font-medium text-gray-600">
                    Address Name
                </label>
                <input
                    type="text"
                    placeholder="e.g. Home, Office"
                    className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                    {...register('name')}
                />
                {errors.name && <p className="text-red-500 mt-0.5 text-sm">*{errors.name.message}</p>}
                </div>

                <div className="mb-4">
                <label className="mb-1 block text-sm font-medium text-gray-600">
                    Full Address
                </label>
                <textarea
                    rows={3}
                    placeholder="Street, building, apartment..."
                    className="w-full resize-none rounded-lg border border-gray-200 px-4 py-2 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                    {...register('details')}
                />
                {errors.details && <p className="text-red-500 mt-0.5 text-sm">*{errors.details.message}</p>}
                </div>

                <div className="mb-6 grid grid-cols-2 gap-4">
                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-600">
                    Phone Number
                    </label>
                    <input
                    type="text"
                    placeholder="01xxxxxxxxx"
                    className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                    {...register('phone')}
                />
                {errors.phone && <p className="text-red-500 mt-0.5 text-sm">*{errors.phone.message}</p>}
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-600">
                    City
                    </label>
                    <input
                    type="text"
                    placeholder="Cairo"
                    className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                    {...register('city')}
                    />
                    {errors.city && <p className="text-red-500 mt-0.5 text-sm">*{errors.city.message}</p>}
                </div>
                </div>

                <div className="flex justify-between gap-4">
                <button className="w-1/2 rounded-lg bg-gray-100 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200"
                onClick={onClose}
                type="button">
                    Cancel
                </button>

                <button className="w-1/2 rounded-lg bg-green-600 py-2 text-sm font-medium text-white shadow-md transition hover:bg-green-700 hover:shadow-lg disabled:opacity-70"
                type="submit"
                disabled={isSubmitting}>
                    {isSubmitting ? (
                        <>
                            <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" />
                            <span>{editAddress ? "Updating..." : "Adding..."}</span>
                        </>
                    ) : (
                        <>
                            <FontAwesomeIcon icon={faPlus} className="mr-2" />
                            <span>{editAddress ? "Update Address" : "Add Address"}</span>
                        </>
                    )}
                </button>
                </div>
            </form>
        </div>
        </div>
        
    );
}