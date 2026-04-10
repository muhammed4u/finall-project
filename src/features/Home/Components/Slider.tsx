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
            <div className="h-115 relative flex items-center justify-start overflow-hidden">
                
                <div
                style={{
                    backgroundImage: `url(${sliderImg1.src})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
                className="absolute inset-0 animate-bgZoom"
                ></div>

                <div className="overlay relative w-full h-full bg-linear-to-r from-green-500/90 to-green-400/50 flex items-center">
                <div className="flex flex-col justify-center items-start pl-12 gap-4 max-w-md">
                    <h2 className="text-white text-4xl font-bold animate-slideUp">
                    Welcome to FreshCart
                    </h2>
                    <p className="text-white animate-slideUp delay-200">
                    Get 20% off your first order
                    </p>
                    <div className="flex gap-2 mt-2">
                    <Link
                        href={"/shop"}
                        className="btn bg-white hover:bg-white/90 border-2 border-white/50 text-green-500"
                    >
                        Shop Now
                    </Link>
                    <Link
                        href={"/shop"}
                        className="btn bg-transparent hover:bg-white hover:text-green-500 border-2 border-white/50 text-white"
                    >
                        View Deals
                    </Link>
                    </div>
                </div>
                </div>
            </div>
            </SwiperSlide>

            <SwiperSlide>
            <div className="h-115 relative flex items-center justify-start overflow-hidden">
                <div
                style={{
                    backgroundImage: `url(${sliderImg2.src})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
                className="absolute inset-0 animate-bgZoom"
                ></div>
                <div className="overlay relative w-full h-full bg-linear-to-r from-green-500/90 to-green-400/50 flex items-center">
                <div className="flex flex-col justify-center items-start pl-12 gap-4 max-w-md">
                    <h2 className="text-white text-4xl font-bold animate-slideUp">
                    Fresh Products Delivered To Your Door
                    </h2>
                    <p className="text-white animate-slideUp delay-200">
                    Discover The Freshest Groceries With Us
                    </p>
                    <div className="flex gap-2 mt-2">
                    <Link
                        href={"/shop"}
                        className="btn bg-white hover:bg-white/90 border-2 border-white/50 text-green-500"
                    >
                        Shop Now
                    </Link>
                    <Link
                        href={"/shop"}
                        className="btn bg-transparent hover:bg-white hover:text-green-500 border-2 border-white/50 text-white"
                    >
                        View Deals
                    </Link>
                    </div>
                </div>
                </div>
            </div>
            </SwiperSlide>

            <SwiperSlide>
            <div className="h-115 relative flex items-center justify-start overflow-hidden">
                <div
                style={{
                    backgroundImage: `url(${sliderImg3.src})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
                className="absolute inset-0 animate-bgZoom"
                ></div>
                <div className="overlay relative w-full h-full bg-linear-to-r from-green-500/90 to-green-400/50 flex items-center">
                <div className="flex flex-col justify-center items-start pl-12 gap-4 max-w-md">
                    <h2 className="text-white text-4xl font-bold animate-slideUp">
                    Latest Electronics & Smart Devices
                    </h2>
                    <p className="text-white animate-slideUp delay-200">
                    Discover The Latest Smart Devices With Us
                    </p>
                    <div className="flex gap-2 mt-2">
                    <Link
                        href={"/shop"}
                        className="btn bg-white hover:bg-white/90 border-2 border-white/50 text-green-500"
                    >
                        Shop Now
                    </Link>
                    <Link
                        href={"/shop"}
                        className="btn bg-transparent hover:bg-white hover:text-green-500 border-2 border-white/50 text-white"
                    >
                        View Deals
                    </Link>
                    </div>
                </div>
                </div>
            </div>
            </SwiperSlide>

            <SwiperSlide>
            <div className="h-115 relative flex items-center justify-start overflow-hidden">
                <div
                style={{
                    backgroundImage: `url(${sliderImg4.src})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
                className="absolute inset-0 animate-bgZoom"
                ></div>
                <div className="overlay relative w-full h-full bg-linear-to-r from-green-500/90 to-green-400/50 flex items-center">
                <div className="flex flex-col justify-center items-start pl-12 gap-4 max-w-md">
                    <h2 className="text-white text-4xl font-bold animate-slideUp">
                    Shop Our Latest Collection
                    </h2>
                    <p className="text-white animate-slideUp delay-200">
                    Explore Our Newest Products And Exclusive Deals
                    </p>
                    <div className="flex gap-2 mt-2">
                    <Link
                        href={"/shop"}
                        className="btn bg-white hover:bg-white/90 border-2 border-white/50 text-green-500"
                    >
                        Shop Now
                    </Link>
                    <Link
                        href={"/shop"}
                        className="btn bg-transparent hover:bg-white hover:text-green-500 border-2 border-white/50 text-white"
                    >
                        View Deals
                    </Link>
                    </div>
                </div>
                </div>
            </div>
            </SwiperSlide>
        </Swiper>

        <button className="custom-prev absolute left-4 top-1/2 -translate-y-1/2 z-10 cursor-pointer bg-white/90 hover:bg-white size-12 rounded-full text-green-500 flex justify-center items-center transition-colors">
            <FontAwesomeIcon icon={faChevronLeft} className="text-xl" />
        </button>
        <button className="custom-next absolute right-4 top-1/2 -translate-y-1/2 z-10 cursor-pointer bg-white/90 hover:bg-white size-12 rounded-full text-green-500 flex justify-center items-center transition-colors">
            <FontAwesomeIcon icon={faChevronRight} className="text-lg" />
        </button>
        </section>
    );
}

import dynamic from "next/dynamic";
export default dynamic(() => Promise.resolve(Slider), { ssr: false });
