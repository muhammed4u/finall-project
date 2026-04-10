"use server";

import { cookies } from "next/headers";
import { AuthState } from "../store/auth.slice";
import axios, { AxiosRequestConfig } from "axios";

export async function setToken(token:string, rememberMe:boolean):Promise<void>{
    const cookieStore = await cookies()
    if(rememberMe){
        (await cookieStore).set('token' , token, {
            httpOnly: true,
            maxAge: 30*24*60*60
        })
    } else{
        (await cookieStore).set('token' , token, {
            httpOnly: true,
            maxAge: 1*24*60*60
        })
    }

}

export async function getToken():Promise<string|null>{
    const cookieStore = await cookies()
    const token =cookieStore.get('token')?.value || null
    return token
}

export async function clearToken():Promise<void>{
    const cookiestore = await cookies()
    cookiestore.delete('token')
}

export async function verifyToken(): Promise<AuthState>{
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value || null

    if(!token){
        return {
            isAuthenticated:false,
            userInfo: null
        }
    }

    try {
        const options:AxiosRequestConfig ={
            url: 'https://ecommerce.routemisr.com/api/v1/auth/verifyToken',
            method: 'GET',
            headers: {token}
        }
        const {data} = await axios.request(options)
        if(data.message === 'verified'){
            const {id, name , role} = data.decoded
            return {
                isAuthenticated: true,
                userInfo:{
                    id,
                    name,
                    role
                }
            }
        }
        return {
            isAuthenticated:false,
            userInfo: null
        }
    } catch (error) {
        return {
            isAuthenticated:false,
            userInfo: null
        }
    }
}

