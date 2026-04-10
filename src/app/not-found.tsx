"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function NotFoundPage() {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        setAnimate(true);
    }, []);

    return (
        <main className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-green-50 to-white px-6 py-12 relative overflow-hidden">
        

        <div
            className={`bg-green-500 text-white p-8 rounded-full shadow-2xl mb-8 transform transition-all duration-700 ${
            animate ? "scale-100 rotate-0 opacity-100" : "scale-75 rotate-12 opacity-0"
            }`}
        >
            <FontAwesomeIcon icon={faCartShopping} className="text-7xl animate-bounce" />
        </div>


        <h1
            className={`text-8xl md:text-9xl font-extrabold text-green-700 mb-4 tracking-widest transition-all duration-700 ${
            animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
        >
            404
        </h1>


        <h2
            className={`text-2xl md:text-3xl font-semibold text-gray-700 mb-4 transition-all duration-700 ${
            animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
        >
            Page Not Found
        </h2>
        <p
            className={`text-gray-600 text-center max-w-xl mb-8 transition-all duration-700 ${
            animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
        >
            Sorry, the page you are looking for does not exist or has been removed. Explore our shop to find amazing products!
        </p>


        <Link
            href="/"
            className={`mt-6 inline-block bg-green-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-green-600 transition-all duration-500 transform ${
            animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
        >
            Go Back to Home
        </Link>


        <div className="absolute top-10 left-10 w-24 h-24 bg-green-200 rounded-full opacity-40 animate-pulse"></div>
        <div className="absolute bottom-20 right-16 w-32 h-32 bg-green-100 rounded-full opacity-30 animate-pulse"></div>
        </main>
    );
}