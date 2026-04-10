"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUndoAlt, faReceipt, faClock, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

export default function ReturnsRefundsPolicy() {
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
                <FontAwesomeIcon icon={faUndoAlt} className="text-3xl" />
            </div>
            <h1 className="text-3xl font-extrabold text-green-700 hover:text-green-600 transition-colors duration-500">
                Returns & Refunds Policy
            </h1>
            </header>

            <p className="text-gray-700 mb-6 leading-relaxed text-lg">
            At Fresh Cart, your satisfaction is our priority. If you're not completely satisfied with your purchase, our Returns & Refunds Policy ensures a smooth and fair process.
            </p>

            <section className="space-y-8">
            
            <div
                className={`${sectionClass} ${animate ? sectionClassActive : ""}`}
            >
                <h2 className="text-xl font-semibold text-green-700 flex items-center gap-3 mb-3 hover:text-green-600 transition-colors duration-500">
                <FontAwesomeIcon icon={faClock} className="text-green-600" />
                Return Window
                </h2>
                <p className="text-gray-700 leading-relaxed">
                You can return eligible items within 14 days from the delivery date. Items must be unused, in original packaging, and with all tags intact.
                </p>
            </div>

            <div
                className={`${sectionClass} ${animate ? sectionClassActive : ""} delay-100`}
            >
                <h2 className="text-xl font-semibold text-green-700 flex items-center gap-3 mb-3 hover:text-green-600 transition-colors duration-500">
                <FontAwesomeIcon icon={faReceipt} className="text-green-600" />
                Refund Process
                </h2>
                <p className="text-gray-700 leading-relaxed">
                Once your return is received and inspected, your refund will be processed within 5-7 business days. Refunds will be issued to the original payment method.
                </p>
            </div>

            <div
                className={`${sectionClass} ${animate ? sectionClassActive : ""} delay-200`}
            >
                <h2 className="text-xl font-semibold text-green-700 flex items-center gap-3 mb-3 hover:text-green-600 transition-colors duration-500">
                <FontAwesomeIcon icon={faExclamationTriangle} className="text-green-600" />
                Non-Returnable Items
                </h2>
                <p className="text-gray-700 leading-relaxed">
                Some items are non-returnable for hygiene or safety reasons, including perishable goods, intimate apparel, and personalized products.
                </p>
            </div>

            <div
                className={`${sectionClass} ${animate ? sectionClassActive : ""} delay-300`}
            >
                <h2 className="text-xl font-semibold text-green-700 flex items-center gap-3 mb-3 hover:text-green-600 transition-colors duration-500">
                <FontAwesomeIcon icon={faUndoAlt} className="text-green-600" />
                How to Initiate a Return
                </h2>
                <p className="text-gray-700 leading-relaxed">
                To start a return, contact our support team with your order number. We will guide you through the process and provide a prepaid shipping label if eligible.
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