"use client";

import { useState } from "react";
import { faLock, faEye, faEyeSlash, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { changePasswordSchema } from "../Schema/ChangePasswordSchema";
import { ChangePasswordData } from "../server/ChangePassword.action";
import { changePassword } from "../types/ChangePassword.type";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";


export default function ChangePassword() {
    const router = useRouter();
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<changePassword>({
        resolver: zodResolver(changePasswordSchema),
        defaultValues: {
            currentPassword: '',
            password: '',
            rePassword: ''
        }
    });

    const onsubmit: SubmitHandler<changePassword> = async (values) => {
        setIsSubmitting(true);
        try {
            const response = await ChangePasswordData({ values });
            // console.log(response);
            if(response.message === "success"){
                toast.success("Password changed successfully");
                router.push('/login');
            }
        } catch (error) {
            toast.error("Failed to change password");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="relative rounded-3xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 shadow-2xl p-10 overflow-hidden">
        
        {/*  Background  */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-emerald-200/30 blur-3xl rounded-full pointer-events-none"></div>

        <div className="relative">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
                <FontAwesomeIcon icon={faLock} className="text-green-600" />
            </div>
            <div>
                <h2 className="text-2xl font-bold text-gray-800">
                Change Password
                </h2>
                <p className="text-gray-500 text-sm">
                Update your account password
                </p>
            </div>
            </div>

            {/* Form */}
            <form className="grid gap-8" onSubmit={handleSubmit(onsubmit)}>

            {/* Current Password */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Password
                </label>
                <div className="relative">
                <input
                    type={showCurrent ? "text" : "password"}
                    {...register("currentPassword")}
                    placeholder="Enter your current password"
                    className="w-full px-5 py-3 pr-12 rounded-2xl border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                />
                <button
                    type="button"
                    onClick={() => setShowCurrent(!showCurrent)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                    <FontAwesomeIcon icon={showCurrent ? faEye : faEyeSlash} />
                </button>
                </div>
                {errors.currentPassword && (
                    <p className="text-red-500 text-xs mt-1">{errors.currentPassword.message}</p>
                )}
            </div>

            {/* New Password */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                New Password
                </label>
                <div className="relative">
                <input
                    type={showNew ? "text" : "password"}
                    {...register("password")}
                    placeholder="Enter your new password"
                    className="w-full px-5 py-3 pr-12 rounded-2xl border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                />
                <button
                    type="button"
                    onClick={() => setShowNew(!showNew)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                    <FontAwesomeIcon icon={showNew ? faEyeSlash : faEye} />
                </button>
                </div>
                {errors.password && (
                    <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                )}
            </div>

            {/* Confirm Password */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm New Password
                </label>
                <div className="relative">
                <input
                    type={showConfirm ? "text" : "password"}
                    {...register("rePassword")}
                    placeholder="Confirm your new password"
                    className="w-full px-5 py-3 pr-12 rounded-2xl border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                />
                <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                    <FontAwesomeIcon icon={showConfirm ? faEyeSlash : faEye} />
                </button>
                </div>
                {errors.rePassword && (
                    <p className="text-red-500 text-xs mt-1">{errors.rePassword.message}</p>
                )}
            </div>

            {/* Save Button */}
            <div>
                <button
                type="submit"
                disabled={isSubmitting}
                className={`group relative inline-flex items-center gap-3 px-7 py-3 rounded-3xl text-white font-semibold bg-gradient-to-r shadow-lg transition-all duration-300 hover:shadow-2xl  ${isSubmitting ? "bg-gray-400 cursor-not-allowed": "from-green-600 to-emerald-500"}`}
                >
                {isSubmitting ? <> <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />
                            Updating...</> : <>
                <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition rounded-3xl"></span>
                <FontAwesomeIcon icon={faLock} className="relative z-10" />
                <span className="relative z-10">Update Password</span></>}
                </button>
            </div>

            </form>
        </div>
        </section>
    );
}
