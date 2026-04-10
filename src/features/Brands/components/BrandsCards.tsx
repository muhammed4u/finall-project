"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"
import {  Brand } from "../Types/brands.types"
import Link from "next/link"


export default function BrandCard({info}:{info:Brand}) {

    const {image, name, _id} = info

    return (
        <Link href={`/search?brand=${_id}`}>
        <div className="group relative bg-gray-100 rounded-3xl p-6 border border-gray-200 
                        shadow-[0_8px_30px_rgb(0,0,0,0.04)] 
                        hover:shadow-[0_20px_60px_rgb(124,58,237,0.15)] 
                        hover:-translate-y-2 
                        transition-all duration-500 ease-out cursor-pointer">

        {/* Inner Logo Box */}
        <div className="bg-gray-50 rounded-2xl flex items-center justify-center h-36 
                        border border-gray-100 
                        group-hover:bg-white 
                        transition-all duration-300">
            <img
            src={image}
            alt={name}
            className="h-12 object-contain 
                        group-hover:scale-140 
                        transition-transform duration-500"
            />
        </div>

        {/* Brand Name */}
        <div className="flex items-center justify-between mt-6">
            <p className="font-semibold text-gray-800 tracking-wide 
                        group-hover:text-purple-600 transition-colors duration-300">
            {name}
            </p>

            <FontAwesomeIcon
            icon={faArrowRight}
            className="text-gray-400 text-sm 
                        group-hover:text-purple-600 
                        group-hover:translate-x-1 
                        transition-all duration-300"
            />
        </div>
        </div>
    </Link>
    )
}