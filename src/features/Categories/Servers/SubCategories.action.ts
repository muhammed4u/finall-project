import axios, { AxiosRequestConfig } from "axios";
import { CategoriesResponse } from "../Types/Categories.types";
import { CategoryResponse } from "../Types/categoriesDetails.type";

export async function getSubCategoryDetails({id}:{id:string}):Promise<CategoriesResponse>{
    try {
        const options:AxiosRequestConfig = {
            url: `https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`,
            method: 'GET'
        }
        const {data} = await axios.request(options);
        return data;
    } catch (error) {
        throw error
    }
}
export async function getSubCategoryDetailsById({id}:{id:string}):Promise<CategoryResponse>{
    try {
        const options:AxiosRequestConfig = {
            url: `https://ecommerce.routemisr.com/api/v1/subcategories/${id}`,
            method: 'GET'
        }
        const {data} = await axios.request(options);
        return data;
    } catch (error) {
        throw error
    }
}