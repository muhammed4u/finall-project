"use server"

import axios, { AxiosRequestConfig } from "axios"
import { ProductsResponse, SingleProductResponse } from "../Types/Products.types";

interface GetProductsFilters {
    category?: string[];
    brand?: string[];
    minPrice?: number;
    maxPrice?: number;
    sort?: string;
}


export async function getProducts(filters?: GetProductsFilters):Promise<ProductsResponse>{
    try {
        const params: Record<string, any> = {};
        if (filters?.category?.length) {
        params["category[in]"] = filters.category.join(",");
        }

        if (filters?.brand?.length) {
        params.brand = filters.brand.join(",");
        }

        if (filters?.minPrice !== undefined) {
        params["price[gte]"] = filters.minPrice;
        }

        if (filters?.maxPrice !== undefined) {
        params["price[lte]"] = filters.maxPrice;
        }
        if (filters?.sort) {
        params.sort = filters.sort;
        }
        const options:AxiosRequestConfig = {
            url: 'https://ecommerce.routemisr.com/api/v1/products',
            method: 'GET',
            params
        }
        const {data} = await axios.request(options);
        return data;
    } catch (error) {
        throw error
    }
}

export async function getProductById({id}:{id:string}):Promise<SingleProductResponse>{
    try {
        const options:AxiosRequestConfig = {
            url: `https://ecommerce.routemisr.com/api/v1/products/${id}`,
            method: 'GET'
        }
        const {data} = await axios.request(options);
        return data;
    } catch (error) {
        throw error
    }
}


