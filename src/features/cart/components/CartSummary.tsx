import { faArrowLeftLong, faLock, faShieldAlt, faShoppingBag, faTag, faTruck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function CartSummary({totalCartPrice, numberOfCartItems}: {totalCartPrice:number, numberOfCartItems:number}) {

    const subTotal = totalCartPrice;
    const shipping = subTotal >500? 0 : 100;
    const total = Math.round(subTotal + shipping)

    return (
        <>
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden sticky top-24">
                
                <div className="bg-linear-to-r from-green-500 to-green-600 px-6 py-4" >
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                        <FontAwesomeIcon icon={faShoppingBag}/>
                        Order Summary
                    </h2>
                    <p className="text-green-100 text-sm mt-1">
                        You have {numberOfCartItems} {numberOfCartItems ===1 ? "item" : "items"} in your cart
                    </p>
                </div>
                <div className="p-6 space-y-5">
                    
                    {
                        shipping>0 && (
                            <div className="bg-linear-to-r from-orange-50 to-amber-50 rounded-xlp-4">
                                <div className="mb-2 flex items-center gap-2">
                                    <FontAwesomeIcon icon={faTruck} className="text-orange-500"/>
                                    <span className="text-sm font-medium text-gray-700">
                                        Add {500 - subTotal} EGP for free shipping
                                    </span>
                                </div>
                                <div className="h-2 bg-orange-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-linear-to-r from-orange-400 to-amber-400 rounded-full transition-all duration-150"
                                    style={{width:`${subTotal /500 * 100}%`}}></div>
                                </div>
                            </div>
                        )
                    }
                    {shipping ===0 && (
                        <div className="bg-linear-to-r from-green-50 to-emerald-50 p-4 rounded-xl flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                                <FontAwesomeIcon icon={faTruck} className="text-green-500"/>
                            </div>
                            <div>
                                <p className="font-semibold text-green-600">Free Shipping!</p>
                                <p className="text-sm text-green-600">
                                    You qualify for free delivery
                                </p>
                            </div>
                        </div>
                    )
                    }

                    <div className="space-y-3">
                        <div className="flex justify-between text-gray-600">
                            <span>Subtotal</span>
                            <span className="font-medium text-gray-900 "> {subTotal} EGP</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                            <span>Shipping</span>
                            { shipping ===0 ? (
                                <span className="font-medium text-green-500">Free</span>
                            ): (
                                <span className="font-medium text-gray-900">100</span> 
                            )}
                        </div>
                        
                        <div className="border-t border-dashed border-gray-200 pt-3 mt-3">
                            <div className="flex justify-between items-baseline">
                                <span className="text-gray-900 font-semibold">Total</span>
                                <div className="text-right">
                                    <span className="text-2xl font-bold text-gray-900">
                                        {total}
                                    </span>
                                    <span className="text-gray-500 ml-1 text-sm">EGP</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <button
                    className="w-full flex items-center justify-center gap-2 py-3 border border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-green-400 hover:text-green-500 hover:bg-green-50/50 transition-all duration-150">
                        <FontAwesomeIcon icon={faTag}/>
                        <span className="text-sm font-medium">Apply Promo Code</span>
                    </button>
                    
                    <Link
                    href={'/checkout'}
                    className="bg-linear-to-r from-green-600 to-green-700 py-4 px-6 text-white rounded-xl font-semibold hover:from-green-600  hover:to-green-700 transition-all duration-150 flex items-center justify-center gap-3 shadow-lg shadow-green-600/20 active:scale-[0.98]">
                        <FontAwesomeIcon icon={faLock}/>
                        <span>Secure Checkout</span>
                    </Link>
                    
                    <div className="py-2 flex items-center justify-center gap-4">
                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                            <FontAwesomeIcon icon={faShieldAlt} className="text-green-500"/>
                            <span>Secure Payment</span>
                        </div>
                        <div className="w-px h-4 bg-gray-200"></div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                            <FontAwesomeIcon icon={faTruck} className="text-blue-500"/>
                            <span>Fast Delivery</span>
                        </div>
                    </div>
                    
                    <Link
                    href={'/'}
                    className="block py-2 text-center text-green-500 hover:text-green-600 text-sm font-medium">
                        <span><FontAwesomeIcon icon={faArrowLeftLong} /></span>
                        Continue shopping
                    </Link>
                </div>
            </div>
        </>
    )
}
