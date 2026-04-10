"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faEye, faSpinner, faUserPlus } from "@fortawesome/free-solid-svg-icons";
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
        <div className="form px-6 py-12 space-y-7 rounded-xl shadow-xl">
            <div className="title text-center">
            <h2 className="text-3xl font-semibold">Create your account</h2>
            <p className="mt-1">Start your journey with us today</p>
            </div>

            <div className="flex gap-2 *:flex *:items-center *:justify-center *:w-full *:gap-2 *:hover:bg-gray-100">
            <button type="button" onClick={() => signIn("google", { callbackUrl: "/" })} className="btn bg-transparent border border-gray-400/40 py-2">
                <FontAwesomeIcon icon={faGoogle} className="text-red-500" />
                <span>Google</span>
            </button>
            <button type="button" onClick={() => signIn("facebook", { callbackUrl: "/" })} className="btn bg-transparent border border-gray-400/40 py-2">
                <FontAwesomeIcon icon={faFacebook} className="text-blue-500" />
                <span>Facebook</span>
            </button>
            </div>

            <div className="relative w-full h-0.5 bg-gray-300/30">
            <span className="absolute bg-white px-4 left-1/2 top-1/2 -translate-1/2">
                or
            </span>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <div className="name flex flex-col gap-1">
                <label htmlFor="name">Name*</label>
                <input
                className="form-control"
                type="text"
                placeholder="muhammed"
                {...register('name')}
                />
                {errors.name && <p className="text-red-500 mt-0.5">*{errors.name.message}</p>}
            </div>
            <div className="email flex flex-col gap-1">
                <label htmlFor="email">Email*</label>
                <input
                className="form-control"
                type="email"
                placeholder="muhammed@gamil.com"
                {...register('email')}
                />
                {errors.email && <p className="text-red-500 mt-0.5">*{errors.email.message}</p>}
            </div>
            <div className="password flex flex-col gap-1 relative">
                <label htmlFor="password">Password*</label>
                <input
                className="form-control"
                type={show? "text" : "password"} 
                id="password"
                placeholder="Create a strong password"
                {...register('password')}
                />
                <button
                type="button"
                onClick={()=> setShow(!show)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-500">
                    <FontAwesomeIcon icon={faEye}/>
                </button>
                {errors.password && <p className="text-red-500 mt-0.5">*{errors.password.message}</p>}

                <div className="password-strength flex gap-2 items-center mt-2">
                    <div className="bar rounded-xl overflow-hidden w-full h-1 bg-gray-200">
                    <div
                        className={`h-full transition-all duration-300 ${strength.color}`}
                        style={{ width: strength.width }}
                    />
                    </div>
                    {strength.label && <span className="text-sm capitalize">{strength.label}</span>}
                </div>

            </div>
            <div className="repassword flex flex-col gap-1 relative">
                <label htmlFor="repassword">Re-enter Password*</label>
                <input
                className="form-control"
                type={reShow? "text" : "password"} 
                id="repassword"
                placeholder="Confirm your password"
                {...register('rePassword')}
                />
                <button
                type="button"
                onClick={()=> setReShow(!reShow)}
                className="absolute right-4 top-1/2 text-gray-400 hover:text-gray-500">
                    <FontAwesomeIcon icon={faEye}/>
                </button>
                {errors.rePassword && <p className="text-red-500 mt-0.5">*{errors.rePassword.message}</p>}
            </div>
            <div className="phone flex flex-col gap-1">
                <label htmlFor="phone">Phone*</label>
                <input
                className="form-control"
                type="tel"
                id="phone"
                placeholder="+2 01012444365"
                {...register('phone')}
                />
                {errors.phone && <p className="text-red-500 mt-0.5">*{errors.phone.message}</p>}
            </div>

            <div className="terms flex gap-2 items-center">
                <input
                type="checkbox"
                id="terms"
                className="accent-green-600 size-4"
                {...register('terms')}
                />
                <label htmlFor="terms">
                I agree to the{" "}
                <Link href="/terms" className="text-green-600 underline">
                    Terms Of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy-policy" className="text-green-600 underline">
                    Privacy Policy
                </Link>
                </label>
            </div>
            {errors.terms && <p className="text-red-500 -mt-3.5">*{errors.terms.message}</p>}

            <button
                type="submit"
                disabled={isSubmitting}
                className="submit-btn btn bg-green-600 text-white flex gap-2 justify-center items-center w-full hover:bg-green-700 disabled:cursor-not-allowed"
            >
                {isSubmitting? <>
                <FontAwesomeIcon icon={faSpinner} spin />
                <span>Creating an account</span>
                </>:
                <><FontAwesomeIcon icon={faUserPlus} />
                <span>Create My Account</span></>}
            </button>
            </form>
            <p className="text-center pt-8 border-t border-gray-300/50">
            Already have an account?{" "}
            <Link href="/login" className="text-green-600 underline">
                Sign in
            </Link>
            </p>
        </div>
        </>
    );
}

