"use server"

import axios, { AxiosRequestConfig } from "axios"
import { Brand, BrandsResponse } from "../Types/brands.types"

export async function getAllBrands():Promise<BrandsResponse>{
    try {
        const options:AxiosRequestConfig ={
            url: 'https://ecommerce.routemisr.com/api/v1/brands',
            method: 'GET',
            timeout: 5000
        }
        const {data} = await axios.request(options)
        return data
    } catch (error) {
        return { results: 0, metadata: { currentPage: 1, numberOfPages: 1, limit: 10 }, data: [] };
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

