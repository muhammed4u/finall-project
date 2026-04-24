"use client"
import { faEye, faHeart as faHeartRegular   } from "@fortawesome/free-regular-svg-icons";
import { faCheck, faPlus , faHeart as faHeartSolid, faBolt, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { Product } from "../Types/Products.types";
import Ratings from "@/components/ui/Ratings";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addProductToWishlist, getLoggedUserWishlist, removeProductFromWishlist } from "@/features/wishlist/server/Wishlist.action";
import { removeWishlistItem, setWishlistInfo } from "@/features/wishlist/store/Wishlist.slice";
import { useAddToCart } from "@/features/cart/hooks/useAddToCart";
import { AppState } from "@/store/store";

export default function ProductCard({info}: {info:Product}) {

    const dispatch = useDispatch()
    const { addToCart, isLoading } = useAddToCart();
    const [isAdded, setIsAdded] = useState(false);

    const {id, imageCover,price, priceAfterDiscount, ratingsAverage , title, category, ratingsQuantity} = info
    const onSale = priceAfterDiscount ? price > priceAfterDiscount : false
    const discountPercentage = priceAfterDiscount? Math.round((price - priceAfterDiscount)/price * 100) : null

    const wishlistItems = useSelector((state: AppState) => state.wishlist.data);
    const isInWishlist = wishlistItems.some(item => item.id === id);

        useEffect(() => {
        const cart = JSON.parse(localStorage.getItem("myCart") || "[]");
        if (cart.includes(id)) {
        setIsAdded(true);
        }
    }, [id]);

    const handleAddToCart = async () => {
    const cart = JSON.parse(localStorage.getItem("myCart") || "[]");
        if (!cart.includes(id)) {
            cart.push(id);
            localStorage.setItem("myCart", JSON.stringify(cart));
        }
    const success = await addToCart(id);

    if (success) {
        setIsAdded(true);
    }
    };

    const handleToggleWishlist = async () => {
        try {
            if (isInWishlist) {
            await removeProductFromWishlist({ productId: id });
            dispatch(removeWishlistItem({ id }));
            toast.success("Removed from wishlist");
            } else {
            const response = await addProductToWishlist({ productId: id });
            if (response.status === "success") {
                toast.success(response.message);
                const wishlistInfo = await getLoggedUserWishlist();
                dispatch(setWishlistInfo(wishlistInfo));
            }
            }
        } catch (error) {
            toast.error("Wishlist action failed");
        }
        };
    return (
        <div 
            id="product-card"
            className="glass-card flex flex-col h-full hover:-translate-y-3 hover:shadow-[0_20px_50px_rgba(16,185,129,0.15)] transition-all duration-700 group relative overflow-hidden"
        >
            {/* Top Shine Effect */}
            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-emerald-400/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

            {/* Image Section */}
            <Link href={`/products/${id}`} className="relative p-4 overflow-hidden cursor-pointer block">
                <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-gray-50/50 group-hover:bg-white transition-all duration-700 shadow-inner">
                    <img 
                        src={imageCover} 
                        alt={title}
                        className="w-full h-full object-contain p-8 group-hover:scale-110 group-hover:rotate-2 transition-all duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                    />
                    
                    {/* Liquid Shine Overlay */}
                    <div className="absolute -inset-full bg-linear-to-tr from-transparent via-white/20 to-transparent rotate-45 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out" />
                    
                    {/* Sophisticated Gradient Overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-emerald-950/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>

                {/* Minimalist Badges */}
                <div className="absolute top-7 left-7 flex flex-col gap-2 items-start z-10">
                    {onSale && (
                        <span className="bg-rose-500 text-white text-[10px] font-black px-2.5 py-1 rounded-lg shadow-xl shadow-rose-500/30 tracking-tight animate-pulse">
                            -{discountPercentage}%
                        </span>
                    )}
                    <span className="bg-white/80 backdrop-blur-md text-emerald-800 text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-sm border border-white/50">
                        {category.name}
                    </span>
                </div>

                {/* High-End Action Menu */}
                <div className="absolute top-7 right-7 flex flex-col gap-3 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                    <button
                        onClick={(e) => { e.preventDefault(); handleToggleWishlist(); }}
                        className={`size-10 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-2xl backdrop-blur-xl border ${
                            isInWishlist 
                            ? "bg-rose-500 border-rose-500 text-white" 
                            : "bg-white/80 border-white text-gray-700 hover:bg-emerald-500 hover:border-emerald-500 hover:text-white"
                        }`}
                    >
                        <FontAwesomeIcon icon={isInWishlist ? faHeartSolid : faHeartRegular} className="text-sm" />
                    </button>
                </div>
            </Link>

            {/* Content Section */}
            <div className="px-6 pb-6 pt-2 flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-4">
                    <div className="flex text-amber-400 text-[10px] gap-0.5">
                        <Ratings rating={ratingsAverage} />
                    </div>
                    <span className="text-[10px] font-black text-gray-400 opacity-50 tracking-tighter">{ratingsQuantity} Reviews</span>
                </div>

                <h3 className="font-bold text-gray-800 text-base mb-6 line-clamp-2 min-h-[48px] leading-snug group-hover:text-emerald-600 transition-colors duration-300">
                    <Link href={`/products/${id}`}>{title}</Link>
                </h3>

                <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-50">
                    <div className="flex flex-col">
                        {priceAfterDiscount ? (
                            <>
                                <span className="text-xs text-gray-400 line-through font-bold opacity-50">{price} EGP</span>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-2xl font-black text-gray-900 tracking-tighter">{priceAfterDiscount}</span>
                                    <span className="text-xs font-black text-emerald-600">EGP</span>
                                </div>
                            </>
                        ) : (
                            <div className="flex items-baseline gap-1">
                                <span className="text-2xl font-black text-gray-900 tracking-tighter">{price}</span>
                                <span className="text-xs font-black text-emerald-600">EGP</span>
                            </div>
                        )}
                    </div>

                    <button
                        onClick={(e) => { e.preventDefault(); handleAddToCart(); }}
                        disabled={isAdded}
                        className={`size-12 flex items-center justify-center rounded-2xl transition-all duration-500 shadow-2xl ${
                            isAdded 
                            ? "bg-emerald-50 text-emerald-500 cursor-not-allowed" 
                            : "bg-gray-900 text-white hover:bg-emerald-500 hover:scale-110 active:scale-95 shadow-gray-900/10 hover:shadow-emerald-500/20"
                        }`}
                    >
                        <FontAwesomeIcon icon={isAdded ? faCheck : faPlus} className={isAdded ? "text-sm" : "text-lg"} />
                    </button>
                </div>
            </div>
        </div>
    )
}
