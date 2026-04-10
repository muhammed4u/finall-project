"use client";

export default function CategoryCardSkeleton() {
    return (
        <div className="group relative rounded-3xl overflow-hidden bg-white/70 backdrop-blur-sm border border-gray-200 shadow-sm animate-pulse">
        
        {/* Image Skeleton */}
        <div className="relative h-56 w-full bg-gray-300">
            <div className="absolute bottom-6 left-6 h-4 w-32 bg-gray-400 rounded" />
        </div>

        {/* Bottom Content */}
        <div className="p-6">
            <div className="h-5 w-2/3 bg-gray-300 rounded" />
        </div>

        </div>
    );
}
