"use client";

export default function ProductInfoSkeleton() {
    return (
        <section id="product-detail" className="py-6">
        <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-8">
            {/* Images Skeleton */}
            <div className="lg:w-1/4">
                <div className="bg-gray-200 rounded-xl h-[400px] animate-pulse"></div>
                <div className="flex gap-2 mt-2">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-gray-300 rounded-lg h-16 w-16 animate-pulse"></div>
                ))}
                </div>
            </div>

            {/* Product Info Skeleton */}
            <div className="lg:w-3/4 flex flex-col gap-4">
                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                <div className="bg-gray-300 h-6 w-24 rounded-full animate-pulse"></div>
                <div className="bg-gray-300 h-6 w-20 rounded-full animate-pulse"></div>
                </div>

                {/* Title */}
                <div className="h-8 bg-gray-300 rounded w-3/4 animate-pulse mb-3"></div>

                {/* Rating */}
                <div className="h-6 w-32 bg-gray-300 rounded animate-pulse mb-4"></div>

                {/* Price */}
                <div className="flex items-center gap-3 mb-6">
                <div className="h-8 w-24 bg-gray-300 rounded animate-pulse"></div>
                <div className="h-6 w-16 bg-gray-300 rounded animate-pulse"></div>
                </div>

                {/* Stock */}
                <div className="h-6 w-32 bg-gray-300 rounded animate-pulse mb-6"></div>

                {/* Description */}
                <div className="border-t border-gray-100 pt-5 mb-6">
                <div className="h-24 bg-gray-200 rounded animate-pulse"></div>
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center gap-4 mb-6">
                <div className="flex gap-2">
                    <div className="h-10 w-10 bg-gray-300 rounded animate-pulse"></div>
                    <div className="h-10 w-10 bg-gray-300 rounded animate-pulse"></div>
                    <div className="h-10 w-10 bg-gray-300 rounded animate-pulse"></div>
                </div>
                <div className="h-6 w-16 bg-gray-300 rounded animate-pulse"></div>
                </div>

                {/* Total Price */}
                <div className="bg-gray-100 rounded-lg p-4 mb-6">
                <div className="h-6 w-32 bg-gray-300 rounded animate-pulse"></div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <div className="h-12 bg-gray-300 rounded-xl animate-pulse flex-1"></div>
                <div className="h-12 bg-gray-300 rounded-xl animate-pulse flex-1"></div>
                </div>

                {/* Wishlist / Share */}
                <div className="flex gap-3 mb-6">
                <div className="h-12 bg-gray-300 rounded-xl flex-1 animate-pulse"></div>
                <div className="h-12 bg-gray-300 rounded-xl flex-1 animate-pulse"></div>
                </div>

                {/* Trust badges */}
                <div className="border-t border-gray-100 pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-gray-300 rounded-full animate-pulse"></div>
                    <div className="flex flex-col gap-1">
                        <div className="h-4 w-20 bg-gray-300 rounded animate-pulse"></div>
                        <div className="h-3 w-16 bg-gray-300 rounded animate-pulse"></div>
                    </div>
                    </div>
                ))}
                </div>
            </div>
            </div>
        </div>
        </section>
    );
}