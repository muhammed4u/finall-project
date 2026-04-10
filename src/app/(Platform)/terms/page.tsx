
"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileContract, faGavel, faUserShield, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

export default function TermsOfService() {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        setAnimate(true);
    }, []);

    const sectionClass =
        "opacity-0 transform translate-y-6 transition-all duration-700 ease-out";
    const sectionClassActive =
        "opacity-100 translate-y-0 transition-all duration-700 ease-out";

    return (
        <main className="min-h-screen bg-linear-to-b from-green-50 to-white px-6 py-12">
        <section
            className={`max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 transition-all duration-700 ${
            animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
        >
            
            <header className="mb-8 flex items-center space-x-4">
            <div className="bg-green-600 p-3 rounded-full text-white shadow-lg animate-pulse">
                <FontAwesomeIcon icon={faGavel} className="text-3xl" />
            </div>
            <h1 className="text-3xl font-extrabold text-green-700 hover:text-green-600 transition-colors duration-500">
                Terms of Service
            </h1>
            </header>

            <p className="text-gray-700 mb-6 leading-relaxed text-lg">
            Welcome to Fresh Cart! By using our services, you agree to comply with these Terms of Service. Please read them carefully.
            </p>

            <section className="space-y-8">
            
            <div
                className={`${sectionClass} ${animate ? sectionClassActive : ""}`}
            >
                <h2 className="text-xl font-semibold text-green-700 flex items-center gap-3 mb-3 hover:text-green-600 transition-colors duration-500">
                <FontAwesomeIcon icon={faUserShield} className="text-green-600" />
                Account Responsibilities
                </h2>
                <p className="text-gray-700 leading-relaxed">
                Users are responsible for maintaining the confidentiality of their accounts and passwords. Any activity under your account is your responsibility.
                </p>
            </div>

            <div
                className={`${sectionClass} ${animate ? sectionClassActive : ""} delay-100`}
            >
                <h2 className="text-xl font-semibold text-green-700 flex items-center gap-3 mb-3 hover:text-green-600 transition-colors duration-500">
                <FontAwesomeIcon icon={faFileContract} className="text-green-600" />
                Prohibited Actions
                </h2>
                <p className="text-gray-700 leading-relaxed">
                You may not use our services for unlawful purposes, attempt to hack or disrupt our platform, or infringe the rights of others.
                </p>
            </div>

            <div
                className={`${sectionClass} ${animate ? sectionClassActive : ""} delay-200`}
            >
                <h2 className="text-xl font-semibold text-green-700 flex items-center gap-3 mb-3 hover:text-green-600 transition-colors duration-500">
                <FontAwesomeIcon icon={faCheckCircle} className="text-green-600" />
                Purchases and Payments
                </h2>
                <p className="text-gray-700 leading-relaxed">
                All purchases made through Fresh Cart are subject to our payment processing policies. We ensure secure transactions but are not liable for payment failures due to third-party services.
                </p>
            </div>

            <div
                className={`${sectionClass} ${animate ? sectionClassActive : ""} delay-300`}
            >
                <h2 className="text-xl font-semibold text-green-700 flex items-center gap-3 mb-3 hover:text-green-600 transition-colors duration-500">
                <FontAwesomeIcon icon={faGavel} className="text-green-600" />
                Modifications to Terms
                </h2>
                <p className="text-gray-700 leading-relaxed">
                Fresh Cart reserves the right to modify these Terms at any time. Changes will be communicated through our platform and take effect immediately upon posting.
                </p>
            </div>
            </section>

            <footer className="mt-12 text-sm text-gray-500 text-center">
            &copy; {new Date().getFullYear()} Fresh Cart. All rights reserved.
            </footer>
        </section>
        </main>
    );
}