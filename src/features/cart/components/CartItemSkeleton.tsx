"use client"

export default function CartItemSkeleton() {
    return (
        <div className="relative bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="py-4 sm:p-5 animate-pulse">
            <div className="flex gap-4 sm:gap-6">
            
            {/* Product Image Skeleton */}
            <div className="relative shrink-0">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-xl bg-gray-200 border border-gray-100" />
                <div className="absolute -bottom-1 -right-1 h-5 w-16 bg-gray-200 rounded" />
            </div>

            {/* Product Info */}
            <div className="flex-1 min-w-0 flex flex-col">
                
                {/* Title + Category */}
                <div className="mb-3 space-y-3">
                <div className="h-5 bg-gray-200 rounded w-3/4" />
                
                <div className="flex items-center gap-2">
                    <div className="h-6 w-20 bg-gray-200 rounded-full" />
                    <div className="h-3 w-3 bg-gray-200 rounded-full" />
                    <div className="h-4 w-24 bg-gray-200 rounded" />
                </div>
                </div>

                {/* Price */}
                <div className="mb-4">
                <div className="flex items-baseline gap-2">
                    <div className="h-6 w-24 bg-gray-200 rounded" />
                    <div className="h-4 w-16 bg-gray-200 rounded" />
                </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-auto flex flex-wrap items-center justify-between gap-4">
                
                {/* Quantity Controls */}
                <div className="flex items-center">
                    <div className="flex items-center bg-gray-100 p-1 rounded-xl border border-gray-200">
                    <div className="h-10 w-10 bg-gray-200 rounded-lg" />
                    <div className="w-12 h-6 bg-gray-200 rounded mx-2" />
                    <div className="h-10 w-10 bg-gray-200 rounded-lg" />
                    </div>
                </div>

                {/* Total + Remove */}
                <div className="flex items-center gap-4">
                    <div className="text-right space-y-2">
                    <div className="h-3 w-12 bg-gray-200 rounded ml-auto" />
                    <div className="h-6 w-20 bg-gray-200 rounded ml-auto" />
                    </div>

                    <div className="h-10 w-10 bg-gray-200 rounded-xl" />
                </div>

                </div>
            </div>

            </div>
        </div>
        </div>
    )
}