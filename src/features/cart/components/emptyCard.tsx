"use client"
import { faArrowLeftLong, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function EmptyCart() {
    return (
        <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full text-center">

                <div className="mx-auto mb-6 h-24 w-24 rounded-3xl bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center shadow-sm">
                    <FontAwesomeIcon 
                        icon={faShoppingCart} 
                        className="text-4xl text-green-500"
                    />
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                    Your cart is empty
                </h2>

                <p className="text-gray-500 text-sm leading-relaxed mb-8">
                    Looks like you haven’t added anything yet.
                    Start shopping to fill your cart with amazing products.
                </p>

                <Link
                    href="/"
                    className="inline-flex items-center gap-3 bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-green-600/20 hover:shadow-green-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                >
                    <FontAwesomeIcon icon={faArrowLeftLong} />
                    Continue Shopping
                </Link>

                <p className="mt-6 text-xs text-gray-400">
                    Free shipping on orders over 500 EGP
                </p>
            </div>
        </div>
    );
}