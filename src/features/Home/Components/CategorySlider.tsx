"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

function CategorySliderComponent({ categories }: { categories: any[] }) {
    return (
        <div className="relative category-slider-container group/slider px-2">
            <Swiper
                modules={[Navigation, Autoplay]}
                navigation={{
                    prevEl: ".category-prev",
                    nextEl: ".category-next",
                }}
                autoplay={{ delay: 3500, disableOnInteraction: false }}
                loop={true}
                breakpoints={{
                    320: { slidesPerView: 2, spaceBetween: 16 },
                    640: { slidesPerView: 3, spaceBetween: 20 },
                    1024: { slidesPerView: 5, spaceBetween: 24 },
                    1280: { slidesPerView: 6, spaceBetween: 24 },
                }}
                className="py-4"
            >
                {categories.map((category) => (
                    <SwiperSlide key={category._id} className="h-auto pb-6 pt-2">
                        <Link
                            href={`/search?category=${category._id}`}
                            className="group flex flex-col items-center cursor-pointer transition-all duration-300"
                        >
                            {/* Outer Ring for Hover Effect */}
                            <div className="relative size-28 sm:size-36 rounded-full p-[3px] bg-linear-to-tr from-gray-200 to-gray-50 group-hover:from-emerald-400 group-hover:to-emerald-500 transition-all duration-500 shadow-md group-hover:shadow-xl group-hover:shadow-emerald-500/30 group-hover:-translate-y-2">
                                
                                {/* Inner Circle (White Background) */}
                                <div className="relative w-full h-full rounded-full bg-white overflow-hidden p-5 sm:p-6 flex items-center justify-center">
                                    <Image
                                        width={200}
                                        height={200}
                                        src={category.image}
                                        alt={category.name}
                                        className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
                                    />
                                    {/* Subtle Overlay Glow */}
                                    <div className="absolute inset-0 bg-emerald-500/0 group-hover:bg-emerald-500/5 transition-colors duration-500" />
                                </div>
                            </div>

                            <div className="text-center mt-4 w-full px-2">
                                <h3 className="font-bold text-gray-800 text-sm sm:text-base group-hover:text-emerald-600 transition-colors line-clamp-1">
                                    {category.name}
                                </h3>
                            </div>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Navigation Buttons - Visible on Hover */}
            <button className="category-prev absolute -left-4 top-1/2 -translate-y-1/2 z-10 size-12 rounded-2xl bg-white border border-gray-100 text-gray-400 flex items-center justify-center transition-all duration-300 hover:bg-emerald-500 hover:border-emerald-500 hover:text-white shadow-xl opacity-0 group-hover/slider:opacity-100 -translate-x-4 group-hover/slider:translate-x-0 disabled:opacity-0">
                <FontAwesomeIcon icon={faChevronLeft} className="text-sm" />
            </button>
            <button className="category-next absolute -right-4 top-1/2 -translate-y-1/2 z-10 size-12 rounded-2xl bg-white border border-gray-100 text-gray-400 flex items-center justify-center transition-all duration-300 hover:bg-emerald-500 hover:border-emerald-500 hover:text-white shadow-xl opacity-0 group-hover/slider:opacity-100 translate-x-4 group-hover/slider:translate-x-0 disabled:opacity-0">
                <FontAwesomeIcon icon={faChevronRight} className="text-sm" />
            </button>
        </div>
    );
}

import dynamic from "next/dynamic";
export default dynamic(() => Promise.resolve(CategorySliderComponent), { ssr: false });
