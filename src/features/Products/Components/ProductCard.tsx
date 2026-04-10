"use client"
import { faEye, faHeart as faHeartRegular   } from "@fortawesome/free-regular-svg-icons";
import { faCheck, faPlus , faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
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
        <>
            <div 
                id="product-card"
                className="bg-white border h-[430px] border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition flex flex-col flex-grow"
                >
                    <div className="relative flex-shrink-0">
                        <img src={imageCover} alt={title}
                        className="w-full h-60 object-contain bg-white"
                        />
                        <div className="absolute top-3 left-3">
                            {onSale && <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                                -{discountPercentage}%
                            </span>}
                        </div>
                        <div className="absolute top-3 right-3 flex flex-col space-y-2">
                            <button
                            onClick={handleToggleWishlist}
                            className={`h-9 w-9 rounded-full flex items-center justify-center transition-all duration-300 shadow-md
                            ${isInWishlist 
                                ? "bg-red-50 hover:bg-red-100" 
                                : "bg-white hover:bg-gray-100"}`}
                            >
                            <FontAwesomeIcon
                                icon={isInWishlist ? faHeartSolid : faHeartRegular}
                                className={`text-lg ${
                                isInWishlist ? "text-red-500" : "text-gray-500"
                                }`}
                            />
                            </button>

                            <Link
                                href={`/products/${id}`}
                                className="bg-white h-8 w-8 rounded-full flex items-center justify-center transition shadow-sm text-gray-600 hover:text-green-500">
                                    <FontAwesomeIcon icon={faEye}/>
                            </Link>
                        </div>
                    </div>
                    <div className="p-4 flex flex-col flex-grow">
                        <div className="text-xs text-gray-500 mb-1">{category.name}</div>
                        <h3 className="font-medium mb-1 cursor-pointer">
                            <Link className="line-clamp-2" href={`/products/${id}`}>
                                {title}
                            </Link>
                        </h3>
                        <div className="flex items-center mb-2">
                            <div className="flex text-amber-400 mr-2">
                                <Ratings rating={ratingsAverage}/>
                            </div>
                            <span className="text-xs text-gray-500">{ratingsAverage} {ratingsQuantity} reviews</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                            {
                                priceAfterDiscount? <> <span className="text-lg font-bold text-green-500">{priceAfterDiscount} EGP</span>
                                <span className="line-through text-sm ml-2 text-gray-500">{price} EGP</span></>: <>
                                <span className="text-lg font-bold text-green-500">{price} EGP</span>
                                </>
                            }
                            </div>
                            <button
                            onClick={handleAddToCart}
                            disabled={isAdded}
                            className={`w-10 h-10 flex items-center justify-center rounded-full text-white transition-colors duration-200
                                ${isAdded ? "bg-green-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"}`}
                            title={isAdded ? "Added to cart" : "Add to cart"}
                            >
                            <FontAwesomeIcon icon={isAdded ? faCheck : faPlus} />
                            </button>
                        </div>
                    </div>
            </div>
        </>
    )
}
