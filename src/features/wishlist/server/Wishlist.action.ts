"use server"
import axios, { AxiosRequestConfig } from "axios"
import { cookies } from "next/headers"
import { WishlistResponse } from "../Types/Wishlist.type"
import { ProductsResponse } from "../Types/getLoggedUserWishlist.type"

export async function addProductToWishlist({productId}: {productId:string}):Promise<WishlistResponse>{
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value || null

    if(!token){
        throw new Error("Authentication Error: Please sign in with an email and password to use this feature. Social login is not supported by the store API.")
    }

    try {
        const options:AxiosRequestConfig= {
        url: `https://ecommerce.routemisr.com/api/v1/wishlist`,
        method: 'POST',
        headers: {token},
        data: {productId} 
    }
    const {data} = await axios.request(options)
    return data
    } catch (error: any) {
        console.error("Add to wishlist error:", error?.response?.data || error);
        throw new Error(error?.response?.data?.message || "Failed to add product to wishlist");
    }
}

export async function getLoggedUserWishlist():Promise<ProductsResponse>{
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value || null

    if(!token){
        throw new Error("Authentication Error: Please sign in with an email and password to use this feature. Social login is not supported by the store API.")
    }

    try {
        const options:AxiosRequestConfig= {
        url: `https://ecommerce.routemisr.com/api/v1/wishlist`,
        method: 'GET',
        headers: {token},
    }
    const {data} = await axios.request(options)
    
    return data
    
    } catch (error: any) {
        console.error("Get wishlist error:", error?.response?.data || error);
        throw new Error(error?.response?.data?.message || "Failed to fetch wishlist");
    }
}

export async function removeProductFromWishlist({productId} : {productId: string} ){
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value || null

    if(!token){
        throw new Error("Authentication Error: Please sign in with an email and password to use this feature. Social login is not supported by the store API.")
    }

    try {
        const options:AxiosRequestConfig= {
        url: `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        method: 'DELETE',
        headers: {token},
    }
    const {data} = await axios.request(options)
    return data
    
    } catch (error: any) {
        console.error("Remove from wishlist error:", error?.response?.data || error);
        throw new Error(error?.response?.data?.message || "Failed to remove product from wishlist");
    }
}

