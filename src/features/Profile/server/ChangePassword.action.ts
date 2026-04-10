"use server"

import axios, { AxiosRequestConfig } from "axios"
import { cookies } from "next/headers"
import { changePassword, LoginResponse } from "../types/ChangePassword.type"

export async function ChangePasswordData({values}:{values:changePassword}):Promise<LoginResponse> {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value || null

    if(!token){
        throw new Error("Authentication Error")
    }

    try {
        const options:AxiosRequestConfig= {
        url: `https://ecommerce.routemisr.com/api/v1/users/changeMyPassword`,
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