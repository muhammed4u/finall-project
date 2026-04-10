"use client"

export default function BrandCardSkeleton() {
    return (
        <div className="bg-gray-100 rounded-3xl p-6 border border-gray-200
                        shadow-[0_8px_30px_rgb(0,0,0,0.04)]
                        animate-pulse">

        {/* Image Skeleton */}
        <div className="bg-gray-200 rounded-2xl h-36 
                        border border-gray-100 
                        flex items-center justify-center">

            <div className="w-20 h-12 bg-gray-300 rounded-md" />
        </div>

        {/* Text Skeleton */}
        <div className="flex items-center justify-between mt-6">
            <div className="h-4 w-24 bg-gray-300 rounded-md" />
            <div className="h-4 w-4 bg-gray-300 rounded-full" />
        </div>
        </div>
    )
}