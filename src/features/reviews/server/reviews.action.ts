"use server"
import { CreateReviewResponse, GetReviewsResponse, ReviewResponse, SingleReviewResponse } from "@/features/Profile/types/reviews.type";
import axios, { AxiosRequestConfig } from "axios"
import { cookies } from "next/headers"

type CreateReviewParams = {
    id: string;
    values: ReviewResponse
}

type editReviewParams ={
    reviewId: string;
    values: ReviewResponse
}

export async function createReview({id , values}:CreateReviewParams):Promise<CreateReviewResponse> {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value || null

    if(!token){
        throw new Error("Authentication Error")
    }

    try {
        const options:AxiosRequestConfig= {
        url: `https://ecommerce.routemisr.com/api/v1/products/${id}/reviews`,
        method: 'POST',
        headers: {token , "Content-Type": "application/json"},
        data: values
    }
    const {data} = await axios.request(options)
    return data
    
    } catch (error) {
        throw error
    }
}

export async function getReviews({id}: {id: string}):Promise<GetReviewsResponse> {

    try {
        const options:AxiosRequestConfig= {
        url: `https://ecommerce.routemisr.com/api/v1/products/${id}/reviews`,
        method: 'GET',
    }
    const {data} = await axios.request(options)
    return data
    
    } catch (error) {
        throw error
    }
}

export async function editReview({reviewId , values}:editReviewParams):Promise<SingleReviewResponse> {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value || null

    if(!token){
        throw new Error("Authentication Error")
    }

    try {
        const options:AxiosRequestConfig= {
        url: `https://ecommerce.routemisr.com/api/v1/reviews/${reviewId}`,
        method: 'PUT',
        headers: {token , "Content-Type": "application/json"},
        data: values
    }
    const {data} = await axios.request(options)
    return data
    
    } catch (error) {
        throw error
    }
}

export async function deleteReviews({id}: {id: string}) {

    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value || null

    if(!token){
        throw new Error("Authentication Error")
    }

    try {
        const options:AxiosRequestConfig= {
        url: `https://ecommerce.routemisr.com/api/v1/reviews/${id}`,
        method: 'DELETE',
        headers: {token}
    }
    const {data} = await axios.request(options)
    return data
    
    } catch (error) {
        throw error
    }
}

