"use client"
import Link from "next/link";
import { Product } from "../../Types/Products.types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateLeft, faBolt, faCartShopping, faMinus, faPlus, faShareNodes, faShieldHalved, faTruck } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import Ratings from "@/components/ui/Ratings";
import ImageGallery from "react-image-gallery";
import { useState } from "react";
import { toast } from "react-toastify";
import { addProductToCart } from "@/features/cart/server/cart.action";
import { useDispatch, useSelector } from "react-redux";
import { addProductToWishlist, removeProductFromWishlist } from "@/features/wishlist/server/Wishlist.action";
import { addWishlistItem, removeWishlistItem } from "@/features/wishlist/store/Wishlist.slice";
import { AppState } from "@/store/store";
import { setCartInfo } from "@/features/cart/store/Cart.slice";

export default function ProductInfo({product}:{product:Product}) {
    const {
        id,
        title,
        brand,
        category,
        images,
        ratingsAverage,
        ratingsQuantity,
        price,
        priceAfterDiscount,
        quantity,
        subcategory,
        description
    } = product;

    const onSale = priceAfterDiscount ? price > priceAfterDiscount : false
    const discountPercentage = priceAfterDiscount? Math.round((price - priceAfterDiscount)/price * 100) : null
    const isLowStock = quantity >0 && quantity < 10;
    const [counter, setCounter] = useState(1)
    const [localAdded, setLocalAdded] = useState(false)

    const dispatch = useDispatch()

    const wishlistItems = useSelector((state: AppState) => state.wishlist.data)
    const isInWishlist = wishlistItems.some(item => item.id === id)

    const products = useSelector((state: AppState) => state.cart.products)
    const isInCartFromStore = products.some(item => item.product.id === id)
    const isInCart = isInCartFromStore || localAdded

    const handleToggleWishlist = async () => {
        try {
            if (isInWishlist) {
                await removeProductFromWishlist({ productId: id })
                dispatch(removeWishlistItem({ id }))
                toast.success("Removed from wishlist")
            } else {
                await addProductToWishlist({ productId: id })
                dispatch(addWishlistItem(product as any))
                toast.success("Added to wishlist")
            }
        } catch (error) {
            toast.error("Please login first")
        }
    }

    const handleAddToCart = async () => {
        try {
            const response = await addProductToCart({ productId: id })

            if (response.status === "success") {
            dispatch(setCartInfo(response))
            setLocalAdded(true)  
            toast.success("Added to cart")
            }
        } catch (error) {
            toast.error("Please login first")
        }
    }

    return <>
        <section id="product-detail" className="py-6">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-8">
                    
                    <div id="product-images" className="lg:w-1/4">
                        <div className="bg-white rounded-xl shadow-sm p-4 sticky top-4">
                            <ImageGallery items={images.map((image)=>{
                                return {
                                    original: image,
                                    thumbnail: image
                                }
                            })}
                            showNav ={false}
                            showPlayButton={false}/>
                        </div>
                    </div>

                    <div id="product-info" className="lg:w-3/4">
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            
                            <div className="flex flex-wrap gap-2 mb-4">
                                <Link href={""}
                                className="bg-green-50 text-green-600 text-xs px-3 py-1.5 rounded-full hover:bg-gray-100 transition-colors duration-200">
                                    {category.name}
                                </Link>
                                <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1.5 rounded-full">
                                    {brand.name}
                                </span>
                            </div>
                            
                            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
                                {title}
                            </h1>
                            
                            <div className="flex items-center gap-3 mb-4">
                                <Ratings rating={ratingsAverage}/>
                                <span className="text-sm text-gray-600">
                                    {ratingsAverage} ( {ratingsQuantity} reviews )
                                </span>
                            </div>
                            
                            <div className="flex flex-wrap items-center gap-3 mb-6">
                                <span className="text-3xl font-bold text-gray-900">
                                        {priceAfterDiscount || price} EGP
                                </span>
                                { 
                                    onSale && (
                                        <>
                                            <span className="text-lg text-gray-400 line-through">
                                                {price}
                                            </span>
                                            <span className="bg-red-500 text-white text-sm px-3 py-1 rounded-full font-medium">
                                                Save {discountPercentage}
                                            </span>
                                        </>
                                    )
                                }
                            </div>
                            
                            <div className="flex items-center gap-2 mb-6">
                                {quantity > 0 ? (
                                    <span
                                    className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full bg-green-50 text-green-600">
                                        <span
                                        className={`w-2 h-2 rounded-full ${isLowStock? 'bg-yellow-500':'bg-green-500'}`}></span>
                                        {isLowStock? `Only ${quantity} left, order soon!`: 'In Stock'}
                                    </span>
                                ): (
                                    <span
                                    className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full bg-red-50 text-red-600">
                                        <span className="w-2 h-2 rounded-full bg-red-500"></span>
                                        Out of stock
                                    </span>
                                )}
                            </div>
                        </div>
                        
                        <div className="border-t border-gray-100 pt-5 mb-6">
                            <p className="text-gray-600 leading-relaxed">
                                {description}
                            </p>
                        </div>
                        
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Quantity
                            </label>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center border-2 border-gray-200 rounded-lg overflow-hidden">
                                    <button
                                    id="decrease"
                                    onClick={()=> {setCounter(counter - 1)}}
                                    className="px-4 py-3 text-gray-600 hover:bg-gray-100 hover:text-green-500 transition duration-200 disabled:opacity-50">
                                        <FontAwesomeIcon icon={faMinus}/>
                                    </button>
                                    <input type="number"
                                    min={1}
                                    value={counter}
                                    onChange={(e)=> e.target.value}
                                    className="w-16 text-center border-0 focus:ring-0 focus:outline-none text-lg font-medium"
                                    id="quantity"/>
                                    <button
                                    id="increase"
                                    onClick={()=> {setCounter(counter + 1)}}
                                    className="px-4 py-3 text-gray-600 hover:bg-gray-100 hover:text-green-500 transition duration-200 disabled:opacity-50">
                                        <FontAwesomeIcon icon={faPlus}/>
                                    </button>
                                </div>
                                <span className="text-sm text-gray-500">{quantity} available</span>
                            </div>
                        </div>
                        
                        <div className="bg-gray-50 rounded-lg p-4 mb-6 ">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Total Price:</span>
                                <span className="text-2xl font-bold text-green-500">
                                    {counter * (priceAfterDiscount || price)} EGP
                                </span>
                            </div>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-3 mb-6">
                            <button
                            id="add-to-cart"
                            onClick={handleAddToCart}
                            disabled={isInCart}
                            className={`flex-1 py-3.5 px-6 rounded-xl font-medium transition-all flex items-center justify-center gap-2 shadow-lg
                                ${
                                isInCart
                                    ? "bg-gray-200 text-green-600 cursor-not-allowed shadow-none"
                                    : "bg-green-500 text-white hover:bg-green-600 active:scale-[0.98] shadow-green-500/25"
                                }
                            `}
                            >
                            <FontAwesomeIcon icon={faCartShopping} />

                            {isInCart ? "Added to Cart ✓" : "Add to Cart"}
                            </button>
                            <Link href={"/shop"}
                            className={`flex-1 bg-gray-900 text-white py-3.5 px-6 rounded-xl font-medium hover:bg-gray-800 active:scale-[0.98] transition-all flex items-center justify-center gap-2`}>
                                <>
                                    <FontAwesomeIcon icon={faBolt}/>
                                    Buy Now
                                </>
                            </Link>
                            
                        </div>
                        
                        <div className="flex gap-3 mb-6">
                            <button
                                id="wishlist-button"
                                onClick={handleToggleWishlist}
                                className={`flex-1 border-2 py-3 px-4 rounded-xl font-medium transition duration-200 flex items-center justify-center gap-2
                                ${
                                    isInWishlist
                                    ? "bg-red-500 text-white border-red-500"
                                    : "border-gray-200 text-gray-700 hover:border-green-300 hover:text-green-500"
                                }`}
                            >
                                <FontAwesomeIcon icon={faHeart} />
                            </button>
                        </div>
                        
                        <div className="border-t border-gray-100 pt-6">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 bg-green-100 text-green-500 rounded-full flex items-center justify-center shrink-0">
                                        <FontAwesomeIcon icon={faTruck}/>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-900 text-sm">Free Delivery</h4>
                                        <p className="text-xs text-gray-500">Orders over $50</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 bg-green-100 text-green-500 rounded-full flex items-center justify-center shrink-0">
                                        <FontAwesomeIcon icon={faArrowRotateLeft}/>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-900 text-sm">30 Days Return</h4>
                                        <p className="text-xs text-gray-500">Money back</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 bg-green-100 text-green-500 rounded-full flex items-center justify-center shrink-0">
                                        <FontAwesomeIcon icon={faShieldHalved}/>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-900 text-sm">Secure Payment</h4>
                                        <p className="text-xs text-gray-500">100% Protected</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>;
}
