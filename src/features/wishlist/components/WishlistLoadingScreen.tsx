"use client"
import { faHeart, faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function WishlistLoadingScreen() {
    const Skeleton = ({ className }: { className: string }) => (
        <div
            className={`bg-gray-200 rounded-md animate-pulse ${className}`}
            aria-hidden="true"
        />
    );

    return (
        <div className="min-h-screen py-8">
            <div className="container mx-auto px-4">

                <div className="mb-8">
                    <nav className="flex items-center gap-2 text-sm text-gray-400 mb-4 select-none">
                        <Skeleton className="w-14 h-4 rounded" />
                        <span>/</span>
                        <Skeleton className="w-20 h-4 rounded" />
                    </nav>

                    <div className="flex items-center gap-3 select-none">
                        <div className="bg-red-500 h-12 w-12 rounded-xl flex items-center justify-center text-white">
                            <FontAwesomeIcon icon={faHeart} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Skeleton className="w-40 h-8 rounded" />
                            <Skeleton className="w-20 h-4 rounded mt-1" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

                    <div className="hidden md:grid grid-cols-4 bg-gray-50 px-6 py-4 text-sm font-medium text-gray-400 select-none">
                        <span>Product</span>
                        <span>Price</span>
                        <span className="text-right">Actions</span>
                    </div>

                    <div className="divide-y divide-gray-100">
                        {[...Array(2)].map((_, index) => (
                            <div
                                key={index}
                                className="grid grid-cols-1 md:grid-cols-4 items-center gap-6 px-6 py-6"
                            >
                                
                                <div className="md:col-span-2 flex items-center gap-5">
                                    <Skeleton className="w-28 h-28 rounded-xl" />
                                    <div className="flex flex-col gap-2 w-full max-w-[400px]">
                                        <Skeleton className="w-full h-5 rounded" />
                                        <Skeleton className="w-3/5 h-4 rounded" />
                                    </div>
                                </div>

                                <div>
                                    <Skeleton className="w-20 h-6 rounded" />
                                    <Skeleton className="w-16 h-4 rounded mt-1" />
                                </div>

                                <div className="flex justify-end gap-3">
                                    <Skeleton className="w-24 h-10 rounded-xl" />
                                    <Skeleton className="w-10 h-10 rounded-xl" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-6 select-none">
                    <Link
                        href={"/"}
                        className="text-green-500 hover:text-green-600 transition font-medium flex items-center gap-2 pointer-events-none"
                    >
                        <FontAwesomeIcon icon={faArrowLeftLong} />
                        Continue shopping
                    </Link>
                </div>

            </div>
        </div>
    );
}
