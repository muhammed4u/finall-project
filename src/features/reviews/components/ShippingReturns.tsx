"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTruckFast,
    faRotateLeft,
    faCheck,
    faShieldHalved,
    } from "@fortawesome/free-solid-svg-icons";

    export default function ShippingReturnsTab() {
    return (
        <div className="w-full bg-white rounded-3xl border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.05)] p-6 sm:p-10">

        <div className="grid md:grid-cols-2 gap-6">

            <div className="bg-emerald-50 rounded-2xl p-6 sm:p-8">

            <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-md">
                <FontAwesomeIcon icon={faTruckFast} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                Shipping Information
                </h3>
            </div>

            <ul className="space-y-4 text-sm sm:text-base text-gray-700">
                <li className="flex items-start gap-3">
                <FontAwesomeIcon icon={faCheck} className="text-emerald-600 mt-1" />
                Free shipping on orders over $50
                </li>
                <li className="flex items-start gap-3">
                <FontAwesomeIcon icon={faCheck} className="text-emerald-600 mt-1" />
                Standard delivery: 3–5 business days
                </li>
                <li className="flex items-start gap-3">
                <FontAwesomeIcon icon={faCheck} className="text-emerald-600 mt-1" />
                Express delivery available (1–2 business days)
                </li>
                <li className="flex items-start gap-3">
                <FontAwesomeIcon icon={faCheck} className="text-emerald-600 mt-1" />
                Track your order in real-time
                </li>
            </ul>
            </div>

            <div className="bg-emerald-50 rounded-2xl p-6 sm:p-8">

            <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-md">
                <FontAwesomeIcon icon={faRotateLeft} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                Returns & Refunds
                </h3>
            </div>

            <ul className="space-y-4 text-sm sm:text-base text-gray-700">
                <li className="flex items-start gap-3">
                <FontAwesomeIcon icon={faCheck} className="text-emerald-600 mt-1" />
                30-day hassle-free returns
                </li>
                <li className="flex items-start gap-3">
                <FontAwesomeIcon icon={faCheck} className="text-emerald-600 mt-1" />
                Full refund or exchange available
                </li>
                <li className="flex items-start gap-3">
                <FontAwesomeIcon icon={faCheck} className="text-emerald-600 mt-1" />
                Free return shipping on defective items
                </li>
                <li className="flex items-start gap-3">
                <FontAwesomeIcon icon={faCheck} className="text-emerald-600 mt-1" />
                Easy online return process
                </li>
            </ul>
            </div>
        </div>

        <div className="mt-10 bg-gray-50 rounded-2xl sm:p-5 border border-gray-100">

            <div className="flex flex-col sm:flex-row sm:items-start gap-4">

            <div className="w-12 h-12 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center shrink-0">
                <FontAwesomeIcon icon={faShieldHalved} />
            </div>

            <div>
                <h4 className="text-lg font-semibold text-gray-900">
                Buyer Protection Guarantee
                </h4>
                <p className="mt-2 text-xs sm:text-base text-gray-600 leading-relaxed">
                Get a full refund if your order doesn't arrive or isn't as described.
                We ensure your shopping experience is safe, secure, and worry-free.
                </p>
            </div>

            </div>
        </div>

        </div>
    );
}