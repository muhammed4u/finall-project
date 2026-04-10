"use client";

import Image from "next/image";
import freshCartLogo from "../../assets/images/freshcart-logo.svg";
import freshCartMiniLogo from "../../assets/images/mini-logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faInstagram, faPinterestP, faTwitter } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-200 text-gray-700">
        <div className="container mx-auto px-4 py-10">
            <div className="grid md:grid-cols-2 xl:grid-cols-5 gap-8">

            <div className="xl:col-span-2 space-y-5">
                <Image src={freshCartLogo} alt="Fresh Cart Logo" className="w-40 transition-transform duration-300 hover:scale-105"/>
                <p className="text-gray-500 text-sm leading-relaxed">
                FreshCart is a versatile e-commerce platform offering a wide range of products,
                from clothing to electronics. Enjoy a seamless shopping experience with premium support.
                </p>

                <ul className="flex items-center gap-4 text-lg">
                {[faFacebookF, faTwitter, faInstagram, faPinterestP].map((icon, idx) => (
                    <li key={idx}>
                    <a 
                        href="#" 
                        className="text-gray-500 hover:text-green-500 transition-transform duration-300 transform hover:-translate-y-1 hover:scale-110"
                    >
                        <FontAwesomeIcon icon={icon}/>
                    </a>
                    </li>
                ))}
                </ul>
            </div>

            <div>
                <h2 className="text-xl font-bold mb-5 text-gray-900">Categories</h2>
                <ul className="space-y-3 text-sm">
                {[
                    {name: "Men's Fashion", link: "6439d5b90049ad0b52b90048"},
                    {name: "Women's Fashion", link: "6439d58a0049ad0b52b9003f"},
                    {name: "Baby & Toys", link: "6439d40367d9aa4ca97064cc"},
                    {name: "Beauty & Health", link: "6439d30b67d9aa4ca97064b1"},
                    {name: "Electronics", link: "6439d2d167d9aa4ca970649f"},
                ].map((cat, idx) => (
                    <li key={idx}>
                    <Link href={`/search?category=${cat.link}`} className="hover:text-green-500 transition-colors duration-200">
                        {cat.name}
                    </Link>
                    </li>
                ))}
                </ul>
            </div>

            <div>
                <h2 className="text-xl font-bold mb-5 text-gray-900">Quick Links</h2>
                <ul className="space-y-3 text-sm">
                {[
                    {name: "About Us", link: "/about"},
                    {name: "Contact Us", link: "/contact"},
                    {name: "Privacy Policy", link: "/privacy-policy"},
                    {name: "Terms Of Services", link: "/terms"},
                    {name: "Shipping Policy", link: "/shipping-policy"},
                ].map((link, idx) => (
                    <li key={idx}>
                    <Link href={link.link} className="hover:text-green-500 transition-colors duration-200">
                        {link.name}
                    </Link>
                    </li>
                ))}
                </ul>
            </div>

            <div>
                <h2 className="text-xl font-bold mb-5 text-gray-900">Customer Service</h2>
                <ul className="space-y-3 text-sm">
                {[
                    {name: "My Account", link: "/profile"},
                    {name: "My Orders", link: "/orders"},
                    {name: "Wishlist", link: "/wishlist"},
                    {name: "Returns & Refunds", link: "/returns-refunds"},
                    {name: "Help Center", link: "/help-center"},
                ].map((link, idx) => (
                    <li key={idx}>
                    <Link href={link.link} className="hover:text-green-500 transition-colors duration-200">
                        {link.name}
                    </Link>
                    </li>
                ))}
                </ul>
            </div>

            </div>

            <div className="flex flex-col md:flex-row justify-between items-center mt-10 pt-6 border-t border-gray-200 text-gray-500">
            <p className="text-sm">&copy; {new Date().getFullYear()} FreshCart. All rights reserved.</p>
            <Image src={freshCartMiniLogo} alt="Fresh Cart" className="w-10 mt-4 md:mt-0 transition-transform duration-300 hover:scale-110"/>
            </div>
        </div>
        </footer>
    );
}