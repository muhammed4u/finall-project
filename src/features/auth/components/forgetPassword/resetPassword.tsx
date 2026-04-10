"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faKey, faLock } from "@fortawesome/free-solid-svg-icons";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { resetPasswordSchema, ResetPasswordValues } from "../../schema/resetPassword.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPassword } from "../../server/ForgetPassword.action";
import { toast } from "react-toastify";

export default function ResetPasswordForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get("email") || "";

    const [animate, setAnimate] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        setAnimate(true);
    }, []);

    const { register, handleSubmit, formState: { errors }, watch } = useForm<ResetPasswordValues>({
        defaultValues: {
            newPassword: "",
            confirmPassword: ""
        },
        resolver: zodResolver(resetPasswordSchema)
    })

    const onSubmit = async (values: ResetPasswordValues) => {
        if (!email) {
            toast.error("Email is missing. Please try again.");
        return;
        }

        setLoading(true);

        try {
        await resetPassword(email, values.newPassword);

        toast.success("Password reset successfully!");

        setTimeout(() => {
            router.push("/login");
        }, 2000);
        } catch (error: any) {
            toast.error('Failed to reset password. Please try again.');
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
        {/* Logo */}
        <h1 className="text-4xl font-extrabold mb-3 text-gray-900 tracking-tight">
            <span className="text-green-600">Fresh</span>Cart
        </h1>

        <h2 className="text-xl font-semibold mb-1 text-gray-800">
            Create New Password
        </h2>
        <p className="text-gray-600 mb-10 leading-relaxed">
            Your new password must be different from previously used passwords.
        </p>

        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-12">
            <StepCircle active icon={faEnvelope} />
            <StepLine active />
            <StepCircle active icon={faKey} />
            <StepLine active />
            <StepCircle active icon={faLock} />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* New Password */}
            <div className="relative z-0 w-full mb-8 group">
            <input
                type="password"
                {...register("newPassword")}
                id="password"
                placeholder=" "
                className="block py-3 px-4 w-full text-gray-900 bg-transparent border border-gray-300 rounded-md
                appearance-none focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent peer"
            />
            <label
                htmlFor="password"
                className="absolute text-gray-500 text-sm left-4 top-3
                duration-300 transform -translate-y-4 scale-75 origin-left
                peer-placeholder-shown:translate-y-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-400
                peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-green-600"
            >
                New Password
            </label>
            <FontAwesomeIcon
                icon={faLock}
                className="absolute right-4 top-4 text-gray-400 pointer-events-none"
            />
                {errors.newPassword && (
                    <p className="text-red-500 text-sm mt-1 ml-4">
                        {errors.newPassword.message}
                    </p>
                )}
            </div>

            {/* Confirm Password */}
            <div className="relative z-0 w-full mb-10 group">
            <input
                type="password"
                {...register("confirmPassword")}
                id="confirmPassword"
                placeholder=" "
                className="block py-3 px-4 w-full text-gray-900 bg-transparent border border-gray-300 rounded-md
                appearance-none focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent peer"
            />
            <label
                htmlFor="confirmPassword"
                className="absolute text-gray-500 text-sm left-4 top-3
                duration-300 transform -translate-y-4 scale-75 origin-left
                peer-placeholder-shown:translate-y-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-400
                peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-green-600"
            >
                Confirm Password
            </label>
            <FontAwesomeIcon
                icon={faLock}
                className="absolute right-4 top-4 text-gray-400 pointer-events-none"
            />
                {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1 ml-4">
                        {errors.confirmPassword.message}
                    </p>
                )}
            </div>

            {/* Submit Button */}
            <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 rounded-lg disabled:opacity-60"
            >
                {loading ? "Resetting..." : "Reset Password"}
            </button>
        </form>

        {/* Back to login */}
        <div className="mt-8 text-center">
            <Link
            href="/login"
            className="inline-flex items-center space-x-2 text-green-600 hover:underline font-medium"
            >
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