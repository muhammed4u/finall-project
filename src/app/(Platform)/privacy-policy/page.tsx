"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldAlt, faUserLock, faFileContract, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

export default function PrivacyPolicy() {
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
            {/* Header */}
            <header className="mb-8 flex items-center space-x-4">
            <div className="bg-green-600 p-3 rounded-full text-white shadow-lg animate-pulse">
                <FontAwesomeIcon icon={faShieldAlt} className="text-3xl" />
            </div>
            <h1 className="text-3xl font-extrabold text-green-700 hover:text-green-600 transition-colors duration-500">
                Privacy Policy
            </h1>
            </header>

            {/* Introduction */}
            <p className="text-gray-700 mb-6 leading-relaxed text-lg">
            Your privacy is important to us. This policy explains how we collect,
            use, and protect your personal information on our platform.
            </p>

            {/* Sections */}
            <section className="space-y-8">
            {/* Data Collection */}
            <div
                className={`${sectionClass} ${animate ? sectionClassActive : ""}`}
            >
                <h2 className="text-xl font-semibold text-green-700 flex items-center gap-3 mb-3 hover:text-green-600 transition-colors duration-500">
                <FontAwesomeIcon icon={faUserLock} className="text-green-600" />
                Data Collection
                </h2>
                <p className="text-gray-700 leading-relaxed">
                We collect information you provide directly to us when you register,
                make a purchase, or interact with our services. This may include your
                name, email address, payment details, and more.
                </p>
            </div>

            {/* Data Usage */}
            <div
                className={`${sectionClass} ${animate ? sectionClassActive : ""} delay-100`}
            >
                <h2 className="text-xl font-semibold text-green-700 flex items-center gap-3 mb-3 hover:text-green-600 transition-colors duration-500">
                <FontAwesomeIcon icon={faFileContract} className="text-green-600" />
                How We Use Your Data
                </h2>
                <p className="text-gray-700 leading-relaxed">
                Your data is used to improve our services, process transactions,
                provide personalized offers, and communicate important updates. We
                do not sell your personal information to third parties.
                </p>
            </div>

            {/* Data Security */}
            <div
                className={`${sectionClass} ${animate ? sectionClassActive : ""} delay-200`}
            >
                <h2 className="text-xl font-semibold text-green-700 flex items-center gap-3 mb-3 hover:text-green-600 transition-colors duration-500">
                <FontAwesomeIcon icon={faCheckCircle} className="text-green-600" />
                Data Security
                </h2>
                <p className="text-gray-700 leading-relaxed">
                We implement robust security measures including encryption, access
                controls, and regular security audits to safeguard your personal
                information.
                </p>
            </div>

            {/* Your Rights */}
            <div
                className={`${sectionClass} ${animate ? sectionClassActive : ""} delay-300`}
            >
                <h2 className="text-xl font-semibold text-green-700 flex items-center gap-3 mb-3 hover:text-green-600 transition-colors duration-500">
                <FontAwesomeIcon icon={faUserLock} className="text-green-600" />
                Your Rights
                </h2>
                <p className="text-gray-700 leading-relaxed">
                You have the right to access, update, or delete your personal data. You
                can also opt out of marketing communications at any time.
                </p>
            </div>
            </section>

            {/* Footer */}
            <footer className="mt-12 text-sm text-gray-500 text-center">
            &copy; {new Date().getFullYear()} Fresh Cart. All rights reserved.
            </footer>
        </section>
        </main>
    );
}