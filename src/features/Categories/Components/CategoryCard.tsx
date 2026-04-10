"use client";
import Image from "next/image";
import { Category } from "../Types/Categories.types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";



export default function CategoryCard({info}:{info:Category}) {
    return (
    <div className="group relative rounded-3xl overflow-hidden bg-white/70 backdrop-blur-sm border border-gray-200 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 cursor-pointer">

      {/* Image */}
    <div className="relative h-56 w-full overflow-hidden">
        <Image
        src={info.image}
        alt={info.name}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 flex items-end p-6">
            <div className="text-white">
                <p className="text-sm tracking-wide opacity-90 flex items-center gap-2">
                Explore Subcategories
                <span className="translate-x-0 group-hover:translate-x-2 transition-transform duration-300">
                    <FontAwesomeIcon icon={faArrowRightLong}/>
                </span>
                </p>
            </div>
            </div>
        </div>

      {/* Bottom Content */}
        <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 group-hover:text-green-600 transition">
            {info.name}
            </h3>
        </div>
        </div>
    );
}

