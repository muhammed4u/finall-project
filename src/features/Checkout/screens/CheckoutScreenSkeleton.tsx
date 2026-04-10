"use client"

export default function CheckoutScreenSkeleton() {
    return (
        <div className="bg-linear-to-b from-gray-50 to-white min-h-screen py-8 animate-pulse">
            <div className="container mx-auto px-4">
                
                <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="space-y-2">
                        <div className="h-8 w-64 bg-gray-200 rounded"></div>
                        <div className="h-4 w-40 bg-gray-200 rounded"></div>
                    </div>
                    <div className="h-10 w-36 bg-gray-200 rounded mt-2 sm:mt-0"></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    <div className="lg:col-span-2 space-y-6">
                        
                        <div className="space-y-4">
                            {[...Array(2)].map((_, i) => (
                                <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                                    <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                                    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                                    <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
                                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                                </div>
                            ))}
                        </div>

                        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                            <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                            <div className="space-y-2">
                                {[...Array(2)].map((_, i) => (
                                    <div key={i} className="h-10 bg-gray-200 rounded w-full"></div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                            
                            <div className="bg-linear-to-r from-green-500 to-green-600 px-6 py-4">
                                <div className="h-6 w-32 bg-gray-200 rounded"></div>
                            </div>
                            <div className="p-5 space-y-4">
                                
                                <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                                    {[...Array(3)].map((_, i) => (
                                        <div key={i} className="h-16 bg-gray-200 rounded w-full"></div>
                                    ))}
                                </div>
                                <hr className="border-gray-100" />

                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <div className="h-4 w-20 bg-gray-200 rounded"></div>
                                        <div className="h-4 w-12 bg-gray-200 rounded"></div>
                                    </div>
                                    <div className="flex justify-between">
                                        <div className="h-4 w-24 bg-gray-200 rounded"></div>
                                        <div className="h-4 w-12 bg-gray-200 rounded"></div>
                                    </div>
                                    <hr className="border-gray-100" />
                                    <div className="flex justify-between items-center">
                                        <div className="h-6 w-24 bg-gray-200 rounded"></div>
                                        <div className="h-6 w-16 bg-gray-200 rounded"></div>
                                    </div>
                                </div>

                                <div className="h-12 bg-gray-200 rounded w-full mt-4"></div>

                                <div className="flex items-center justify-center gap-4 mt-4">
                                    {[...Array(3)].map((_, i) => (
                                        <div key={i} className="h-6 w-20 bg-gray-200 rounded"></div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}