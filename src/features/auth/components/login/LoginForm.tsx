"use client";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faEye, faLock, faSpinner, faStar, faUsers, faBolt } from "@fortawesome/free-solid-svg-icons";
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
                <div className="bg-white/70 backdrop-blur-3xl rounded-[2.5rem] shadow-2xl p-8 lg:p-12 border border-white/50">

                    <div className="text-center mb-10">
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <div className="size-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white text-xl">
                                <FontAwesomeIcon icon={faBolt} />
                            </div>
                            <span className="text-4xl font-black text-gray-900 tracking-tight">
                                Swift<span className="text-emerald-500">Shop</span>
                            </span>
                        </div>
                        <h1 className="text-3xl font-black text-gray-800 mb-2 tracking-tight">Welcome Back</h1>
                        <p className="text-gray-500 font-medium">Continue your premium shopping journey</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <button
                        type="button"
                        onClick={() => signIn("google", { callbackUrl: "/" })}
                        className="flex items-center justify-center gap-3 py-3.5 px-4 rounded-2xl border border-gray-100 hover:bg-gray-50 transition-all duration-300 group"
                        >
                            <FontAwesomeIcon icon={faGoogle} className="text-red-500 text-lg group-hover:scale-110 transition-transform"/>
                            <span className="font-bold text-gray-700 text-sm">Google</span>
                        </button>
                        <button
                        type="button"
                        onClick={() => signIn("facebook", { callbackUrl: "/" })}
                        className="flex items-center justify-center gap-3 py-3.5 px-4 rounded-2xl border border-gray-100 hover:bg-gray-50 transition-all duration-300 group"
                        >
                            <FontAwesomeIcon icon={faFacebook} className="text-blue-600 text-lg group-hover:scale-110 transition-transform"/>
                            <span className="font-bold text-gray-700 text-sm">Facebook</span>
                        </button>
                    </div>

                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-100"></div>
                        </div>
                        <div className="relative flex justify-center text-[10px]">
                            <span className="px-4 bg-white text-gray-400 font-black tracking-[0.2em] uppercase">
                                OR USE EMAIL
                            </span>
                        </div>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label 
                                htmlFor="email"
                                className="block text-[11px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1"
                            >
                                Email Address
                            </label>
                            <div className="relative group">
                                <input type="email" 
                                    className="w-full px-5 py-4 pl-14 bg-gray-50/50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all duration-300 text-gray-800 font-medium outline-hidden shadow-inner" 
                                    placeholder="name@example.com"
                                    id="email"
                                    {...register('email')}/>
                                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors">
                                        <FontAwesomeIcon icon={faEnvelope} />
                                    </div>
                            </div>
                            {errors.email && <p className="text-rose-500 text-[11px] mt-2 font-bold ml-1 flex items-center gap-1">
                                <span className="size-1 bg-rose-500 rounded-full animate-pulse" />
                                {errors.email.message}
                            </p>}
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label 
                                    htmlFor="password"
                                    className="block text-[11px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1"
                                >
                                    Password
                                </label>
                                <Link href={"/forget-password"} 
                                className="text-[11px] font-black uppercase tracking-widest text-emerald-500 hover:text-emerald-600 transition-colors">
                                    Forgot?
                                </Link>
                            </div>
                            <div className="relative group">
                                <input type={show? "text" : "password"} 
                                className="w-full px-5 py-4 pl-14 bg-gray-50/50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all duration-300 text-gray-800 font-medium outline-hidden shadow-inner" 
                                placeholder="••••••••"
                                id="password"
                                {...register('password')}/>
                                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors">
                                    <FontAwesomeIcon icon={faLock} />
                                </div>
                                <button
                                type="button"
                                onClick={()=> setShow(!show)}
                                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-500 transition-colors">
                                    <FontAwesomeIcon icon={show ? faEye : faEye} className="text-xs opacity-50"/>
                                </button>
                            </div>
                            {errors.password && <p className="text-rose-500 text-[11px] mt-2 font-bold ml-1 flex items-center gap-1">
                                <span className="size-1 bg-rose-500 rounded-full animate-pulse" />
                                {errors.password.message}
                            </p>}
                        </div>

                        <div className="flex items-center">
                            <label className="flex items-center cursor-pointer group">
                                <input type="checkbox" 
                                className="size-5 rounded-lg border-2 border-gray-200 text-emerald-500 focus:ring-emerald-500/20 transition-all cursor-pointer"
                                {...register('rememberMe')}/>
                                <span className="ml-3 text-sm font-bold text-gray-600 group-hover:text-emerald-600 transition-colors">
                                    Keep me signed in
                                </span>
                            </label>
                        </div>

                        <button type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gray-900 text-white py-4 px-4 rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-xs hover:bg-emerald-600 hover:-translate-y-1 active:translate-y-0 transition-all duration-300 shadow-xl shadow-gray-900/10 hover:shadow-emerald-500/30 disabled:opacity-70 disabled:cursor-not-allowed">
                            {isSubmitting? 
                            <><FontAwesomeIcon icon={faSpinner} spin className="mr-2"/> <span>Validating...</span></>:
                            <>Sign In</>}
                        </button>
                    </form>

                    <div className="text-center pt-8 mt-8 border-t border-gray-50">
                        <p className="text-sm font-bold text-gray-400">
                            Don't have an account?
                            <Link href="/signup" className="text-emerald-500 hover:text-emerald-600 ml-2 transition-colors">
                                Create one for free
                            </Link>
                        </p>
                    </div>

                    <div className="flex items-center justify-center gap-8 mt-10 text-[10px] font-black uppercase tracking-widest text-gray-300">
                        <div className="flex items-center gap-1.5 hover:text-emerald-500 transition-colors cursor-default">
                            <FontAwesomeIcon icon={faLock} />
                            <span>SSL Secure</span>
                        </div>
                        <div className="flex items-center gap-1.5 hover:text-emerald-500 transition-colors cursor-default">
                            <FontAwesomeIcon icon={faUsers} />
                            <span>Premium Support</span>
                        </div>
                        <div className="flex items-center gap-1.5 hover:text-emerald-500 transition-colors cursor-default">
                            <FontAwesomeIcon icon={faStar} />
                            <span>Top Rated</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

