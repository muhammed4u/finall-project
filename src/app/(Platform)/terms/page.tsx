"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileContract, faGavel, faUserShield, faCheckCircle, faShieldHeart, faHandshake } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

export default function TermsOfService() {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        setAnimate(true);
    }, []);

    const sectionClass = (delay: string) => 
        `glass-card p-8 group hover:shadow-emerald-500/10 transition-all duration-700 ${
            animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        } ${delay}`;

    return (
        <div className="min-h-screen py-20 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 animate-pulse" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 animate-pulse" />

            <div className="container relative z-10">
                <header className="text-center mb-20">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-600 text-xs font-bold uppercase tracking-widest mb-6 animate-slideUp">
                        <FontAwesomeIcon icon={faShieldHeart} />
                        Trusted Platform
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 tracking-tight animate-slideUp">
                        Terms of <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400">Service</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-gray-500 text-lg leading-relaxed animate-slideUp delay-100">
                        Everything you need to know about our platform's rules, your rights, and how we keep your experience safe and fresh.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                    <section className={sectionClass("delay-200")}>
                        <div className="size-16 rounded-2xl bg-emerald-500 text-white flex items-center justify-center text-2xl mb-6 shadow-lg shadow-emerald-500/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                            <FontAwesomeIcon icon={faFileContract} />
                        </div>
                        <h2 className="text-2xl font-bold mb-4 text-gray-800">The Agreement</h2>
                        <p className="text-gray-500 leading-relaxed">
                            By using SwiftShop, you agree to these terms. It's a simple contract between us to ensure the best shopping experience for everyone.
                        </p>
                    </section>

                    <section className={sectionClass("delay-300")}>
                        <div className="size-16 rounded-2xl bg-emerald-400 text-white flex items-center justify-center text-2xl mb-6 shadow-lg shadow-emerald-400/20 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500">
                            <FontAwesomeIcon icon={faUserShield} />
                        </div>
                        <h2 className="text-2xl font-bold mb-4 text-gray-800">Privacy First</h2>
                        <p className="text-gray-500 leading-relaxed">
                            Your data is your property. We only use what's necessary to deliver your goods and improve our service, protected by top-tier encryption.
                        </p>
                    </section>

                    <section className={sectionClass("delay-400")}>
                        <div className="size-16 rounded-2xl bg-teal-500 text-white flex items-center justify-center text-2xl mb-6 shadow-lg shadow-teal-500/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                            <FontAwesomeIcon icon={faGavel} />
                        </div>
                        <h2 className="text-2xl font-bold mb-4 text-gray-800">Platform Rules</h2>
                        <p className="text-gray-500 leading-relaxed">
                            Be fair, be kind. We reserve the right to suspend accounts that engage in fraudulent activity or violate our community standards.
                        </p>
                    </section>

                    <section className={sectionClass("delay-500")}>
                        <div className="size-16 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-2xl mb-6 shadow-lg shadow-emerald-600/20 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500">
                            <FontAwesomeIcon icon={faHandshake} />
                        </div>
                        <h2 className="text-2xl font-bold mb-4 text-gray-800">Our Promise</h2>
                        <p className="text-gray-500 leading-relaxed">
                            We guarantee the quality of every product. If you're not happy, our seamless return policy has you covered.
                        </p>
                    </section>
                </div>

                <div className="glass-card p-12 text-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                    <div className="relative z-10">
                        <div className="inline-flex items-center justify-center size-20 rounded-full bg-emerald-100 text-emerald-600 text-4xl mb-8 animate-float">
                            <FontAwesomeIcon icon={faCheckCircle} />
                        </div>
                        <h2 className="text-3xl font-bold mb-4 text-gray-900">Ready to shop?</h2>
                        <p className="text-gray-500 mb-10 max-w-xl mx-auto">
                            By clicking below, you acknowledge that you have read and understood our terms of service.
                        </p>
                        <button className="btn btn-primary px-12 py-4 text-lg mx-auto">
                            Accept & Continue
                        </button>
                    </div>
                </div>
                
                <footer className="mt-20 text-center text-gray-400 text-sm font-medium">
                    &copy; {new Date().getFullYear()} SwiftShop E-Commerce. All rights reserved.
                </footer>
            </div>
        </div>
    );
}