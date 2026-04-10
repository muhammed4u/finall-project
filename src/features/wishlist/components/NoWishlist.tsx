"use client"
import { faHeart, faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function WishlistEmpty() {
    return (
        <div className="min-h-screen py-8 flex flex-col">
        <div className="container mx-auto px-4 flex flex-col flex-grow">

            <div className="mb-8">
            <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4 select-none">
                <Link href={"/"} className="hover:text-green-500 transition">
                Home
                </Link>
                <span>/</span>
                <span className="text-gray-900 text-sm">Wishlist</span>
            </nav>

            <div className="flex items-center gap-3">
                <span className="bg-red-500 text-white h-12 w-12 rounded-xl flex items-center justify-center">
                <FontAwesomeIcon icon={faHeart} />
                </span>
                <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
            </div>
            </div>

            <div className="flex flex-col flex-grow items-center justify-center text-center px-4">
            <div className="mb-6 text-red-500">
                <FontAwesomeIcon icon={faHeart} size="6x" />
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                No items added to wishlist yet
            </h2>

            <p className="text-gray-500 mb-8 max-w-md">
                Your wishlist is currently empty. Start adding your favorite products to keep them handy.
            </p>

            <Link
                href="/"
                className="inline-flex items-center gap-2 text-green-500 hover:text-green-600 font-medium transition"
            >
                <FontAwesomeIcon icon={faArrowLeftLong} />
                Continue shopping
            </Link>
            </div>
        </div>
        </div>
    );
}
