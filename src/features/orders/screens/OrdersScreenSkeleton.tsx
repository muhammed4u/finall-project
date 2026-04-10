"use client"
import { faBox } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function OrdersScreenSkeleton() {
    
    const skeletonArray = [1, 2, 3];

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-pulse">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-gray-200 flex items-center justify-center">
                            <FontAwesomeIcon icon={faBox} className="text-2xl text-gray-400"/>
                        </div>
                        <div className="space-y-2">
                            <div className="h-5 w-40 bg-gray-200 rounded"></div>
                            <div className="h-3 w-32 bg-gray-200 rounded"></div>
                        </div>
                    </div>
                    <div className="h-10 w-36 bg-gray-200 rounded self-start sm:self-auto"></div>
                </div>
            </div>

            <div className="space-y-4">
                {skeletonArray.map((_, idx) => (
                    <div key={idx} className="p-4 bg-white rounded-2xl shadow border border-gray-100 animate-pulse">
                        <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
                            <div className="space-y-2 flex-1">
                                <div className="h-4 w-32 bg-gray-200 rounded"></div>
                                <div className="h-4 w-24 bg-gray-200 rounded"></div>
                            </div>
                            <div className="h-6 w-20 bg-gray-200 rounded self-center sm:self-auto"></div>
                        </div>
                        <div className="mt-3 h-3 w-full bg-gray-200 rounded"></div>
                        <div className="mt-1 h-3 w-5/6 bg-gray-200 rounded"></div>
                    </div>
                ))}
            </div>
        </div>
    )
}