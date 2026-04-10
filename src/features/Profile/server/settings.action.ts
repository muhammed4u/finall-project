"use server"

import axios, { AxiosRequestConfig } from "axios"
import { cookies } from "next/headers"
import { UpdateUserResponse, UserResponse, UserUpdate } from "../types/updateUserData.type"

export async function UpdateLoggedUserData({values}:{values:UserUpdate}):Promise<UpdateUserResponse> {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value || null

    if(!token){
        throw new Error("Authentication Error")
    }

    try {
        const options:AxiosRequestConfig= {
        url: `https://ecommerce.routemisr.com/api/v1/users/updateMe/`,
        method: 'PUT',
        headers: {token},
        data: values
    }
    const {data} = await axios.request(options)
    return data
    
    } catch (error) {
        throw error
    }
}