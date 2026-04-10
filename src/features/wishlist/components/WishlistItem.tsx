"use client"
import { faCartShopping, faTrash, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { Product } from "../Types/getLoggedUserWishlist.type";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { removeProductFromWishlist } from "../server/Wishlist.action";
import { removeWishlistItem} from "../store/Wishlist.slice";
import { useAddToCart } from "@/features/cart/hooks/useAddToCart";
import { useEffect, useState } from "react";

export default function WishlistItem({itemInfo}:{itemInfo:Product}) {
    const dispatch = useDispatch()
    const { addToCart} = useAddToCart();
    const [added, setAdded] = useState(false);

    const {title , imageCover, quantity, price , priceAfterDiscount, category , id} = itemInfo

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem("myCart") || "[]");
        if (cart.includes(id)) {
        setAdded(true);
        }
    }, [id]);

    const handleAddToCart = () => {
        addToCart(id);
        setAdded(true);
        const cart = JSON.parse(localStorage.getItem("myCart") || "[]");
        if (!cart.includes(id)) {
        cart.push(id);
        localStorage.setItem("myCart", JSON.stringify(cart));
        }
    };

    const handleRemove = async ()=>{
            const result = await Swal.fire({
                html: `<div class="text-center py-2">
                    <div class="w-16 h-16 mb-4 mx-auto rounded-full bg-red-100 flex items-center justify-center">
                        <svg class="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                    </div>
                    <h3 class="text-xl font-bold mb-2 text-gray-900">Remove Item?</h3>
                    <p class="text-gray-500 leading-relaxed text-sm">
                        Remove <span class="font-semibold text-gray-700">${title.slice(0,40)}${title.length > 40? ".": "."}</span> from your Wishlist?
                    </p>
                    </div>`,
                showCancelButton: true,
                showConfirmButton: true,
                confirmButtonText:"Remove",
                cancelButtonText: "Cancel",
                buttonsStyling: false,
                customClass: {
                    popup: "rounded-2xl shadow-2xl border-0 p-0",
                    htmlContainer: "p-6 m-0",
                    actions: "px-6 pb-6 pt-0 gap-3 flex-row-reverse",
                    confirmButton: "bg-red-500 hover:bg-red-600 text-white py-3 px-6 font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-0",
                    cancelButton:"bg-gray-100 hover:bg-gray-200 py-3 px-6 font-semibold rounded-xl transition-all duration-200"
                }
            })
            if (result.isConfirmed) {
                try {
                    const response = await removeProductFromWishlist({ productId: id })
                    // console.log(response)
                    dispatch(removeWishlistItem({id}))
                    toast.success('Item removed successfully')
                    const cart = JSON.parse(localStorage.getItem("myCart") || "[]");
                    const updatedCart = cart.filter((item: string | number) => item !== id);
                    localStorage.setItem("myCart", JSON.stringify(updatedCart));
                } catch (error) {
                    toast.error('Something went wrong')
                }
            }
    
        }

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-6 px-6 py-6 border-b border-gray-100 hover:bg-gray-50 transition">

            {/* PRODUCT SECTION */}
            <div className="md:col-span-2 flex items-center gap-5">

                {/* Image */}
                <div className="relative w-28 h-28 bg-gray-100 rounded-xl border border-gray-100 flex items-center justify-center overflow-hidden">
                    <img
                        src={imageCover}
                        alt={title}
                        className="w-full h-full object-contain"
                    />

                    {quantity >= 1 && (
                        <div className="absolute bottom-0 right-0 rounded-xl bg-green-500 text-white text-[10px] px-2 py-0.5 rounded flex items-center gap-1">
                            <FontAwesomeIcon icon={faCheck} className="text-[9px]" />
                            In Stock
                        </div>
                    )}
                </div>

                {/* Info */}
                <div>
                    <Link href={`/products/${id}`}>
                        <h3 className="text-base font-semibold text-gray-900 hover:text-green-600 transition leading-snug">
                            {title.length > 40 ? title.slice(0, 40) + "..." : title}
                        </h3>
                    </Link>

                    <p className="text-sm text-gray-500 mt-1">
                        {category.name}
                    </p>
                </div>
            </div>

            {/* PRICE SECTION */}
            <div>

                <div className="flex flex-col">
                    <span className="text-lg font-bold text-gray-900">
                        {priceAfterDiscount || price} EGP
                    </span>

                    {priceAfterDiscount && <span className="text-sm text-gray-400 line-through">
                        {price} EGP
                    </span>}
                </div>
            </div>

            {/* ACTIONS SECTION */}
            <div className="flex flex-col md:items-end">

                <div className="flex items-center gap-3">

                    <button
                        className={`px-5 py-2 rounded-xl text-sm font-medium flex items-center gap-2 transition duration-200 ${
                        added
                            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                            : "bg-green-500 text-white hover:bg-green-600"
                        }`}
                        onClick={handleAddToCart}
                        disabled={added}
                    >
                        <FontAwesomeIcon icon={faCartShopping} />
                        {added ? "Added" : "Add to Cart"}
                    </button>

                    <button className="h-10 w-10 rounded-xl border border-gray-200 bg-gray-50 text-gray-500 hover:bg-red-50 hover:text-red-500 hover:border-red-300 transition duration-200 flex items-center justify-center"
                    onClick={handleRemove}>
                        <FontAwesomeIcon icon={faTrash} />
                    </button>

                </div>
            </div>

        </div>
    );
}

