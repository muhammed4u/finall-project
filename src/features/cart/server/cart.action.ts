"use server"

import axios, { AxiosRequestConfig } from "axios"
import { cookies } from "next/headers"
import { CartResponse } from "../types/GetLoggedUserCart.types"

export async function addProductToCart({productId}: {productId:string}){
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value || null

    if(!token){
        throw new Error("Authentication Error")
    }

    try {
        const options:AxiosRequestConfig= {
        url: `https://ecommerce.routemisr.com/api/v1/cart`,
        method: 'POST',
        headers: {token},
        data: {productId} 
    }
    const {data} = await axios.request(options)
    return data
    } catch (error) {
        throw error
    }
}

export async function getLoggedUserCart():Promise<CartResponse>{
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value || null

    if(!token){
        throw new Error("Authentication Error")
    }

    try {
        const options:AxiosRequestConfig= {
        url: `https://ecommerce.routemisr.com/api/v1/cart`,
        method: 'GET',
        headers: {token},
    }
    const {data} = await axios.request(options)
    console.log(data);
    return data
    
    } catch (error) {
        throw error
    }
}

export async function removeProductFromCart({productId} : {productId: string} ):Promise<CartResponse>{
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value || null

    if(!token){
        throw new Error("Authentication Error")
    }

    try {
        const options:AxiosRequestConfig= {
        url: `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        method: 'DELETE',
        headers: {token},
    }
    const {data} = await axios.request(options)
    return data
    
    } catch (error) {
        throw error
    }
}

export async function updateProductQuantity(productId: string , count: number ):Promise<CartResponse>{
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value || null

    if(!token){
        throw new Error("Authentication Error")
    }

    try {
        const options:AxiosRequestConfig= {
        url: `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        method: 'PUT',
        headers: {token},
        data: {count}
    }
    const {data} = await axios.request(options)
    return data
    
    } catch (error) {
        throw error
    }
}

export async function clearAllProductsFromCart(){
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value || null

    if(!token){
        throw new Error("Authentication Error")
    }

    try {
        const options:AxiosRequestConfig= {
        url: `https://ecommerce.routemisr.com/api/v1/cart`,
        method: 'DELETE',
        headers: {token},
    }
    const {data} = await axios.request(options)
    return data
    
    } catch (error) {
        throw error
    }
}
