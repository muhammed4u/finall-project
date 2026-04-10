"use server"

import axios, { AxiosRequestConfig } from "axios"
import { cookies } from "next/headers"
import { shippingAddressValues } from "../Schema/Checkout.schema"


export async function createOrderCash({cartId,shippingAddress}:{cartId:string, shippingAddress: shippingAddressValues }){
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value || null

    if(!token){
        throw new Error("Authentication Error")
    }

    try {
        const options:AxiosRequestConfig= {
        url: `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        method: 'POST',
        headers: {token},
        data: {
            shippingAddress: shippingAddress
        }
    }
    const {data} = await axios.request(options)
    return data
    
    } catch (error) {
        throw error
    }
}
export async function createOnlineOrder({cartId,shippingAddress, url}:{cartId:string, url:string, shippingAddress: shippingAddressValues }){
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value || null

    if(!token){
        throw new Error("Authentication Error")
    }

    try {
        const options:AxiosRequestConfig= {
        url: `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
        method: 'POST',
        headers: {token},
        data: {
        shippingAddress: shippingAddress
        }
    }
    const {data} = await axios.request(options)
    return data
    
    } catch (error) {
        throw error
    }
}
