"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle, faEnvelope, faPhone, faCircleInfo, faLifeRing, faUndoAlt } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

export default function HelpCenter() {
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
            className={`max-w-5xl mx-auto bg-white shadow-xl rounded-xl p-8 transition-all duration-700 ${
            animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
        >
            
            <header className="mb-10 flex flex-col md:flex-row items-center md:justify-between gap-6">
            <div className="flex items-center gap-4">
                <div className="bg-green-600 p-4 rounded-full text-white shadow-lg animate-pulse">
                <FontAwesomeIcon icon={faQuestionCircle} className="text-4xl" />
                </div>
                <div>
                <h1 className="text-4xl font-extrabold text-green-700 hover:text-green-600 transition-colors duration-500">
                    Help Center
                </h1>
                <p className="text-gray-700 mt-2">
                    Find answers, guides, and contact information to help you with your Fresh Cart experience.
                </p>
                </div>
            </div>
            </header>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <div
                className={`${sectionClass} ${animate ? sectionClassActive : ""}`}
            >
                <div className="flex items-center gap-3 mb-3">
                <FontAwesomeIcon
                    icon={faCircleInfo}
                    className="text-green-600 text-2xl"
                />
                <h2 className="text-xl font-semibold text-green-700 hover:text-green-600 transition-colors duration-500">
                    Account & Profile
                </h2>
                </div>
                <p className="text-gray-700 leading-relaxed">
                Learn how to create an account, manage your profile, and update your personal information.
                </p>
            </div>

            <div
                className={`${sectionClass} ${animate ? sectionClassActive : ""} delay-100`}
            >
                <div className="flex items-center gap-3 mb-3">
                <FontAwesomeIcon
                    icon={faLifeRing}
                    className="text-green-600 text-2xl"
                />
                <h2 className="text-xl font-semibold text-green-700 hover:text-green-600 transition-colors duration-500">
                    Orders & Shipping
                </h2>
                </div>
                <p className="text-gray-700 leading-relaxed">
                Get information about order tracking, shipping times, and delivery updates.
                </p>
            </div>

            <div
                className={`${sectionClass} ${animate ? sectionClassActive : ""} delay-200`}
            >
                <div className="flex items-center gap-3 mb-3">
                <FontAwesomeIcon
                    icon={faUndoAlt}
                    className="text-green-600 text-2xl"
                />
                <h2 className="text-xl font-semibold text-green-700 hover:text-green-600 transition-colors duration-500">
                    Returns & Refunds
                </h2>
                </div>
                <p className="text-gray-700 leading-relaxed">
                Find out how to return items, request refunds, and check your eligibility.
                </p>
            </div>

            <div
                className={`${sectionClass} ${animate ? sectionClassActive : ""} delay-300`}
            >
                <div className="flex items-center gap-3 mb-3">
                <FontAwesomeIcon
                    icon={faEnvelope}
                    className="text-green-600 text-2xl"
                />
                <h2 className="text-xl font-semibold text-green-700 hover:text-green-600 transition-colors duration-500">
                    Contact Support
                </h2>
                </div>
                <p className="text-gray-700 leading-relaxed">
                Reach out via email or phone for any questions that are not covered in our FAQs.
                </p>
            </div>
            </section>

            <section className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-green-50 p-6 rounded-xl shadow hover:shadow-lg transition-shadow duration-500">
                <FontAwesomeIcon icon={faEnvelope} className="text-green-600 text-3xl mb-4" />
                <h3 className="font-semibold text-green-700 mb-2">Email Us</h3>
                <p className="text-gray-700">support@freshcart.com</p>
            </div>
            <div className="bg-green-50 p-6 rounded-xl shadow hover:shadow-lg transition-shadow duration-500">
                <FontAwesomeIcon icon={faPhone} className="text-green-600 text-3xl mb-4" />
                <h3 className="font-semibold text-green-700 mb-2">Call Us</h3>
                <p className="text-gray-700">+20 123 456 789</p>
            </div>
            <div className="bg-green-50 p-6 rounded-xl shadow hover:shadow-lg transition-shadow duration-500">
                <FontAwesomeIcon icon={faLifeRing} className="text-green-600 text-3xl mb-4" />
                <h3 className="font-semibold text-green-700 mb-2">FAQs</h3>
                <p className="text-gray-700">Find quick answers to common questions</p>
            </div>
            </section>
        </section>
        </main>
    );
}