"use client"
import { useEffect, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faKey, faLock } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgetPasswordSchema } from "../../schema/forgetPassword.Schema";
import ForgetPassword from "../../server/ForgetPassword.action";
import * as z from "zod";
import { useRouter } from "next/navigation";

type FormData = z.infer<typeof forgetPasswordSchema>;

export default function ForgetPasswordForm() {
    const router = useRouter();
    const [animate, setAnimate] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        defaultValues: { email: "" },
        resolver: zodResolver(forgetPasswordSchema)
    });

    useEffect(() => {
        setAnimate(true);
    }, []);

    const onSubmit = async (data: FormData) => {
        setLoading(true);
        setMessage("");
        try {
        await ForgetPassword(data.email);
        setMessage("Reset code sent! Check your email.");
        setTimeout(() => {
            router.push(`/verifyCode?email=${encodeURIComponent(data.email)}`);
        }, 2000);
        } catch (error: any) {
        setMessage(error?.response?.data?.message || "Something went wrong.");
        } finally {
        setLoading(false);
        }
    };

    return (
        <section
        className={`bg-white rounded-r-3xl w-full p-12 shadow-2xl
            flex flex-col justify-center
            transition-opacity duration-700 ease-out
            ${animate ? "opacity-100" : "opacity-0"}`}
        >
        <h1 className="text-4xl font-extrabold mb-3 text-gray-900 tracking-tight">
            <span className="text-green-600">Fresh</span>Cart
        </h1>

        <h2 className="text-xl font-semibold mb-1 text-gray-800">Forgot Password?</h2>
        <p className="text-gray-600 mb-10 leading-relaxed">
            No worries, we'll send you a reset code so you can recover your account quickly.
        </p>

        <div className="flex items-center justify-between mb-12">
            <StepCircle active icon={faEnvelope} />
            <StepLine active />
            <StepCircle icon={faKey} />
            <StepLine />
            <StepCircle icon={faLock} />
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="relative z-0 w-full mb-8 group">
            <input
                type="email"
                {...register("email")}
                id="email"
                placeholder=" "
                className="block py-3 px-4 w-full text-gray-900 bg-transparent border border-gray-300 rounded-md
                appearance-none focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent peer"
            />
            <label
                htmlFor="email"
                className="absolute text-gray-500 text-sm left-4 top-3
                duration-300 transform -translate-y-4 scale-75 origin-left
                peer-placeholder-shown:translate-y-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-400
                peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-green-600"
            >
                Email Address
            </label>
            <FontAwesomeIcon
                icon={faEnvelope}
                className="absolute right-4 top-4 text-gray-400 pointer-events-none"
            />
            {errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
            )}
            </div>

            <button
            type="submit"
            disabled={loading}
            className={`w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 rounded-lg
                shadow-lg transform transition-transform duration-300 ${
                loading ? "opacity-60 cursor-not-allowed" : ""
                }`}
            >
            {loading ? "Sending..." : "Send Reset Code"}
            </button>
        </form>

        {message && <p className="mt-4 text-center text-sm text-gray-700">{message}</p>}

        <div className="mt-8 text-center">
            <Link href="/login" className="inline-flex items-center space-x-2 text-green-600 hover:underline font-medium">
            <svg
                className="w-5 h-5 transform rotate-180"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
            >
                <path d="M9 18l-6-6 6-6" />
                <path d="M15 6v12" />
            </svg>
            <span>Back to Sign In</span>
            </Link>
        </div>

        <p className="mt-2 text-center text-gray-600">
            Remember your password?{" "}
            <Link href="/login" className="text-green-600 font-semibold hover:underline">
            Sign In
            </Link>
        </p>
        </section>
    );
    }

    function StepCircle({ active = false, icon }: { active?: boolean; icon: any }) {
    return (
        <div
        className={`rounded-full p-4 shadow-md flex items-center justify-center
            ${active ? "bg-green-600 text-white shadow-lg" : "bg-gray-200 text-gray-400"}
            transition-colors duration-300`}
        >
        <FontAwesomeIcon icon={icon} className="w-5 h-5" />
        </div>
    );
    }

    function StepLine({ active = false }: { active?: boolean }) {
    return (
        <div
        className={`flex-1 h-1 rounded-full
            ${active ? "bg-green-600" : "bg-gray-200"}
            transition-colors duration-300`}
        ></div>
    );
}