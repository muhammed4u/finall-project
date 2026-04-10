import { faCity, faHome, faInfoCircle, faMapMarkedAlt, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { shippingAddressValues } from "../Schema/Checkout.schema";


    interface shippingFormProps {
        register: UseFormRegister<shippingAddressValues>,
        errors: FieldErrors<shippingAddressValues>
    }

export default function ShippingForm({errors, register}: shippingFormProps) {

    return (
        <>
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
            <div className="bg-linear-to-r from-green-500  to-green-600 px-6 py-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <FontAwesomeIcon icon={faHome}/>
                    Shipping Address
                </h2>
                <p className="text-green-100 text-sm mt-1">
                    Where should we deliver your order?
                </p>
            </div>
            <div className="p-6 space-y-5">
                {/* Info Banner */}
                <div className="flex flex-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <div className="h-8 w-8 rounded-full bg-blue-100 shrink-0 flex items-center justify-center">
                        <FontAwesomeIcon icon={faInfoCircle} className="text-blue-600 text-sm"/>
                    </div>
                    <div>
                        <p className="font-medium text-sm text-blue-600">
                            Delivery Information
                        </p>
                        <p className="mt-0.5 text-sm text-blue-600">
                            {"Please ensure your address is accurate for smooth delivery"}
                        </p>
                    </div>
                </div>
                {/* City */}
                <div>
                    <label htmlFor="city"
                    className="block text-sm font-semibold text-gray-700 mb-2">
                        City <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                            <FontAwesomeIcon icon={faCity} className="text-gray-500 text-sm"/>
                        </div>
                        <input type="text" id="city" 
                        className={`w-full px-4 py-3.5 pl-14 border-2 rounded-xl focus:outline-none transition-all 
                        ${errors.city ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100" : "border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100"}`}
                        placeholder="e.g. Cairo, Alexandria, Giza"
                        {...register("city")}/>
                    </div>
                    {errors.city && (
                        <p className="text-sm text-red-600 mt-2 flex items-center gap-1">
                            <span className="w-1 h-1 inline-block rounded-full bg-red-500"></span>
                            {errors.city.message}
                        </p>
                    )}
                </div>
                {/* Address */}
                <div>
                    <label htmlFor="dtails"
                    className="block text-sm font-semibold text-gray-700 mb-2">
                        Street Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                            <FontAwesomeIcon icon={faMapMarkedAlt} className="text-gray-500 text-sm"/>
                        </div>
                        <textarea id="details" 
                        className={`w-full px-4 py-3.5 pl-14 border-2 rounded-xl focus:outline-none transition-all resize-none 
                        ${errors.details ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100" : "border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100"}`}
                        placeholder="Street name, building number, floor, apartment"
                        {...register("details")}/>
                    </div>
                    {errors.details && (
                        <p className="text-sm text-red-600 mt-2 flex items-center gap-1">
                            <span className="w-1 h-1 inline-block rounded-full bg-red-500"></span>
                            {errors.details.message}
                        </p>
                    )}
                </div>
                {/* Phone */}
                <div>
                    <label htmlFor="phone"
                    className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                            <FontAwesomeIcon icon={faPhone} className="text-gray-500 text-sm"/>
                        </div>
                        <input type="tel" id="phone" 
                        className={`w-full px-4 py-3.5 pl-14 border-2 rounded-xl focus:outline-none transition-all 
                        ${errors.phone ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100" : "border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100"}`}
                        placeholder="01xxxxxxxxx"
                        {...register("phone")}/>
                        <span className="absolute right-4 top-1/2 -tramslate-y-1/2 text-sm text-gray-400">
                            Egyptian numbers only
                        </span>
                    </div>
                    {errors.phone && (
                        <p className="text-sm text-red-600 mt-2 flex items-center gap-1">
                            <span className="w-1 h-1 inline-block rounded-full bg-red-500"></span>
                            {errors.phone?.message}
                        </p>
                    )}
                </div>
            </div>
        </div>
        
        </>
    )
}

