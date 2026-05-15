"use server";

import axios, { AxiosRequestConfig } from "axios";
import { CategoriesResponse } from "../Types/Categories.types";
import { CategoryResponse } from "../Types/categoriesDetails.type";

export async function getAllCategories():Promise<CategoriesResponse>{
    try {
        const options:AxiosRequestConfig ={
            url: 'https://ecommerce.routemisr.com/api/v1/categories',
            method: 'GET',
            timeout: 5000
        }
        const {data} = await axios.request(options)
        return data
    } catch (error) {
        return { results: 0, metadata: { currentPage: 1, numberOfPages: 1, limit: 10 }, data: [] };
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

