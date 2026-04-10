"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBoxOpen,
    faTag,
    faLayerGroup,
    faStore,
    faCartShopping,
    faCircleCheck,
    faShieldHalved,
    faTruckFast,
    faMedal,
    } from "@fortawesome/free-solid-svg-icons";
import { Product } from "@/features/Products/Types/Products.types";

    export default function ProductsDetailsTab({ product }: { product: Product}) {
        const {brand, category, subcategory, sold ,description} = product
    return (
        <div className="w-full bg-white rounded-xl shadow-sm p-6 space-y-8">
        
        {/* About Section */}
        <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
            About this Product
            </h2>

            <p className="text-gray-600">
            {description}
            </p>
        </div>

        {/* Two Columns Section */}
        <div className="grid md:grid-cols-2 gap-6">
            
            {/* Product Information Card */}
            <div className="bg-gray-50 rounded-xl p-6 border-2 border-green-500">
            <h3 className="text-md font-semibold text-gray-800 mb-5 flex items-center gap-2">
                <FontAwesomeIcon icon={faBoxOpen} className="text-gray-600" />
                Product Information
            </h3>

            <div className="space-y-4 text-sm">
                
                <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-gray-500">
                    <FontAwesomeIcon icon={faTag} className="text-green-600" />
                    Category
                </div>
                <span className="font-medium text-gray-800">
                    {category.name}
                </span>
                </div>

                <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-gray-500">
                    <FontAwesomeIcon icon={faLayerGroup} className="text-green-600" />
                    Subcategory
                </div>
                <span className="font-medium text-gray-800">
                    {subcategory[0].name}
                </span>
                </div>

                <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-gray-500">
                    <FontAwesomeIcon icon={faStore} className="text-green-600" />
                    Brand
                </div>
                <span className="font-medium text-gray-800">
                    {brand.name}
                </span>
                </div>

                <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-gray-500">
                    <FontAwesomeIcon icon={faCartShopping} className="text-green-600" />
                    Items Sold
                </div>
                <span className="font-semibold text-gray-900">
                    {sold}
                </span>
                </div>
            </div>
            </div>

            {/* Key Features Card */}
            <div className="bg-gray-50 rounded-xl p-6 border-2 border-green-500">
            <h3 className="text-md font-semibold text-gray-800 mb-5 flex items-center gap-2">
                <FontAwesomeIcon icon={faMedal} className="text-gray-600" />
                Key Features
            </h3>

            <div className="space-y-4 text-sm">

                <div className="flex items-center gap-3 text-gray-700">
                <FontAwesomeIcon icon={faCircleCheck} className="text-green-600" />
                Premium Quality Product
                </div>

                <div className="flex items-center gap-3 text-gray-700">
                <FontAwesomeIcon icon={faShieldHalved} className="text-green-600" />
                100% Authentic Guarantee
                </div>

                <div className="flex items-center gap-3 text-gray-700">
                <FontAwesomeIcon icon={faTruckFast} className="text-green-600" />
                Fast & Secure Packaging
                </div>

                <div className="flex items-center gap-3 text-gray-700">
                <FontAwesomeIcon icon={faCircleCheck} className="text-green-600" />
                Quality Tested
                </div>

            </div>
            </div>

        </div>
        </div>
    );
};

