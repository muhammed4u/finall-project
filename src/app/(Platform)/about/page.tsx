"use client"

import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLeaf, faTruckFast, faShieldHalved, faHeadset } from "@fortawesome/free-solid-svg-icons"

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-linear-to-b from-white via-green-50 to-white text-gray-800">

        <section className="relative overflow-hidden py-24 px-6 text-center">
            <div className="max-w-4xl mx-auto">

            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-linear-to-r from-green-600 to-emerald-400 bg-clip-text text-transparent animate-fade-in">
                About Our Store
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
                We deliver premium quality products with exceptional customer experience.
                Our mission is to combine affordability, innovation, and trust in one place.
            </p>

            <div className="mt-10">
                <Link
                href="/products"
                className="inline-block px-8 py-3 bg-green-500 text-white rounded-full font-medium shadow-lg hover:bg-green-600 hover:scale-105 transition-all duration-300"
                >
                Explore Products
                </Link>
            </div>
            </div>

            <div className="absolute -top-20 -left-20 w-72 h-72 bg-green-200 rounded-full blur-3xl opacity-40 animate-pulse"></div>
            <div className="absolute bottom-0 -right-20 w-72 h-72 bg-emerald-300 rounded-full blur-3xl opacity-40 animate-pulse"></div>
        </section>

        <section className="py-20 px-6">
            <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">

            {[
                { icon: faLeaf, title: "Quality Products", desc: "Carefully selected premium items." },
                { icon: faTruckFast, title: "Fast Delivery", desc: "Quick and secure shipping." },
                { icon: faShieldHalved, title: "Secure Payment", desc: "100% protected transactions." },
                { icon: faHeadset, title: "24/7 Support", desc: "We are here anytime for you." },
            ].map((item, index) => (
                <div
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-green-100"
                >
                <div className="text-green-500 text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    <FontAwesomeIcon icon={item.icon} />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                    {item.title}
                </h3>
                <p className="text-gray-500 text-sm">
                    {item.desc}
                </p>
                </div>
            ))}

            </div>
        </section>

        <section className="py-20 px-6 bg-white">
            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">

            <div>
                <h2 className="text-3xl font-bold mb-6 text-green-600">
                Our Journey
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                Founded with passion and innovation, our store began with a simple idea:
                to make premium shopping accessible to everyone.
                </p>
                <p className="text-gray-600 leading-relaxed">
                Today, we proudly serve thousands of happy customers and continue
                growing through trust, quality, and dedication.
                </p>
            </div>

            <div className="relative">
                <div className="bg-linear-to-tr from-green-400 to-emerald-300 rounded-3xl p-1 shadow-xl hover:scale-105 transition-transform duration-300">
                <div className="bg-white rounded-3xl p-10 text-center">
                    <h3 className="text-4xl font-bold text-green-500">10K+</h3>
                    <p className="text-gray-600 mt-2">Happy Customers</p>
                </div>
                </div>
            </div>

            </div>
        </section>

        <section className="py-20 px-6 text-center bg-linear-to-r from-green-500 to-emerald-400 text-white">

            <h2 className="text-4xl font-bold mb-6">
            Ready to Start Shopping?
            </h2>

            <Link
            href={'/'}
            className="inline-block bg-white text-green-600 font-semibold px-8 py-3 rounded-full shadow-lg hover:scale-105 transition-all duration-300"
            >
            Shop Now
            </Link>

        </section>

        </div>
    )
}