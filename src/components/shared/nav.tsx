"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTruck,
    faGift,
    faPhone,
    faEnvelope,
    faUser,
    faRightFromBracket,
    faCartShopping,
    faCircleUser,
    faHeadset,
    faSearch,
} from "@fortawesome/free-solid-svg-icons";
import {faHeart} from "@fortawesome/free-regular-svg-icons"

export default function Navbar() {
  return (
    <header className="w-full">

      {/* ================= TOP BAR ================= */}
      <div className="bg-gray-100 text-sm text-gray-600 border-b">
        <div className="container mx-auto px-6 py-2 flex justify-between items-center">

          {/* Left */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faTruck} className="text-green-600" />
              <span>Free Shipping on Orders 500 EGP</span>
            </div>

            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faGift} className="text-green-600" />
              <span>New Arrivals Daily</span>
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faPhone} />
              <span>+1 (800) 123-4567</span>
            </div>

            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faEnvelope} />
              <span>support@freshcart.com</span>
            </div>

            <div className="flex items-center gap-4 border-l pl-6">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faUser} />
                <span>muhammed sayed</span>
              </div>

              <div className="flex items-center gap-2 cursor-pointer hover:text-red-500 transition">
                <FontAwesomeIcon icon={faRightFromBracket} />
                <span>Sign Out</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ================= MAIN NAVBAR (STICKY) ================= */}
      <div className="bg-white sticky top-0 z-50 shadow-md">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="text-green-600 text-2xl">
              <FontAwesomeIcon icon={faCartShopping} />
            </div>
            <span className="text-2xl font-bold text-gray-800">
              FreshCart
            </span>
          </div>

          {/* Search */}
          <div className="flex-1 mx-10 relative">
            <input
              type="text"
              placeholder="Search for products, brands and more..."
              className="w-full border rounded-full py-3 px-6 pr-12 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-green-600 text-white w-9 h-9 rounded-full flex items-center justify-center">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center gap-8 text-gray-700 font-medium">
            <Link href="#" className="hover:text-green-600 transition">
              Home
            </Link>
            <Link href="#" className="hover:text-green-600 transition">
              Shop
            </Link>
            <Link href="#" className="hover:text-green-600 transition">
              Categories
            </Link>
            <Link href="#" className="hover:text-green-600 transition">
              Brands
            </Link>
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-6 ml-8">

            <div className="flex items-center gap-2 cursor-pointer hover:text-green-600 transition">
              <FontAwesomeIcon icon={faHeadset} />
              <span className="text-sm">
                Support <br />
                <span className="font-semibold">24/7 Help</span>
              </span>
            </div>

            <FontAwesomeIcon icon={faHeart} className="cursor-pointer hover:text-red-500 transition" />
            <FontAwesomeIcon icon={faCartShopping} className="cursor-pointer hover:text-green-600 transition" />
            <FontAwesomeIcon icon={faCircleUser} className="cursor-pointer hover:text-green-600 transition" />
          </div>

        </div>
      </div>

    </header>
  );
}