"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import sliderImg1 from "../../../assets/images/slider6.jpg";
import sliderImg2 from "../../../assets/images/slider2.jpg";
import sliderImg3 from "../../../assets/images/slider3.jpg";
import sliderImg4 from "../../../assets/images/slider5.jpg";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

function Slider() {
    return (
        <section className="relative">
        <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation={{
            prevEl: ".custom-prev",
            nextEl: ".custom-next",
            }}
            pagination={{
            clickable: true,
            }}
            autoplay={{ delay: 4000 }}
            loop={true}
        >
            
            <SwiperSlide>
            <div className="h-115 relative flex items-center overflow-hidden">
                <div
                style={{
                    backgroundImage: `url(${sliderImg1.src})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
                className="absolute inset-0 animate-bgZoom"
                ></div>
                <div className="overlay relative w-full h-full bg-linear-to-r from-emerald-950/90 via-emerald-900/40 to-transparent flex items-center">
                    <div className="container mx-auto px-4 sm:px-8 lg:px-16">
                        <div className="flex flex-col justify-center items-start gap-6 max-w-2xl">
                            <div className="bg-emerald-500 text-white text-[10px] font-black uppercase tracking-[0.3em] px-4 py-1.5 rounded-full shadow-lg animate-slideUp">
                                Exclusive Deal
                            </div>
                            <h2 className="text-white text-5xl md:text-7xl font-black leading-tight animate-slideUp tracking-tighter">
                                Elevate Your <br /> <span className="text-emerald-400">Shopping Style</span>
                            </h2>
                            <p className="text-emerald-50/80 text-xl animate-slideUp delay-200 max-w-md font-medium">
                                Get 20% off your first order with our premium collection of hand-picked products.
                            </p>
                            <div className="flex gap-4 mt-4 animate-slideUp delay-300">
                                <Link href="/shop" className="btn btn-primary px-10 py-4 text-lg">Shop Now</Link>
                                <Link href="/shop" className="btn btn-glass px-10 py-4 text-lg text-white border-white/20">View Deals</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </SwiperSlide>

            <SwiperSlide>
            <div className="h-115 relative flex items-center overflow-hidden">
                <div
                style={{
                    backgroundImage: `url(${sliderImg2.src})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
                className="absolute inset-0 animate-bgZoom"
                ></div>
                <div className="overlay relative w-full h-full bg-linear-to-r from-emerald-950/90 via-emerald-900/40 to-transparent flex items-center">
                    <div className="container mx-auto px-4 sm:px-8 lg:px-16">
                        <div className="flex flex-col justify-center items-start gap-6 max-w-2xl">
                            <div className="bg-emerald-500 text-white text-[10px] font-black uppercase tracking-[0.3em] px-4 py-1.5 rounded-full shadow-lg animate-slideUp">
                                Premium Quality
                            </div>
                            <h2 className="text-white text-5xl md:text-7xl font-black leading-tight animate-slideUp tracking-tighter">
                                Freshness <br /> <span className="text-emerald-400">At Your Door</span>
                            </h2>
                            <p className="text-emerald-50/80 text-xl animate-slideUp delay-200 max-w-md font-medium">
                                Discover the freshest organic groceries hand-picked for your healthy lifestyle.
                            </p>
                            <div className="flex gap-4 mt-4 animate-slideUp delay-300">
                                <Link href="/shop" className="btn btn-primary px-10 py-4 text-lg">Shop Now</Link>
                                <Link href="/shop" className="btn btn-glass px-10 py-4 text-lg text-white border-white/20">View Deals</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </SwiperSlide>

            <SwiperSlide>
            <div className="h-115 relative flex items-center overflow-hidden">
                <div
                style={{
                    backgroundImage: `url(${sliderImg3.src})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
                className="absolute inset-0 animate-bgZoom"
                ></div>
                <div className="overlay relative w-full h-full bg-linear-to-r from-emerald-950/90 via-emerald-900/40 to-transparent flex items-center">
                    <div className="container mx-auto px-4 sm:px-8 lg:px-16">
                        <div className="flex flex-col justify-center items-start gap-6 max-w-2xl">
                            <div className="bg-emerald-500 text-white text-[10px] font-black uppercase tracking-[0.3em] px-4 py-1.5 rounded-full shadow-lg animate-slideUp">
                                Smart Lifestyle
                            </div>
                            <h2 className="text-white text-5xl md:text-7xl font-black leading-tight animate-slideUp tracking-tighter">
                                Smart <br /> <span className="text-emerald-400">Future Tech</span>
                            </h2>
                            <p className="text-emerald-50/80 text-xl animate-slideUp delay-200 max-w-md font-medium">
                                Upgrade your life with the latest electronics and smart home devices.
                            </p>
                            <div className="flex gap-4 mt-4 animate-slideUp delay-300">
                                <Link href="/shop" className="btn btn-primary px-10 py-4 text-lg">Shop Now</Link>
                                <Link href="/shop" className="btn btn-glass px-10 py-4 text-lg text-white border-white/20">View Deals</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </SwiperSlide>

            <SwiperSlide>
            <div className="h-115 relative flex items-center overflow-hidden">
                <div
                style={{
                    backgroundImage: `url(${sliderImg4.src})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
                className="absolute inset-0 animate-bgZoom"
                ></div>
                <div className="overlay relative w-full h-full bg-linear-to-r from-emerald-950/90 via-emerald-900/40 to-transparent flex items-center">
                    <div className="container mx-auto px-4 sm:px-8 lg:px-16">
                        <div className="flex flex-col justify-center items-start gap-6 max-w-2xl">
                            <div className="bg-emerald-500 text-white text-[10px] font-black uppercase tracking-[0.3em] px-4 py-1.5 rounded-full shadow-lg animate-slideUp">
                                Limited Time Offer
                            </div>
                            <h2 className="text-white text-5xl md:text-7xl font-black leading-tight animate-slideUp tracking-tighter">
                                Eco Friendly <br /> <span className="text-emerald-400">Pure Living</span>
                            </h2>
                            <p className="text-emerald-50/80 text-xl animate-slideUp delay-200 max-w-md font-medium">
                                Explore our sustainable collection designed for a better and healthier future.
                            </p>
                            <div className="flex gap-4 mt-4 animate-slideUp delay-300">
                                <Link href="/shop" className="btn btn-primary px-10 py-4 text-lg">Shop Now</Link>
                                <Link href="/shop" className="btn btn-glass px-10 py-4 text-lg text-white border-white/20">View Deals</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </SwiperSlide>
        </Swiper>

        <button className="custom-prev absolute left-8 top-1/2 -translate-y-1/2 z-30 size-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center transition-all duration-500 hover:bg-emerald-500 hover:border-emerald-500 hover:scale-110 shadow-2xl group/btn">
            <FontAwesomeIcon icon={faChevronLeft} className="text-lg group-hover/btn:-translate-x-0.5 transition-transform" />
        </button>
        <button className="custom-next absolute right-8 top-1/2 -translate-y-1/2 z-30 size-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center transition-all duration-500 hover:bg-emerald-500 hover:border-emerald-500 hover:scale-110 shadow-2xl group/btn">
            <FontAwesomeIcon icon={faChevronRight} className="text-lg group-hover/btn:translate-x-0.5 transition-transform" />
        </button>
        </section>
    );
}

import dynamic from "next/dynamic";
export default dynamic(() => Promise.resolve(Slider), { ssr: false });
