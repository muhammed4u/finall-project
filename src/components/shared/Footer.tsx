"use client";

import Image from "next/image";
import freshCartLogo from "../../assets/images/freshcart-logo.svg";
import freshCartMiniLogo from "../../assets/images/mini-logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faInstagram, faPinterestP, faTwitter } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-100/50 text-gray-600 mt-20 relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl translate-y-1/2 translate-x-1/2" />
        
        <div className="container relative z-10 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-12 lg:gap-8">

            <div className="xl:col-span-2 space-y-8">
                <div className="flex flex-col gap-4">
                    <Image src={freshCartLogo} alt="Fresh Cart Logo" className="w-48 transition-transform duration-500 hover:scale-105"/>
                    <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                        Elevating your shopping experience with premium products and seamless service. From high-fashion to cutting-edge electronics, we bring the best to your doorstep.
                    </p>
                </div>

                <div className="flex items-center gap-4">
                {[
                    { icon: faFacebookF, color: "hover:bg-blue-500" },
                    { icon: faTwitter, color: "hover:bg-sky-400" },
                    { icon: faInstagram, color: "hover:bg-pink-500" },
                    { icon: faPinterestP, color: "hover:bg-red-600" }
                ].map((social, idx) => (
                    <a 
                        key={idx}
                        href="#" 
                        className={`size-10 flex items-center justify-center rounded-xl bg-gray-50 text-gray-400 ${social.color} hover:text-white transition-all duration-300 transform hover:-translate-y-1 shadow-sm`}
                    >
                        <FontAwesomeIcon icon={social.icon} className="text-sm"/>
                    </a>
                ))}
                </div>
            </div>

            <div className="space-y-6">
                <h2 className="text-sm font-bold uppercase tracking-widest text-gray-900">Categories</h2>
                <ul className="space-y-4 text-sm font-medium">
                {[
                    {name: "Men's Fashion", link: "6439d5b90049ad0b52b90048"},
                    {name: "Women's Fashion", link: "6439d58a0049ad0b52b9003f"},
                    {name: "Baby & Toys", link: "6439d40367d9aa4ca97064cc"},
                    {name: "Beauty & Health", link: "6439d30b67d9aa4ca97064b1"},
                    {name: "Electronics", link: "6439d2d167d9aa4ca970649f"},
                ].map((cat, idx) => (
                    <li key={idx}>
                    <Link href={`/search?category=${cat.link}`} className="hover:text-emerald-500 transition-colors duration-200 flex items-center gap-2 group">
                        <span className="w-0 h-0.5 bg-emerald-500 group-hover:w-4 transition-all duration-300"></span>
                        {cat.name}
                    </Link>
                    </li>
                ))}
                </ul>
            </div>

            <div className="space-y-6">
                <h2 className="text-sm font-bold uppercase tracking-widest text-gray-900">Quick Links</h2>
                <ul className="space-y-4 text-sm font-medium">
                {[
                    {name: "About Us", link: "/about"},
                    {name: "Contact Us", link: "/contact"},
                    {name: "Privacy Policy", link: "/privacy-policy"},
                    {name: "Terms Of Services", link: "/terms"},
                    {name: "Shipping Policy", link: "/shipping-policy"},
                ].map((link, idx) => (
                    <li key={idx}>
                    <Link href={link.link} className="hover:text-emerald-500 transition-colors duration-200 flex items-center gap-2 group">
                        <span className="w-0 h-0.5 bg-emerald-500 group-hover:w-4 transition-all duration-300"></span>
                        {link.name}
                    </Link>
                    </li>
                ))}
                </ul>
            </div>

            <div className="space-y-6">
                <h2 className="text-sm font-bold uppercase tracking-widest text-gray-900">Support</h2>
                <ul className="space-y-4 text-sm font-medium">
                {[
                    {name: "My Account", link: "/profile"},
                    {name: "My Orders", link: "/orders"},
                    {name: "Wishlist", link: "/wishlist"},
                    {name: "Returns & Refunds", link: "/returns-refunds"},
                    {name: "Help Center", link: "/help-center"},
                ].map((link, idx) => (
                    <li key={idx}>
                    <Link href={link.link} className="hover:text-emerald-500 transition-colors duration-200 flex items-center gap-2 group">
                        <span className="w-0 h-0.5 bg-emerald-500 group-hover:w-4 transition-all duration-300"></span>
                        {link.name}
                    </Link>
                    </li>
                ))}
                </ul>
            </div>

            </div>

            <div className="flex flex-col md:flex-row justify-between items-center mt-20 pt-8 border-t border-gray-100 text-gray-400">
                <p className="text-xs font-medium">&copy; {new Date().getFullYear()} SwiftShop E-Commerce Platform. Designed for excellence.</p>
                <div className="flex items-center gap-6 mt-6 md:mt-0">
                    <Image src={freshCartMiniLogo} alt="Fresh Cart" className="w-8 grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer"/>
                </div>
            </div>
        </div>

        </footer>
    );
}