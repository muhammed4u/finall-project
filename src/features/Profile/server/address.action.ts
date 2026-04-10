"use server"

import axios, { AxiosRequestConfig } from "axios"
import { cookies } from "next/headers"
import { AddAddressResponse, AddressFormData, getAddressDetailsResponse, GetAddressesResponse } from "../types/address.type"

export async function addAddress({values}: {values:AddressFormData}):Promise<AddAddressResponse> {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value || null

    if(!token){
        throw new Error("Authentication Error")
    }

    try {
        const options:AxiosRequestConfig= {
        url: `https://ecommerce.routemisr.com/api/v1/addresses`,
        method: 'POST',
        headers: {token},
        data: values
    }
    const {data} = await axios.request(options)
    return data
    
    } catch (error) {
        throw error
    }
}
export async function getAllUserAddresses():Promise<GetAddressesResponse> {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value || null

    if(!token){
        throw new Error("Authentication Error")
    }

    try {
        const options:AxiosRequestConfig= {
        url: `https://ecommerce.routemisr.com/api/v1/addresses`,
        method: 'GET',
        headers: {token},
    }
    const {data} = await axios.request(options)
    return data
    
    } catch (error) {
        throw error
    }
}
export async function deleteAddress({id}: {id: string}):Promise<GetAddressesResponse> {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value || null

    if(!token){
        throw new Error("Authentication Error")
    }

    try {
        const options:AxiosRequestConfig= {
        url: `https://ecommerce.routemisr.com/api/v1/addresses/${id}`,
        method: 'DELETE',
        headers: {token},
    }
    const {data} = await axios.request(options)
    return data
    
    } catch (error) {
        throw error
    }
}
export async function getAddressDetails({id}: {id: string}):Promise<getAddressDetailsResponse> {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value || null

    if(!token){
        throw new Error("Authentication Error")
    }

    try {
        const options:AxiosRequestConfig= {
        url: `https://ecommerce.routemisr.com/api/v1/addresses/${id}`,
        method: 'GET',
        headers: {token},
    }
    const {data} = await axios.request(options)
    return data
    
    } catch (error) {
        throw error
    }
}



//___________ Add Address Response _____________
// {
//     "status": "success",
//     "message": "Address added successfully",
//     "data": [
//         {
//             "_id": "699b99181db495796d01f498",
//             "name": "",
//             "details": "",
//             "phone": "",
//             "city": ""
//         },
//         {
//             "_id": "699b99241db495796d01f4ac",
//             "name": "",
//             "details": "",
//             "phone": "",
//             "city": ""
//         },
//     ]
// }