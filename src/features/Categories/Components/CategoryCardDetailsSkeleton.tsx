"use client";

export default function CategoryDetailsCardSkeleton() {
    return (
        <div className="relative bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden p-8 animate-pulse">
        
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-transparent to-emerald-50 opacity-20" />

        <div className="relative flex flex-col gap-6">
            
            <div className="w-14 h-14 rounded-2xl bg-gray-300 flex items-center justify-center shadow-md" />
            <div className="h-5 w-3/4 bg-gray-300 rounded-md" />

            <div className="absolute bottom-6 right-6 h-4 w-4 bg-gray-300 rounded opacity-50" />

        </div>
        </div>
    );
}
