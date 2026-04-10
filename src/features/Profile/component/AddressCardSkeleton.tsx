"use client";

export default function AddressCardSkeleton() {
    return (
        <div className="relative rounded-3xl bg-white shadow-xl px-5 py-6 w-full animate-pulse">

        <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-gray-200"></div>

        <div className="flex items-start gap-6">

            <div className="w-16 h-16 rounded-full bg-gray-200"></div>

            <div className="flex-1 space-y-3">

            <div className="h-5 w-40 bg-gray-200 rounded-md"></div>

            <div className="h-3 w-full bg-gray-200 rounded-md"></div>
            <div className="h-3 w-3/4 bg-gray-200 rounded-md"></div>

            <div className="flex gap-6 mt-3">
                <div className="h-3 w-24 bg-gray-200 rounded-md"></div>
                <div className="h-3 w-20 bg-gray-200 rounded-md"></div>
            </div>

            </div>
        </div>
        </div>
    );
}