"use client";

import { useEffect, useRef, useState } from "react";
import {
    faEnvelopeOpenText,
    faGift,
    faPercent,
    faBolt,
    } from "@fortawesome/free-solid-svg-icons";
    import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

    export default function NewsletterImproved() {
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) setIsVisible(true);
        },
        { threshold: 0.3 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => {
        if (sectionRef.current) observer.unobserve(sectionRef.current);
        };
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        setSubscribed(true);
        setEmail("");
    };

    const perks = [
        { icon: faGift, label: "Exclusive Offers" },
        { icon: faPercent, label: "Member Discounts" },
        { icon: faBolt, label: "Flash Sales" },
    ];

    return (
        <section
        ref={sectionRef}
        className="py-24 bg-gradient-to-r from-emerald-500 to-green-500 overflow-hidden relative"
        >
        <div className="absolute top-0 -left-20 w-72 h-72 bg-emerald-200 rounded-full opacity-40 animate-spin-slow"></div>
        <div className="absolute bottom-0 -right-20 w-64 h-64 bg-green-200 rounded-full opacity-30 animate-pulse"></div>

        <div
            className={`max-w-6xl mx-auto *:mx-auto p-10 md:p-16 bg-white rounded-3xl shadow-xl flex flex-col md:flex-row items-center gap-10 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
            }`}
        >
            {/* Left*/}
            <div className="flex flex-col items-center md:items-start text-center md:text-left gap-5">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center animate-bounce">
                <FontAwesomeIcon icon={faEnvelopeOpenText} className="text-2xl" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 leading-snug">
                Subscribe & Get <span className="text-emerald-600">20% Off</span>
                <br />
                Your First Order
            </h2>
            <p className="text-gray-500 max-w-sm">
                Join thousands of happy customers and receive weekly offers, flash
                sales, and exclusive perks.
            </p>

            <form className="flex flex-col sm:flex-row gap-4 w-full md:w-auto" onSubmit={handleSubmit}>
                <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-5 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                />
                <button className="px-8 py-3 rounded-xl bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition">
                Subscribe
                </button>
            </form>

            {subscribed && (
                <p className="mt-4 text-emerald-600 font-medium animate-pulse">
                🎉 You're now subscribed!
                </p>
            )}
            </div>

            {/* Right */}
            <div className="flex flex-col gap-5 w-full md:w-1/3">
            {perks.map((perk, i) => (
                <div
                key={i}
                className={`flex items-center gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50 hover:bg-emerald-50 transition transform ${
                    isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
                }`}
                style={{ transitionDelay: `${i * 150}ms` }}
                >
                <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <FontAwesomeIcon icon={perk.icon} />
                </div>
                <span className="font-medium text-gray-700">{perk.label}</span>
                </div>
            ))}
            </div>
        </div>
        </section>
    );
    }

