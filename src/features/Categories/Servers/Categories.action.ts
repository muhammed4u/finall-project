"use server";

import axios, { AxiosRequestConfig } from "axios";
import { CategoriesResponse } from "../Types/Categories.types";
import { CategoryResponse } from "../Types/categoriesDetails.type";

export async function getAllCategories():Promise<CategoriesResponse>{
    try {
        const options:AxiosRequestConfig ={
            url: 'https://ecommerce.routemisr.com/api/v1/categories',
            method: 'GET'
        }
        const {data} = await axios.request(options)
        return data
    } catch (error) {
        throw error
    }
} 

export async function getCategoryDetails({id}:{id:string}):Promise<CategoryResponse>{
    try {
        const options:AxiosRequestConfig = {
            url: `https://ecommerce.routemisr.com/api/v1/categories/${id}`,
            method: 'GET'
        }
        const {data} = await axios.request(options);
        return data;
    } catch (error) {
        throw error
    }
}

