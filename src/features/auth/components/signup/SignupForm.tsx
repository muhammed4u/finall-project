"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faEye, faSpinner, faUserPlus, faBolt } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod"
import { SignUpFormValues, signupSchema  } from "../../schema/signup.schema";
import signupAction from "../../server/Signup.action";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function SignupForm() {
    const [show, setShow] = useState(false);
    const [reShow, setReShow] = useState(false);
    const router = useRouter()
    const { register , handleSubmit, formState: {errors, isSubmitting}, setError, watch } = useForm<SignUpFormValues>({
        defaultValues: {
        name: "",
        email: "",
        password: "",
        rePassword: "",
        phone: "",
        terms: false,
        },

        resolver: zodResolver(signupSchema),

        mode: "onSubmit",
        reValidateMode: "onChange"
    });

    const onSubmit:SubmitHandler<SignUpFormValues> = async (values)=>{
        try {
            const response = await signupAction(values)

            if(response?.success){
                toast.success(response.message)
                setTimeout(()=>{
                    router.push("/login")
                }, 2000)
            }
            else{
                if(response?.errors){
                    Object.keys(response.errors).forEach((key)=>{
                        setError(key as keyof SignUpFormValues
                            , {message: response.errors[key]})
                    })
                }
            }
            
        } catch (error) {
            
        }
        
    }
    const password = watch("password", "");

    const getPasswordStrength = (password: string) => {
    if (!password) return { label: "", width: "0%", color: "" };

        let score = 0;
        if (password.length >= 8) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;

        if (score <= 1) return { label: "weak", width: "25%", color: "bg-red-500" };
        if (score === 2) return { label: "medium", width: "50%", color: "bg-yellow-500" };
        if (score === 3) return { label: "good", width: "75%", color: "bg-blue-500" };
        return { label: "strong", width: "100%", color: "bg-green-600" };
    };

    const strength = getPasswordStrength(password);

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
                    <h1 className="text-3xl font-black text-gray-800 mb-2 tracking-tight">Join the Shop</h1>
                    <p className="text-gray-500 font-medium">Start your premium shopping journey today</p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                    <button type="button" onClick={() => signIn("google", { callbackUrl: "/" })} className="flex items-center justify-center gap-3 py-3.5 px-4 rounded-2xl border border-gray-100 hover:bg-gray-50 transition-all duration-300 group">
                        <FontAwesomeIcon icon={faGoogle} className="text-red-500 text-lg group-hover:scale-110 transition-transform" />
                        <span className="font-bold text-gray-700 text-sm">Google</span>
                    </button>
                    <button type="button" onClick={() => signIn("facebook", { callbackUrl: "/" })} className="flex items-center justify-center gap-3 py-3.5 px-4 rounded-2xl border border-gray-100 hover:bg-gray-50 transition-all duration-300 group">
                        <FontAwesomeIcon icon={faFacebook} className="text-blue-600 text-lg group-hover:scale-110 transition-transform" />
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="name" className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1">Name*</label>
                            <input
                                className="w-full px-5 py-4 bg-gray-50/50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all duration-300 text-gray-800 font-medium outline-hidden shadow-inner"
                                type="text"
                                placeholder="John Doe"
                                {...register('name')}
                            />
                            {errors.name && <p className="text-rose-500 text-[10px] mt-1 font-bold ml-1">*{errors.name.message}</p>}
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="phone" className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1">Phone*</label>
                            <input
                                className="w-full px-5 py-4 bg-gray-50/50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all duration-300 text-gray-800 font-medium outline-hidden shadow-inner"
                                type="tel"
                                id="phone"
                                placeholder="+20 123 456 789"
                                {...register('phone')}
                            />
                            {errors.phone && <p className="text-rose-500 text-[10px] mt-1 font-bold ml-1">*{errors.phone.message}</p>}
                        </div>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1">Email Address*</label>
                        <input
                            className="w-full px-5 py-4 bg-gray-50/50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all duration-300 text-gray-800 font-medium outline-hidden shadow-inner"
                            type="email"
                            placeholder="name@example.com"
                            {...register('email')}
                        />
                        {errors.email && <p className="text-rose-500 text-[10px] mt-1 font-bold ml-1">*{errors.email.message}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-1 relative">
                            <label htmlFor="password" className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1">Password*</label>
                            <div className="relative">
                                <input
                                    className="w-full px-5 py-4 bg-gray-50/50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all duration-300 text-gray-800 font-medium outline-hidden shadow-inner"
                                    type={show? "text" : "password"} 
                                    id="password"
                                    placeholder="••••••••"
                                    {...register('password')}
                                />
                                <button
                                    type="button"
                                    onClick={()=> setShow(!show)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-500">
                                    <FontAwesomeIcon icon={faEye} className="text-xs opacity-50"/>
                                </button>
                            </div>
                            {errors.password && <p className="text-rose-500 text-[10px] mt-1 font-bold ml-1">*{errors.password.message}</p>}

                            <div className="password-strength flex gap-2 items-center mt-3 ml-1">
                                <div className="bar rounded-full overflow-hidden w-full h-1 bg-gray-100">
                                    <div
                                        className={`h-full transition-all duration-500 ${strength.color}`}
                                        style={{ width: strength.width }}
                                    />
                                </div>
                                {strength.label && <span className="text-[9px] font-black uppercase tracking-tighter text-gray-400">{strength.label}</span>}
                            </div>
                        </div>

                        <div className="flex flex-col gap-1 relative">
                            <label htmlFor="repassword" className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1">Confirm*</label>
                            <div className="relative">
                                <input
                                    className="w-full px-5 py-4 bg-gray-50/50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all duration-300 text-gray-800 font-medium outline-hidden shadow-inner"
                                    type={reShow? "text" : "password"} 
                                    id="repassword"
                                    placeholder="••••••••"
                                    {...register('rePassword')}
                                />
                                <button
                                    type="button"
                                    onClick={()=> setReShow(!reShow)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-500">
                                    <FontAwesomeIcon icon={faEye} className="text-xs opacity-50"/>
                                </button>
                            </div>
                            {errors.rePassword && <p className="text-rose-500 text-[10px] mt-1 font-bold ml-1">*{errors.rePassword.message}</p>}
                        </div>
                    </div>

                    <div className="flex items-start gap-3 ml-1">
                        <input
                            type="checkbox"
                            id="terms"
                            className="accent-emerald-500 size-5 rounded-lg border-2 border-gray-200 mt-0.5"
                            {...register('terms')}
                        />
                        <label htmlFor="terms" className="text-sm font-bold text-gray-500 leading-snug">
                            I agree to the{" "}
                            <Link href="/terms" className="text-emerald-500 hover:underline">Terms</Link>
                            {" "}and{" "}
                            <Link href="/privacy-policy" className="text-emerald-500 hover:underline">Privacy Policy</Link>
                        </label>
                    </div>
                    {errors.terms && <p className="text-rose-500 text-[10px] font-bold ml-1">*{errors.terms.message}</p>}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gray-900 text-white py-4 px-4 rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-xs hover:bg-emerald-600 hover:-translate-y-1 active:translate-y-0 transition-all duration-300 shadow-xl shadow-gray-900/10 hover:shadow-emerald-500/30 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isSubmitting? 
                        <><FontAwesomeIcon icon={faSpinner} spin className="mr-2"/> <span>Creating...</span></>:
                        <><FontAwesomeIcon icon={faUserPlus} className="mr-2"/> <span>Create My Account</span></>}
                    </button>
                </form>

                <div className="text-center pt-8 mt-8 border-t border-gray-50">
                    <p className="text-sm font-bold text-gray-400">
                        Already have an account?
                        <Link href="/login" className="text-emerald-500 hover:text-emerald-600 ml-2 transition-colors">
                            Sign in here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
        </>
    );
}

