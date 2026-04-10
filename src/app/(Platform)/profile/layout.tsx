"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUser,
    faLocationDot,
    faGear,
    faChevronRight,
    } from "@fortawesome/free-solid-svg-icons";
    import { useSelector } from "react-redux";
    import { AppState } from "@/store/store";

    export default function ProfileLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { userInfo } = useSelector((appState: AppState) => appState.auth);

    return (
        <div className="min-h-screen bg-gray-50">
        {/* HEADER SECTION - Same original design but adjusted padding */}
        <div className="relative bg-linear-to-r from-green-500 to-emerald-500 text-white">
            <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>

            <div className="relative max-w-6xl mx-auto px-6 py-10 md:py-16">
            <div className="hidden md:flex items-center text-sm text-green-100 mb-6">
                <Link href="/" className="hover:text-white transition">Home</Link>
                <FontAwesomeIcon icon={faChevronRight} className="mx-2 text-xs" />
                <span className="text-white font-medium">My Account</span>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg border border-white/30">
                <FontAwesomeIcon icon={faUser} className="text-3xl" />
                </div>

                <div>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                    {userInfo?.name}
                </h1>
                <p className="text-green-50 mt-1 opacity-90">
                    Manage your profile, addresses and settings
                </p>
                </div>
            </div>
            </div>
        </div>

        {/* MAIN CONTENT AREA - Spacing instead of extreme negative margin */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
            <div className="flex flex-col lg:flex-row gap-8">
            
            {/* SIDEBAR - Fixed width on desktop, full width on mobile */}
            <aside className="w-full lg:w-72">
                <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-5">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 px-2">
                    Menu
                </h3>

                <nav className="space-y-2">
                    <Link
                    href="/profile/addresses"
                    className={`flex items-center justify-between px-4 py-3.5 rounded-xl transition-all font-semibold ${
                        pathname.includes("addresses")
                        ? "bg-green-600 text-white shadow-lg shadow-green-200"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                    >
                    <div className="flex items-center gap-3">
                        <FontAwesomeIcon icon={faLocationDot} className="w-5" />
                        <span>My Addresses</span>
                    </div>
                    <FontAwesomeIcon icon={faChevronRight} className="text-[10px] opacity-50" />
                    </Link>

                    <Link
                    href="/profile/settings"
                    className={`flex items-center justify-between px-4 py-3.5 rounded-xl transition-all font-semibold ${
                        pathname.includes("settings")
                        ? "bg-green-600 text-white shadow-lg shadow-green-200"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                    >
                    <div className="flex items-center gap-3">
                        <FontAwesomeIcon icon={faGear} className="w-5" />
                        <span>Settings</span>
                    </div>
                    <FontAwesomeIcon icon={faChevronRight} className="text-[10px] opacity-50" />
                    </Link>
                </nav>
                </div>
            </aside>

            {/* CONTENT PANEL */}
            <main className="flex-1 bg-white rounded-3xl shadow-sm border border-gray-200 p-6 md:p-10">
                {children}
            </main>

            </div>
        </div>
        </div>
    );
}