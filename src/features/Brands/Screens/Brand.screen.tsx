"use client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTags } from "@fortawesome/free-solid-svg-icons"
import BrandCard from "../components/BrandsCards"
import Link from "next/link"
import { getAllBrands } from "../server/brands.action"
import { useEffect, useState } from "react"
import { Brand } from "../Types/brands.types"
import BrandCardSkeleton from "../components/BrandCardSkeleton"

export default function BrandsScreen() {

    const [brands, setBrands] = useState<Brand[]>([])
    const [loading, setLoading] = useState(true)

        useEffect(() => {
        async function fetchBrands() {
        try {
            const response = await getAllBrands()
            setBrands(response.data)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
        }

        fetchBrands()
    }, [])

    return (
        <div className="min-h-screen bg-[#f8f9fc]">

        <div className="relative bg-linear-to-r from-purple-600 via-indigo-600 to-blue-500 py-24">
            <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px]" />

            <div className="relative max-w-7xl mx-auto px-6">

            <Link href={'/'}>
                <p className="text-white/80 text-sm mb-6 tracking-wide">
                Home <span className="mx-2">/</span> 
            </p>
            </Link>
            <Link href={'/brands'}>
                <span className="text-white font-medium">Brands</span>
            </Link>

            <div className="flex items-center gap-6">

                <div className="w-20 h-20 flex items-center justify-center 
                                rounded-3xl 
                                bg-white/20 
                                backdrop-blur-xl 
                                shadow-xl">
                <FontAwesomeIcon 
                    icon={faTags} 
                    className="text-white text-3xl" 
                />
                </div>

                <div>
                <h1 className="text-5xl font-bold text-white leading-tight">
                    Top Brands
                </h1>
                <p className="text-white/80 mt-3 text-lg">
                    Shop from your favorite brands
                </p>
                </div>

            </div>
            </div>
        </div>

        <div className="relative -mt-16 pb-24">
            <div className="max-w-7xl mx-auto px-6">
            <div className="bg-white rounded-4xl p-10 
                            shadow-[0_30px_80px_rgba(0,0,0,0.08)]">

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                {loading? Array.from({ length: 12 }).map((_, i) => (
                    <BrandCardSkeleton key={i} />
                    )):brands.map((item) => (
                <BrandCard 
                    key={item._id}
                    info={item}
                />
                ))}
                </div>

            </div>
            </div>
        </div>

        </div>
    )
}