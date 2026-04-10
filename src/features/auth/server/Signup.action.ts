"use server"
import { email, success } from "zod";
import { SignUpFormValues, signupSchema } from "../schema/signup.schema";
import axios, {AxiosError, AxiosRequestConfig} from 'axios'

export default async function signupAction(values:SignUpFormValues){
    const validationResult = signupSchema.safeParse(values);
    if(!validationResult.success){
        const errors: Record<string , string> ={}
        if(validationResult.error){
            validationResult.error.issues.forEach((issue)=>{
                const field = issue.path[0] as string
                const message = issue.message

                if(!errors[field]){
                    errors[field] = message
                }
            })
        }

        return {
            success: false,
            message: "Validation errors",
            errors
        }
    }
    
    const {terms , ...requestBody} = values
    try {
        const options:AxiosRequestConfig = {
            url: 'https://ecommerce.routemisr.com/api/v1/auth/signup',
            method: 'POST',
            data: requestBody   
        }
        const {data} = await axios.request(options);
        if(data.message === 'success'){
            // console.log(data);
            
            return {
                success: true,
                message: 'Account created successfully',
                data
            }
        }
        return {
            success:false,
            message: data.message || 'Signup Failed'
        }
    } catch (error) {
        if(error instanceof AxiosError){
            const errorMessage = error.response?.data.message
            if(errorMessage ==="Account Already Exists"){
                return{
                    success:false,
                    message:"Account exists",
                    errors:{
                        email:"An account with this email already exists"
                    }
                } 
            }

            return{
                success: false,
                message:"Something went wrong, please try again later"
            }
        }
    }
}


