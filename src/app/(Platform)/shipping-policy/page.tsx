"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck, faBoxesPacking, faClock, faMapMarkedAlt } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

export default function ShippingPolicy() {
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
                <FontAwesomeIcon icon={faTruck} className="text-3xl" />
            </div>
            <h1 className="text-3xl font-extrabold text-green-700 hover:text-green-600 transition-colors duration-500">
                Shipping Policy
            </h1>
            </header>

            <p className="text-gray-700 mb-6 leading-relaxed text-lg">
            At Fresh Cart, we ensure your products are delivered safely and promptly. Please review our shipping policy carefully to understand our delivery process.
            </p>

            <section className="space-y-8">
            
            <div
                className={`${sectionClass} ${animate ? sectionClassActive : ""}`}
            >
                <h2 className="text-xl font-semibold text-green-700 flex items-center gap-3 mb-3 hover:text-green-600 transition-colors duration-500">
                <FontAwesomeIcon icon={faClock} className="text-green-600" />
                Order Processing Time
                </h2>
                <p className="text-gray-700 leading-relaxed">
                Orders are processed within 1-3 business days. You will receive a confirmation email once your order has been shipped.
                </p>
            </div>

            <div
                className={`${sectionClass} ${animate ? sectionClassActive : ""} delay-100`}
            >
                <h2 className="text-xl font-semibold text-green-700 flex items-center gap-3 mb-3 hover:text-green-600 transition-colors duration-500">
                <FontAwesomeIcon icon={faBoxesPacking} className="text-green-600" />
                Shipping Methods
                </h2>
                <p className="text-gray-700 leading-relaxed">
                We offer standard and express shipping options. Shipping fees and delivery times vary depending on your location and the shipping method chosen.
                </p>
            </div>

            <div
                className={`${sectionClass} ${animate ? sectionClassActive : ""} delay-200`}
            >
                <h2 className="text-xl font-semibold text-green-700 flex items-center gap-3 mb-3 hover:text-green-600 transition-colors duration-500">
                <FontAwesomeIcon icon={faMapMarkedAlt} className="text-green-600" />
                Tracking Your Order
                </h2>
                <p className="text-gray-700 leading-relaxed">
                Once your order is shipped, you will receive a tracking number via email. You can track your package until it reaches your doorstep.
                </p>
            </div>

            <div
                className={`${sectionClass} ${animate ? sectionClassActive : ""} delay-300`}
            >
                <h2 className="text-xl font-semibold text-green-700 flex items-center gap-3 mb-3 hover:text-green-600 transition-colors duration-500">
                <FontAwesomeIcon icon={faTruck} className="text-green-600" />
                Delivery Areas
                </h2>
                <p className="text-gray-700 leading-relaxed">
                We currently ship to all major cities in Egypt. For rural or remote areas, delivery times may vary. Contact our support team for more information.
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