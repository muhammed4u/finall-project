"use client"
import { AppState } from "@/store/store";
import { faUser, faFloppyDisk, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import ChangePassword from "./changePassword";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserUpdate } from "../types/updateUserData.type";
import { updateUserDataSchema } from "../Schema/UpdateUserDataSchema";
import { UpdateLoggedUserData } from "../server/settings.action";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Settings() {
    const { userInfo } = useSelector((appState: AppState) => appState.auth);
    const [isSubmitting, setIsSubmitting] = useState(false)

    const { register, handleSubmit, formState: { errors } , setError , reset } = useForm<UserUpdate>({
            resolver: zodResolver(updateUserDataSchema),
    })

    const router = useRouter();

    useEffect(() => {
    if (userInfo) {
        reset({
        name: userInfo.name || "",
        email: userInfo.email || "",
        phone: ""
        });
    }
    }, [userInfo, reset]);

    const onSubmit:SubmitHandler<UserUpdate> =  async (values)=>{
        setIsSubmitting(true)
        try {
            const response = await UpdateLoggedUserData({values})
            console.log(response);

            if (response.message === "fail" && response.errors?.param === "email") {
            toast.error("Email is already in use"); ;
            return; 
            }

            if(response.message=== 'success'){
                toast.success("User data updated successfully")
                router.push('/login');
            }
        } catch (error: any) {
            toast.error("Failed to update user data");
            } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <>
        <div className="max-w-3xl mx-auto space-y-10">

        <section className="relative rounded-3xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 shadow-2xl p-10 overflow-hidden">

            <div className="absolute -top-24 -right-24 w-72 h-72 bg-emerald-200/30 blur-3xl rounded-full pointer-events-none"></div>

            <div className="relative">
            
            <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
                <FontAwesomeIcon icon={faUser} className="text-green-600" />
                </div>
                <div>
                <h2 className="text-2xl font-bold text-gray-800">
                    Profile Information
                </h2>
                <p className="text-gray-500 text-sm">
                    Update your personal details
                </p>
                </div>
            </div>

            <form className="grid gap-8" onSubmit={handleSubmit(onSubmit)}>
                
                <div>
                <label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-gray-700 mb-2"
                >
                    Full Name
                </label>
                <input
                    id="fullName"
                    type="text"
                    {...register("name")}
                    className="w-full px-5 py-3 rounded-2xl border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                    placeholder="Your full name"
                />
                {errors.name && <p className="text-red-500 mt-0.5 text-sm">*{errors.name.message}</p>}
                </div>

                <div>
                <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                >
                    Email Address
                </label>
                <input
                    id="email"
                    type="email"
                    {...register("email")}
                    className={`w-full px-5 py-3 rounded-2xl border ${
                        errors.email ? "border-red-500" : "border-gray-300"
                        } bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition`}
                    placeholder="you@example.com"
                />
                {errors.email && <p className="text-red-500 mt-0.5 text-sm">*{errors.email.message}</p>}
                </div>

                <div>
                <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-2"
                >
                    Phone Number
                </label>
                <input
                    id="phone"
                    type="tel"
                    {...register("phone")}
                    className="w-full px-5 py-3 rounded-2xl border border-gray-300 bg-gray-100 shadow-inner focus:outline-none transition"
                    placeholder="01xxxxxxxxx"
                />
                {errors.phone && <p className="text-red-500 mt-0.5 text-sm">*{errors.phone.message}</p>}
                </div>

                <div>
                
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`group relative inline-flex items-center gap-3 px-7 py-3 rounded-3xl text-white font-semibold shadow-lg transition-all duration-300 
                    ${isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-green-600 to-emerald-500 hover:shadow-2xl"}`}
                >
                    {isSubmitting ? (
                        <>
                            <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />
                            Saving...
                        </>
                    ) : (
                        <>
                            <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition rounded-3xl"></span>
                            <FontAwesomeIcon icon={faFloppyDisk} className="relative z-10" />
                            <span className="relative z-10">Save Changes</span>
                        </>
                    )}
                </button>
                </div>
            </form>

            <hr className="my-12 border-gray-300" />
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Account Information
                </h3>

                <div className="grid grid-cols-2 gap-y-6 text-gray-700 text-sm font-medium max-w-md">
                <div className="space-y-6 *:text-gray-600 ">
                    <div>User ID</div>
                    <div>Role</div>
                </div>

                <div className="space-y-6 text-gray-900 font-semibold text-xs">
                    <div>{userInfo?.id || "—"}</div>
                    <div>
                    <span className="inline-block px-4 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
                        {userInfo?.role || "User"}
                    </span>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </section>
        <ChangePassword/>

        </div>
        </>
    );
}