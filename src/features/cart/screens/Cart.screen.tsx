"use client"
import { AppState } from "@/store/store";
import { faArrowLeftLong, faShoppingCart, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useSelector, useDispatch } from 'react-redux';
import CartItem from "../components/CartItem";
import CartSummary from "../components/CartSummary";
import { clearAllProductsFromCart } from "../server/cart.action";
import { clearCart, setCartInfo } from "../store/Cart.slice";
import { toast } from "react-toastify";
import EmptyCart from "../components/emptyCard";
import { useEffect, useState } from "react";
import CartItemSkeleton from "../components/CartItemSkeleton";

export default function CartScreen() {
    const dispatch = useDispatch()

    const {numOfCartItems, products,totalCartPrice} = useSelector((state:AppState)=> state.cart)

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (products) {
            setLoading(false)
        }
    }, [products])

    if (loading) {
        return (
            <div className="bg-gray-50 min-h-screen py-8">
                <div className="container mx-auto px-4 space-y-4">
                    {[...Array(3)].map((_, i) => (
                        <CartItemSkeleton key={i} />
                    ))}
                </div>
            </div>
        )
    }

if (!products || products.length === 0) {
    return <EmptyCart />
}

    const deleteAll = async ()=>{
        try {
            const response = await clearAllProductsFromCart()
            dispatch(clearCart())
            toast.success("All products removed successfully")
        } catch (error) {
            toast.error("Something went wrong")
        }
    }

    return (
        <>
            <div className="bg-gray-50 min-h-screen py-8">
                <div className="container mx-auto px-4">
                    {/* header */}
                    <div className="mb-8">
                        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                            <Link href={"/"}
                            className="hover:text-green-500 transition duration-200">
                                Home
                            </Link>
                            <span>/</span>
                            <span className="text-gray-900 text-sm">Shopping Cart</span>
                        </nav>

                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                                    <span className="bg-linear-to-r from-green-500 to-green-600 text-white h-12 w-12 rounded-xl flex items-center justify-center">
                                        <FontAwesomeIcon icon={faShoppingCart}/>
                                    </span>
                                    Shopping Cart
                                </h1>
                                <p className="text-gray-500 mt-2">
                                    You have   {  }
                                    <span className="font-semibold text-green-500">
                                        {numOfCartItems} {  }
                                        {numOfCartItems === 1? 'item':'items'}
                                    </span>
                                    {  } in your cart
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* cart items */}
                        <div className="lg:col-span-2">
                            {/* cart items list */}
                            <div className="space-y-4">
                                {products.map((product)=> <CartItem key={product._id} info={product}/>)}
                            </div>
                            <div className="mt-6 pt-6 border-t border-gray-200 flex items-center justify-between">
                                <Link
                                href={"/"}
                                className="text-green-500 hover:text-green-600 transition-colors duration-150 font-medium flex items-center gap-2">
                                    <span><FontAwesomeIcon icon={faArrowLeftLong} /></span>
                                    Continue shopping
                                </Link>
                                <button className="group flex items-center gap-2 text-sm text-gray-400 hover:text-red-500 transition-colors duration-150"
                                onClick={deleteAll}>
                                    <FontAwesomeIcon icon={faTrash} className="text-xs group-hover:scale-110 transition-transform duration-200" />
                                    <span>Clear all items</span>
                                </button>
                            </div>
                        </div>
                        {/* Order summary */}
                        <div className="lg:col-span-1">
                            <CartSummary totalCartPrice={totalCartPrice} numberOfCartItems={numOfCartItems}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
