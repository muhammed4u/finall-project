"use client"
import { faBox, faCalendarDays, faChevronDown, faCircleCheck, faClock, faCreditCard, faHashtag, faMapMarkedAlt, faMoneyBill, faPhone, faReceipt, faTruck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Order } from "../Types/orders.types";
import { useState } from "react";

export default function OrderCard({orderInfo}: {orderInfo:Order}) {

    function getStatus(){
        if(orderInfo.isDelivered){
            return {
                label: "Delivered",
                icon: faCircleCheck,
                colors: {
                    background: "bg-green-100",
                    text: "text-green-600",
                    border: "border-green-300"
                }
            }
        }

        if(orderInfo.isPaid){
            return {
                label: "On the way",
                icon: faTruck,
                colors: {
                    background: "bg-blue-100",
                    text: "text-blue-600",
                    border: "border-blue-300"
                }
            }
        }

        return {
                label: "Processing",
                icon: faClock,
                colors: {
                    background: "bg-orange-100",
                    text: "text-orange-600",
                    border: "border-orange-300"
                }
            }
    }

    const status = getStatus()
    const totalItems = orderInfo.cartItems.reduce((acc, el)=>acc += el.count, 0)
    const [showDetails, setShowDetails] = useState(false)

    return (
        <>
            <div className="bg-white overflow-hidden rounded-2xl border border-gray-100 transition-all duration-300 shadow-sm hover:shadow-md hover:border-gray-200">
                {/* Main Content */}
                <div className="p-5 sm:p-6">
                    <div className="flex gap-5">
                        <div className="relative shrink-0">
                            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-linear-to-br from-gray-50 to-white border border-gray-100 p-2.5 overflow-hidden">
                                { orderInfo.cartItems[0] && (
                                    <img src={orderInfo.cartItems[0].product.imageCover} alt={orderInfo.cartItems[0].product.title} 
                                    className="w-full h-full object-contain"/>
                                )}
                            </div>
                            {/* Multi-item indicator */}
                            {orderInfo.cartItems.length > 1 && (
                                <div className="absolute -top-2 -right-2 w-7 h-7 bg-gray-900 text-white text-sm font-bold rounded-full flex items-center justify-center shadow-lg">
                                    +{orderInfo.cartItems.length -1}
                                </div>
                            )}
                        </div>
                        {/* Order Info */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-3 mb-3">
                                <div>
                                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1  ${status.colors.background} ${status.colors.border} rounded-lg mb-2`}>
                                        <FontAwesomeIcon icon={status.icon} className={`text-xs ${status.colors.text}`}/>
                                        <span className={`font-semibold text-xs ${status.colors.text}`}>{status.label}</span>
                                    </div>
                                    <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                                        <FontAwesomeIcon icon={faHashtag} className={`text-xs text-gray-400`}/>
                                        {orderInfo.id}
                                    </h3>
                                </div>
                                {/* Payment Method */}
                                <div 
                                className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${
                                    orderInfo.paymentMethodType === 'cash' ? "bg-purple-100" : "bg-gray-100"
                                }`}>
                                    <FontAwesomeIcon icon={orderInfo.paymentMethodType === 'cash'? faCreditCard : faMoneyBill} className={orderInfo.paymentMethodType === 'cash' ? "text-purple-600" : "text-gray-600"}/>
                                </div>
                            </div>
                            {/* Date & Items */}
                            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-4">
                                <span className="flex items-center gap-1.5">
                                    <FontAwesomeIcon icon={faCalendarDays} className="text-xs text-gray-400"/>
                                    {new Date(orderInfo.createdAt).toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'})}
                                </span>
                                <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                <span className="flex items-center gap-1.5">
                                    <FontAwesomeIcon icon={faBox} className="text-xs text-gray-400"/>
                                    {totalItems} {totalItems === 1 ? "item" : "items"}
                                </span>
                                <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                <span className="flex items-center gap-1.5">
                                    <FontAwesomeIcon icon={faMapMarkedAlt} className="text-xs text-gray-400"/>
                                    {orderInfo.shippingAddress?.city}
                                </span>
                            </div>
                            {/* Price and action row */}
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <span className="text-2xl font-bold text-gray-900">
                                        {orderInfo.totalOrderPrice}
                                    </span>
                                    <span className="text-sm font-medium text-gray-400 ml-1">
                                        EGP
                                    </span>
                                </div>
                                <button
                                onClick={()=>{
                                    setShowDetails(!showDetails)
                                }}
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all  duration-200 ${showDetails ? "bg-green-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
                                    {showDetails ? "Hide Details" : "View Details"}
                                    <FontAwesomeIcon icon={faChevronDown} className={`text-xs transition-transform duration-300 ${showDetails ? "rotate-180" : ""}`}/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Details */}
                {showDetails && (
                    <div className="border-t border-gray-100 bg-gray-50/50">
                    {/* Product List */}
                    <div className="p-5 sm:p-6">
                        <h4 className="font-semibold text-gray-900 text-sm flex items-center gap-2 mb-4">
                            <div className="w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center">
                                <FontAwesomeIcon icon={faReceipt} className="text-xs text-green-600"/>
                            </div>
                            Order Items
                        </h4>
                        <div className="space-y-3">
                            {orderInfo.cartItems.map((item) => (
                                <div key={item._id} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100">
                                    <div className="w-16 h-16 rounded-xl bg-gray-50 p-2 shrink-0">
                                        <img src={item.product.imageCover} alt={item.product.title} 
                                        className="w-full h-full object-contain"/>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-gray-900 truncate">{item.product.title}</p>
                                        <p className="text-sm text-gray-500 ml-1">
                                            <span className="font-medium text-gray-700">{item.count}x</span>
                                        </p>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <p className="text-lg font-bold text-gray-900">{item.price.toLocaleString()} EGP</p>
                                        <p className="text-xs text-gray-400">EGP</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Shipping & Summary */}
                    <div className="px-5 sm:px-6 pb-5 sm:pb-6 grid sm:grid-cols-2 gap-4">
                        <div className="p-4 bg-white rounded-xl border border-gray-100">
                            <h4 className="font-semibold text-gray-900 text-sm flex items-center gap-2 mb-3">
                                <div className="h-6 w-6 rounded-lg bg-blue-100 flex items-center justify-center">
                                    <FontAwesomeIcon icon={faMapMarkedAlt} className="text-xs text-blue-600"/>
                                </div>
                                Delivery Address
                            </h4>
                            <div className="space-y-2">
                                <p className="font-medium text-gray-900">{orderInfo.shippingAddress?.city}</p>
                                <p className="font-sm text-gray-600 leading-relaxed">{orderInfo.shippingAddress?.details}</p>
                                <p className="font-sm text-gray-600 pt-1 flex items-center gap-2">
                                    <FontAwesomeIcon icon={faPhone} className="text-xs text-gray-400"/>
                                    {orderInfo.shippingAddress?.phone}
                                </p>
                            </div>
                        </div>
                        {/* Order Summary */}
                        <div className={`p-4 rounded-xl bg-blue-100 border border-blue-200`}>
                            <h4 className="font-semibold text-gray-900 text-sm flex items-center gap-2 mb-3">
                                <div className="h-6 w-6 rounded-lg bg-blue-500 flex items-center justify-center">
                                    <FontAwesomeIcon icon={faTruck} className="text-xs text-white"/>
                                </div>
                                Order Summary
                            </h4>
                            <div className="space-y-2 text-sm">
                                <div className="text-gray-600 flex justify-between">
                                    <span>{orderInfo.totalOrderPrice} EGP</span>
                                    <span className="font-medium">Price</span>
                                </div>
                                <div className="text-gray-600 flex justify-between">
                                    <span>{orderInfo.shippingPrice === 0 ? "Free" : orderInfo.shippingPrice + " EGP"}</span>
                                    <span className="font-medium">Shipping Price</span>
                                </div>
                                <hr className="border-gray-200/50 my-2"/>
                                <div className="flex justify-between pt-1">
                                    <span className="font-semibold text-gray-900">{orderInfo.totalOrderPrice + orderInfo.shippingPrice} EGP</span>
                                    <span className="font-bold text-lg text-gray-900 ">Total Price</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                )}
            </div>
        </>
    )
}
