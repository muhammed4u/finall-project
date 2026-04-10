"use server"

import axios, { AxiosRequestConfig } from "axios"
import { Brand, BrandsResponse } from "../Types/brands.types"

export async function getAllBrands():Promise<BrandsResponse>{
    try {
        const options:AxiosRequestConfig ={
            url: 'https://ecommerce.routemisr.com/api/v1/brands',
            method: 'GET'
        }
        const {data} = await axios.request(options)
        return data
    } catch (error) {
        throw error
    }
} 
export async function getBrandById({id}:{id:string}):Promise<Brand>{
    try {
        const options:AxiosRequestConfig ={
            url: `https://ecommerce.routemisr.com/api/v1/brands/${id}`,
            method: 'GET'
        }
        const {data} = await axios.request(options)
        return data
    } catch (error) {
        throw error
    }
} 

