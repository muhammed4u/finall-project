"use client";

import { faArrowRight, faBolt, faClock, faFire, faHourglassHalf, faTruck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function DealsBanners() {

    return (
        <section className="py-10">
            <div className="container mx-auto">
                <div className="grid md:grid-cols-2 gap-6">

                    {/* Deal of the day */}
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 p-8 text-white transform transition duration-500 hover:scale-[1.02] hover:-translate-y-2 hover:shadow-2xl">

                        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 animate-pulse"></div>
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 animate-bounce opacity-70"></div>

                        <div className="relative z-10">

                            <div className="inline-flex text-center gap-2 bg-white/20 px-3 py-2 rounded-full text-sm mb-4 items-center backdrop-blur-sm transition hover:bg-white/30">
                                <FontAwesomeIcon icon={faClock} className="text-xs animate-spin-slow"/>
                                <span>Deal Of The Day</span>
                            </div>

                            <h3 className="text-2xl md:text-3xl font-bold mb-2 transition duration-300 group-hover:tracking-wide">
                                Fresh Organic Fruits
                            </h3>

                            <p className="text-white/80 mb-4">
                                Get Up To 40% Off On Selected Organic Fruits
                            </p>

                            <div className="flex flex-wrap gap-3 mb-6 justify-center">
                            {[
                                { icon: faFire, text: "Best Seller" },
                                { icon: faHourglassHalf, text: "Limited Stock" },
                                { icon: faTruck, text: "Free Shipping" },
                            ].map((item, index) => (
                                <div
                                key={index}
                                className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl text-sm sm:text-base font-semibold text-white shadow-md hover:scale-105 transition-transform duration-300"
                                >
                                <FontAwesomeIcon icon={item.icon} className="text-lg" />
                                <span>{item.text}</span>
                                </div>
                            ))}
                            </div>

                            <Link
                                href={'/shop'}
                                className="inline-flex items-center gap-2 bg-white text-emerald-600 px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:bg-gray-100 hover:gap-4 hover:shadow-lg"
                            >
                                Shop Now
                                <FontAwesomeIcon icon={faArrowRight} className="transition-transform duration-300 group-hover:translate-x-1"/>
                            </Link>

                        </div>
                    </div>

                    {/* New Arrivals */}
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-400 to-rose-500 p-8 text-white transform transition duration-500 hover:scale-[1.02] hover:-translate-y-2 hover:shadow-2xl">

                        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 animate-pulse"></div>
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 animate-bounce opacity-70"></div>

                        <div className="relative z-10">

                            <div className="inline-flex text-center gap-2 bg-white/20 px-3 py-2 rounded-full text-sm mb-4 items-center backdrop-blur-sm transition hover:bg-white/30">
                                <FontAwesomeIcon icon={faBolt} className="animate-pulse"/>
                                <span>New Arrivals</span>
                            </div>

                            <h3 className="text-2xl md:text-3xl font-bold mb-2 transition duration-300">
                                Exotic Vegetables
                            </h3>

                            <p className="text-white/80 mb-4">
                                Discover Our Latest Collection Of Premium Vegetables 
                            </p>

                            <div className="flex items-center gap-4 mb-6">
                                <div className="text-3xl font-bold animate-bounce">25% OFF</div>
                                <div className="text-sm text-white/70">
                                    Use code: <span className="font-bold text-white">FRESH25</span>
                                </div>
                            </div>

                            <Link
                                href={'/shop'}
                                className="inline-flex items-center gap-2 bg-white text-orange-600 px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:bg-gray-100 hover:gap-4 hover:shadow-lg"
                            >
                                Shop Now
                                <FontAwesomeIcon icon={faArrowRight} className="transition-transform duration-300 hover:translate-x-1"/>
                            </Link>

                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
