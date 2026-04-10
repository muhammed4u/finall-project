"use client"
import { faCheck, faMinus, faPlug, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { CartProduct} from '../types/GetLoggedUserCart.types';
import Swal from 'sweetalert2'
import { removeProductFromCart, updateProductQuantity } from "../server/cart.action";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {  setCartInfo } from "../store/Cart.slice";

export default function CartItem({info}: {info:CartProduct}) {

    const {_id,count,price,product} = info
    const {category, title, imageCover,id , quantity} = product

    const dispatch = useDispatch()

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
                    Remove <span class="font-semibold text-gray-700">${title.slice(0,40)}${title.length > 40? ".": "."}</span> from your cart?
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
                const response = await removeProductFromCart({ productId: id })
                
                dispatch(setCartInfo(response)) 
                toast.success('Item removed successfully')
            } catch (error) {
                toast.error('Something went wrong')
            }
        }

    }

    const handleUpdate = async (newCount: number)=>{
        if(newCount < 1){
            return;
        }

        try {
            const response = await updateProductQuantity(id, newCount)
            dispatch(setCartInfo(response))
            console.log(response);
            
        } catch (error) {
            console.log(error);
            
        }

    }

    return (
        <>
            <div className="relative bg-white rounded-2xl shadow-sm hover:shadow-md border border-gray-100 transition-all duration-200 p-5">
                <div className="py-4 sm:p-5">
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                        
                        <Link
                        href={''}
                        className="relative shrink-0 group">
                            <div className="w-full sm:w-28 h-48 sm:h-28 sm:h-32 rounded-xl bg-linear-to-br from-gray-50 via-white to-gray-100p-3 border border-gray-100 overflow-hidden ">
                                <img src={imageCover} alt={title} 
                                className="w-full h-full object-contain sm:object-contain object-cover transition-transform group-hover:scale-110 duration-300"/>
                            </div>
                            
                            <div className="absolute -bottom-1 -right-1 bg-green-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                                <FontAwesomeIcon icon={faCheck} className="text-[]8px"/>
                                In Stock
                            </div>
                        </Link>
                        
                        <div className="flex-1 min-w-0 flex flex-col">
                            <div className="mb-3">
                                <Link
                                href={''}
                                className="group/title">
                                    <h3 className="font-semibold text-gray-900 group-hover/title:text-green-500 transition-colors duration-200 leading-relaxed text-base sm:text-lg line-clamp-2">
                                        {title}
                                    </h3>
                                </Link>
                                <div className="flex items-center gap-2 mt-2">
                                    <span className="inline-block px-2.5 py-1 bg-linear-to-r from-green-50 to-emerald-50 text-green-600 text-sx font-medium rounded-full">
                                        {category.name}
                                    </span>
                                    <span className="text-xs text-gray-400">.</span>
                                    <span className="text-xs text-gray-500">SKU: {_id.slice(-6).toUpperCase()}</span>
                                </div>
                            </div>
                            
                            <div className="mb-4">
                                <div className="flex items-baseline gap-2">
                                    <span className="text-lg font-bold text-green-500">{price} EGP</span>
                                    <span className="text-xs text-gray-400"> per unit</span>
                                </div>
                            </div>
                            
                            <div className="mt-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div className="flex items-center">
                                    <div className="flex items-center bg-gray-50 p-1 rounded-xl border border-gray-200">
                                        <button
                                        className="h-10 w-10 flex items-center justify-center text-gray-600 transition-all duration-200 hover:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-300 disabled:bg-gray-50"
                                        onClick={()=> handleUpdate(count - 1)}
                                        disabled={count <= 1}
                                        >
                                            <FontAwesomeIcon icon={faMinus} className="text-sm"/>
                                        </button>
                                        <span className="w-12 text-center font-bold text-gray-900">{count}</span>
                                        <button
                                        className="h-10 w-10 flex items-center justify-center text-gray-600 transition-all duration-200 hover:bg-gray-100 hover:text-green-600"
                                        onClick={()=> handleUpdate(count + 1)}
                                        disabled={count >= quantity}>
                                            <FontAwesomeIcon icon={faPlus} className="text-sm"/>
                                        </button>
                                    </div>
                                </div>
                                
                                <div className="flex items-center justify-between sm:justify-start gap-4 w-full sm:w-auto">
                                    <div className="text-right">
                                        <p className="text-xs text-gray-400 mb-0.5">Total</p>
                                        <p className="text-xl font-bold text-gray-900">
                                            {price * count} {" "}
                                            <span className="text-sm font-medium text-gray-400">EGP</span>
                                        </p>
                                    </div>
                                    
                                    <div className="h-10 w-10 rounded-xl border border-red-200 bg-red-50 text-red-500  hover:bg-red-500 hover:text-white hover:border-red-500 flex items-center justify-center transition-all duration-200 cursor-pointer"
                                    onClick={handleRemove}>
                                        <FontAwesomeIcon icon={faTrash} className="text-sm"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
