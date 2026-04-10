"use client";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useRef, useEffect, useState } from "react";
import { Product } from "../../Types/Products.types";
import { Navigation } from "swiper/modules";
import ProductCard from "../ProductCard";

interface Props {
    products: Product[];
    }

    export default function SimilarProductsSwiper({ products }: Props) {

    const prevRef = useRef<HTMLButtonElement>(null);
    const nextRef = useRef<HTMLButtonElement>(null);

    const [swiperInstance, setSwiperInstance] = useState<any>(null);

    useEffect(() => {
        if (swiperInstance && prevRef.current && nextRef.current) {
        swiperInstance.params.navigation.prevEl = prevRef.current;
        swiperInstance.params.navigation.nextEl = nextRef.current;
        swiperInstance.navigation.destroy(); 
        swiperInstance.navigation.init(); 
        swiperInstance.navigation.update(); 
        }
    }, [swiperInstance]);

    return (
        <div className="relative group">
        
        <button
    ref={prevRef}
    aria-label="Previous Slide"
    className="absolute top-1/2 -translate-y-1/2 -left-6 z-30 flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-lg hover:bg-green-500 hover:text-white transition focus:outline-none focus:ring-2 focus:ring-green-400"
>
    <FontAwesomeIcon icon={faChevronLeft} className="text-lg" />
</button>
<button
    ref={nextRef}
    aria-label="Next Slide"
    className="absolute top-1/2 -translate-y-1/2 -right-6 z-30 flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-lg hover:bg-green-500 hover:text-white transition focus:outline-none focus:ring-2 focus:ring-green-400"
>
    <FontAwesomeIcon icon={faChevronRight} className="text-lg" />
</button>

        <Swiper
            modules={[Navigation]}
            onSwiper={setSwiperInstance}
            navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
            }}
            spaceBetween={24}
            slidesPerView={4}
            breakpoints={{
            320: { slidesPerView: 1 },
            480: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            }}
            className="pb-6"
            loop={true} 
            grabCursor={true} 
        >
            {products.map((product) => (
            <SwiperSlide key={product.id}>
                <ProductCard info={product} />
            </SwiperSlide>
            ))}
        </Swiper>
        </div>
    );
}