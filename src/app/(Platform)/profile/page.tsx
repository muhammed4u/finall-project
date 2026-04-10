"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faLocationDot,
    faGear,
    faArrowRight,
    } from "@fortawesome/free-solid-svg-icons";

    export default function ProfilePage() {
    return (
        <div className="bg-white border border-gray-200 rounded-3xl shadow-xl p-14">

        {/* Header */}
        <div className="max-w-2xl">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
            Account Overview
            </h2>
            <p className="mt-4 text-gray-500 text-lg leading-relaxed">
            Access and manage your personal information, delivery addresses,
            and account preferences.
            </p>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-200 my-12" />

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-8">

            {/* Addresses */}
            <Link
            href="/profile/addresses"
            className="group relative rounded-2xl border border-gray-200 p-8 transition-all duration-300 hover:border-green-500 hover:shadow-lg"
            >
            <div className="flex items-start gap-5">

                {/* Icon */}
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-green-100 text-green-600 group-hover:bg-green-600 group-hover:text-white transition">
                <FontAwesomeIcon icon={faLocationDot} />
                </div>

                {/* Content */}
                <div className="flex-1">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-green-600 transition">
                    My Addresses
                    </h3>

                    <FontAwesomeIcon
                    icon={faArrowRight}
                    className="text-gray-400 group-hover:translate-x-1 group-hover:text-green-600 transition-all"
                    />
                </div>

                <p className="mt-3 text-gray-500">
                    Add or manage your saved delivery locations for faster checkout.
                </p>
                </div>

            </div>
            </Link>

            {/* Settings */}
            <Link
            href="/profile/settings"
            className="group relative rounded-2xl border border-gray-200 p-8 transition-all duration-300 hover:border-green-500 hover:shadow-lg"
            >
            <div className="flex items-start gap-5">

                {/* Icon */}
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gray-100 text-gray-600 group-hover:bg-green-600 group-hover:text-white transition">
                <FontAwesomeIcon icon={faGear} />
                </div>

                {/* Content */}
                <div className="flex-1">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-green-600 transition">
                    Account Settings
                    </h3>

                    <FontAwesomeIcon
                    icon={faArrowRight}
                    className="text-gray-400 group-hover:translate-x-1 group-hover:text-green-600 transition-all"
                    />
                </div>

                <p className="mt-3 text-gray-500">
                    Update your personal details and secure your account.
                </p>
                </div>

            </div>
            </Link>

        </div>
        </div>
    );
    }