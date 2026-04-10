"use client";
import { useEffect, useState } from "react";
import {
    faClock,
    faShieldHalved,
    faTruck,
    } from "@fortawesome/free-solid-svg-icons";
    import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

    export default function LoginHero() {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        setAnimate(true);
    }, []);

    return (
        <section className="relative hidden lg:flex items-center justify-center bg-linear-to-br from-emerald-950 via-green-800 to-emerald-600 rounded-l-3xl p-16 overflow-hidden text-white">
        <div className="absolute w-[500px] h-[500px] bg-emerald-400/20 blur-3xl rounded-full top-[-150px] left-[-120px]" />
        <div className="absolute w-[400px] h-[400px] bg-green-300/20 blur-3xl rounded-full bottom-[-120px] right-[-80px]" />

        <div className="relative max-w-xl w-full text-center">
            <div
            className={`mb-12 transition-all duration-700 ${
                animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            >
            <div className="relative w-40 h-40 mx-auto">
                <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-emerald-400 via-green-300 to-emerald-500 blur-2xl opacity-40 animate-pulseSlow" />

                <div className="relative w-full h-full bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl flex items-center justify-center p-4">
                <img
                    src="https://storage.googleapis.com/uxpilot-auth.appspot.com/2e5810ff3e-e750761ebcd4ae5907db.png"
                    alt="shopping"
                    className="rounded-2xl"
                />
                </div>
            </div>
            </div>

            <div
            className={`transition-all duration-700 delay-200 ${
                animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            >
            <h2 className="text-5xl font-bold leading-tight tracking-tight">
                Welcome Back to <br /> FreshCart
            </h2>
            </div>

            <p
            className={`mt-6 text-green-100 text-lg leading-relaxed transition-opacity duration-1000 delay-400 ${animate ? "opacity-100" : "opacity-0"}`}
            >
            Log in to continue shopping fresh groceries with fast delivery and
            secure checkout.
            </p>

            <div className="mt-12 grid grid-cols-3 gap-6 text-sm text-center">
            <div className="space-y-2">
                <FontAwesomeIcon
                icon={faTruck}
                className="w-5 h-5 text-emerald-200 mx-auto"
                />
                <p>Free Delivery</p>
            </div>

            <div className="space-y-2">
                <FontAwesomeIcon
                icon={faShieldHalved}
                className="w-5 h-5 text-emerald-200 mx-auto"
                />
                <p>Secure Payment</p>
            </div>

            <div className="space-y-2">
                <FontAwesomeIcon
                icon={faClock}
                className="w-5 h-5 text-emerald-200 mx-auto"
                />
                <p>24/7 Support</p>
            </div>
            </div>

            <div className="mt-12 h-px w-32 mx-auto bg-linear-to-r from-transparent via-white to-transparent opacity-40" />
        </div>

        </section>
    );
}
