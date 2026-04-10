"use client";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faEye, faLock, faSpinner, faStar, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { loginFormValues, loginSchema } from "../../schema/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import loginAction from "../../server/Login.action";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useState } from "react";
import { setToken } from "../../server/Token.action";
import { setAuthInfo } from "../../store/auth.slice";
import { useDispatch } from "react-redux";
import { signIn } from "next-auth/react";

export default function LoginForm() {
    const dispatch = useDispatch()
    const [show, setShow] = useState(false);
    const router = useRouter()
    const {register, handleSubmit, formState:{errors , isSubmitting}, setError} = useForm<loginFormValues>({
        defaultValues: {
            email: '',
            password: '',
            rememberMe: false
        },

        resolver: zodResolver(loginSchema),

        mode: 'onSubmit',
        reValidateMode:'onChange'
    })
    const onSubmit:SubmitHandler<loginFormValues> = async (values)=>{
        try {
            const response = await loginAction(values)
            console.log(response);
            

            if(response.success){
                await setToken(response.data.token , values.rememberMe)
                dispatch(setAuthInfo({isAuthenticated:true , userInfo: response.data.user}))
                toast.success(response?.message)
                setTimeout(()=>{
                    router.push('/')
                },3000)
            } else {
                if(response?.errors){
                    Object.keys(response.errors).forEach((key)=>{
                        setError(key as keyof loginFormValues, {message: response.errors[key]})
                    })
                }
            }
            
        } catch (error) {
            
        }
    }
    return (
        <>
            <div className="w-full">
                <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">

                    <div className="text-center b-8 ">
                        <div className="flex items-center justify-center mb-2">
                            <span className="text-3xl font-bold text-green-500">
                                Fresh <span className="text-gray-800">Cart</span>
                            </span>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back!</h1>
                        <p className="mb-3">Sign in to continue your fresh shopping experience</p>
                    </div>

                    <div className="space-y-3 mb-6">
                        <button
                        type="button"
                        onClick={() => signIn("google", { callbackUrl: "/" })}
                        className="w-full flex items-center justify-center gap-3 py-3 px-4 border-2 border-gray-200"
                        >
                            <FontAwesomeIcon icon={faGoogle} className="text-red-500 text-lg"/>
                            <span className="font-medium text-gray-700">Continue with Google</span>
                        </button>
                        <button
                        type="button"
                        onClick={() => signIn("facebook", { callbackUrl: "/" })}
                        className="w-full flex items-center justify-center gap-3 py-3 px-4 border-2 border-gray-200"
                        >
                            <FontAwesomeIcon icon={faFacebook} className="text-blue-600 text-lg"/>
                            <span className="font-medium text-gray-700">Continue with Facebook</span>
                        </button>
                    </div>

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white text-gray-500 font-medium">
                                OR CONTINUE WITH EMAIL
                            </span>
                        </div>
                    </div>

                    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label 
                                htmlFor="email"
                                className="block text-sm font-semibold text-gray-700 mb-2"
                            >
                                Email Address
                            </label>
                            <div className="relative">
                                <input type="email" 
                                    className="w-full px-4 py-3 pl-12 form-control" 
                                    placeholder="Enter your email"
                                    id="email"
                                    {...register('email')}/>
                                    <FontAwesomeIcon icon={faEnvelope}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"/>
                            </div>
                            {errors.email && <p className="text-red-500 mt-1">*{errors.email.message}</p>}
                        </div>
                        <div>
                            <div className="flex items-center justify-between mb-2">
                            <label 
                                htmlFor="password"
                                className="block text-sm font-semibold text-gray-700 mb-2"
                            >
                                Password
                            </label>
                            <Link href={"/forget-password"} 
                            className="text-sm text-green-500 hover:text-green-700 cursor-pointer ">
                                Forgot Password?
                            </Link>
                            </div>
                            <div className="relative">
                                <input type={show? "text" : "password"} 
                                className="w-full px-4 py-3 pl-12 form-control" 
                                placeholder="Enter your password"
                                id="password"
                                {...register('password')}/>
                                <FontAwesomeIcon icon={faLock}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"/>
                                <button
                                type="button"
                                onClick={()=> setShow(!show)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-500">
                                    <FontAwesomeIcon icon={faEye}/>
                                </button>
                            </div>
                            {errors.password && <p className="text-red-500 mt-1">*{errors.password.message}</p>}
                        </div>
                        <div className="flex  items-center justify-between">
                            <label className="flex items-center">
                                <input type="checkbox" 
                                className="h-4 w-4 text-green-500 border-2 border-gray-300 accent-green-600"
                                {...register('rememberMe')}/>
                                <span className="ml-3 text-sm text-gray-700">
                                    Keep me signed in
                                </span>
                            </label>
                        </div>
                        <button type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-green-500 text-white py-3 px-4 rounded-xl hover:bg-green-600 transition-colors duration-200 shadow-lg hover:shadow-xl disabled:cursor-not-allowed">
                            {isSubmitting? 
                            <><FontAwesomeIcon icon={faSpinner} spin className="me-2"/> <span>Signing In...</span></>:
                            <>Sign In</>}
                        </button>
                    </form>

                    <div className="text-center  pt-6 border-t border-gray-100">
                        <p className="text-gray-600">
                            New to FreshCart?
                            <Link href="/signup" className="text-green-500 hover:text-green-600 ms-2 font-semibold cursor-pointer underline">
                                Create an account
                            </Link>
                        </p>
                    </div>

                    <div className="flex items-center justify-center space-x-6 mt-6 text-xs text-gray-500">
                        <div className="flex items-center">
                            <FontAwesomeIcon icon={faLock} className="mr-1"/>
                            SSL Secured
                        </div>
                        <div className="flex items-center">
                            <FontAwesomeIcon icon={faUsers} className="mr-1"/>
                            SSL Secured
                        </div>
                        <div className="flex items-center">
                            <FontAwesomeIcon icon={faStar} className="mr-1"/>
                            SSL Secured
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


