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
        <section className="relative hidden lg:flex items-center justify-center bg-linear-to-br from-emerald-950 via-emerald-900 to-teal-800 rounded-[2.5rem] p-16 overflow-hidden text-white shadow-2xl">
        <div className="absolute w-[600px] h-[600px] bg-emerald-400/10 blur-[120px] rounded-full -top-48 -right-48 animate-pulse" />
        <div className="absolute w-[500px] h-[500px] bg-teal-300/10 blur-[100px] rounded-full -bottom-32 -left-32 animate-pulse delay-700" />

        <div className="relative max-w-xl w-full text-center">
            <div
            className={`mb-12 transition-all duration-1000 ${
                animate ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-95"
            }`}
            >
            <div className="relative w-48 h-48 mx-auto">
                <div className="absolute inset-0 rounded-[2.5rem] bg-linear-to-br from-emerald-400 via-teal-300 to-emerald-600 blur-3xl opacity-30 animate-pulseSlow" />

                <div className="relative w-full h-full bg-white/5 backdrop-blur-3xl border border-white/20 rounded-[2.5rem] shadow-2xl flex items-center justify-center p-6 group">
                    <div className="size-20 bg-emerald-500 rounded-3xl flex items-center justify-center text-white text-5xl shadow-2xl shadow-emerald-500/40 group-hover:rotate-12 transition-transform duration-700">
                        <FontAwesomeIcon icon={faUserPlus} />
                    </div>
                </div>
            </div>
            </div>

            <div
            className={`transition-all duration-1000 delay-300 ${
                animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            >
            <h2 className="text-6xl font-black leading-tight tracking-tighter">
                Join the <br /> <span className="text-emerald-400">SwiftShop</span>
            </h2>
            </div>

            <p
            className={`mt-8 text-emerald-50/70 text-xl font-medium leading-relaxed transition-all duration-1000 delay-500 ${animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
            Unlock a world of premium benefits. Personalized picks, faster-than-light delivery, and a community of smart shoppers.
            </p>

            <div className="mt-16 grid grid-cols-3 gap-8 text-sm text-center">
                <div className="space-y-3 group cursor-default">
                    <div className="size-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto group-hover:bg-emerald-500/20 group-hover:border-emerald-500/50 transition-all duration-500">
                        <FontAwesomeIcon icon={faLeaf} className="w-5 h-5 text-emerald-400" />
                    </div>
                    <p className="font-bold tracking-wide text-emerald-100/80 uppercase text-[10px]">Pure Quality</p>
                </div>

                <div className="space-y-3 group cursor-default">
                    <div className="size-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto group-hover:bg-emerald-500/20 group-hover:border-emerald-500/50 transition-all duration-500">
                        <FontAwesomeIcon icon={faTruck} className="w-5 h-5 text-emerald-400" />
                    </div>
                    <p className="font-bold tracking-wide text-emerald-100/80 uppercase text-[10px]">Fast Delivery</p>
                </div>

                <div className="space-y-3 group cursor-default">
                    <div className="size-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto group-hover:bg-emerald-500/20 group-hover:border-emerald-500/50 transition-all duration-500">
                        <FontAwesomeIcon icon={faShieldHeart} className="w-5 h-5 text-emerald-400" />
                    </div>
                    <p className="font-bold tracking-wide text-emerald-100/80 uppercase text-[10px]">Safe Pay</p>
                </div>
            </div>

            <div className="mt-16 h-px w-48 mx-auto bg-linear-to-r from-transparent via-emerald-400/30 to-transparent" />
        </div>
        </section>
    );
}
