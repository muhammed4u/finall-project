"use client";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUserPlus,
    faLeaf,
    faTruck,
    faShieldHeart,
    } from "@fortawesome/free-solid-svg-icons";

    export default function SignupHero() {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        setAnimate(true);
    }, []);

    return (
        <section className="relative hidden lg:flex items-center justify-center bg-linear-to-br from-green-900 via-emerald-700 to-green-500 rounded-l-3xl p-16 overflow-hidden text-white">
        <div className="absolute w-96 h-96 bg-emerald-400/20 blur-3xl rounded-full top-[-80px] right-[-60px]" />
        <div className="absolute w-80 h-80 bg-green-300/20 blur-3xl rounded-full bottom-[-60px] left-[-40px]" />

        <div className="relative grid grid-cols-1 gap-12 text-center max-w-lg">
            <div
            className={`flex justify-center transition-all duration-700 ${animate ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}
            >
            <div className="w-30 h-30 flex items-center justify-center bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl">
                <FontAwesomeIcon
                icon={faUserPlus}
                className="text-4xl text-emerald-200"
                />
            </div>
            </div>

            <div
            className={`transition-all duration-700 delay-200 transform ${
                animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            >
            <h2 className="text-4xl font-bold leading-snug">
                Create Your <br /> FreshCart Account
            </h2>
            </div>

            <p
            className={`text-green-100 text-lg leading-relaxed transition-opacity duration-1000 delay-400 ${animate ? "opacity-100" : "opacity-0"}`}
            >
            Discover a smarter way to shop groceries. Fresh produce, fast
            delivery, and secure checkout — all tailored for your lifestyle.
            </p>

            <div className="grid grid-cols-3 gap-6 mt-6 text-sm">
            <div className="flex flex-col items-center space-y-2">
                <FontAwesomeIcon
                icon={faLeaf}
                className="text-emerald-200 w-5 h-5"
                />
                <span>Organic Picks</span>
            </div>

            <div className="flex flex-col items-center space-y-2">
                <FontAwesomeIcon
                icon={faTruck}
                className="text-emerald-200 w-5 h-5"
                />
                <span>Fast Delivery</span>
            </div>

            <div className="flex flex-col items-center space-y-2">
                <FontAwesomeIcon
                icon={faShieldHeart}
                className="text-emerald-200 w-5 h-5"
                />
                <span>Safe Checkout</span>
            </div>
            </div>

            <div className="mt-10 w-24 h-px mx-auto bg-linear-to-r from-transparent via-white to-transparent opacity-50" />
        </div>
        </section>
    );
}
