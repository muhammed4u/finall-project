"use client"

import { useState } from "react"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPaperPlane, faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons"

interface FormState {
    name: string
    email: string
    message: string
    }

    export default function ContactPage() {

    const [formData, setFormData] = useState<FormState>({
        name: "",
        email: "",
        message: ""
    })

    const [isSending, setIsSending] = useState(false)
    const [isSent, setIsSent] = useState(false)

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setIsSending(true)

        setTimeout(() => {
        setIsSending(false)
        setIsSent(true)

        setFormData({
            name: "",
            email: "",
            message: ""
        })

        setTimeout(() => setIsSent(false), 3000)
        }, 2000)
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-green-50 via-white to-emerald-50 py-20 px-6">

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">

            {/* ================= LEFT SIDE ================= */}
            <div>

            <h1 className="text-5xl font-bold mb-6 bg-linear-to-r from-green-600 to-emerald-400 bg-clip-text text-transparent">
                Let’s Talk.
            </h1>

            <p className="text-gray-600 text-lg leading-relaxed mb-10">
                Have questions about our products or services?  
                Our team is ready to assist you anytime.
            </p>

            <div className="space-y-6">

                <div className="flex items-center gap-4">
                <div className="h-12 w-12 flex items-center justify-center rounded-full bg-green-100 text-green-600">
                    <FontAwesomeIcon icon={faEnvelope} />
                </div>
                <span className="text-gray-700">support@yourstore.com</span>
                </div>

                <div className="flex items-center gap-4">
                <div className="h-12 w-12 flex items-center justify-center rounded-full bg-green-100 text-green-600">
                    <FontAwesomeIcon icon={faPhone} />
                </div>
                <span className="text-gray-700">+20 123 456 789</span>
                </div>

            </div>

            <div className="mt-12">
                <Link
                href="/"
                className="inline-block px-8 py-3 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 hover:scale-105 transition-all duration-300"
                >
                Explore Products
                </Link>
            </div>

            </div>


            {/* ================= FORM CARD ================= */}
            <div className="relative">

            <div className="absolute -inset-1 bg-linear-to-r from-green-400 to-emerald-400 rounded-3xl blur opacity-20"></div>

            <div className="relative bg-white rounded-3xl p-10 shadow-xl border border-green-100">

                <h2 className="text-2xl font-bold mb-8 text-green-600">
                Send Message
                </h2>

                <form onSubmit={handleSubmit} className="space-y-8">

                {/* Floating Input */}
                {[
                    { label: "Full Name", name: "name", type: "text" },
                    { label: "Email Address", name: "email", type: "email" }
                ].map((field) => (
                    <div key={field.name} className="relative">
                    <input
                        type={field.type}
                        name={field.name}
                        value={formData[field.name as keyof FormState]}
                        onChange={handleChange}
                        required
                        className="peer w-full border-b-2 border-gray-300 focus:border-green-500 outline-none py-2 bg-transparent transition"
                    />
                    <label className="absolute left-0 top-2 text-gray-400 text-sm transition-all peer-focus:-top-4 peer-focus:text-green-500 peer-focus:text-xs 
                        peer-valid:-top-4 peer-valid:text-xs">
                        {field.label}
                    </label>
                    </div>
                ))}

                {/* Textarea */}
                <div className="relative">
                    <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="peer w-full border-b-2 border-gray-300 focus:border-green-500 outline-none py-2 bg-transparent transition resize-none"
                    />
                    <label className="absolute left-0 top-2 text-gray-400 text-sm transition-all peer-focus:-top-4 peer-focus:text-green-500 peer-focus:text-xs 
                    peer-valid:-top-4 peer-valid:text-xs">
                    Your Message
                    </label>
                </div>

                {/* Button */}
                <button
                    type="submit"
                    disabled={isSending}
                    className={`w-full py-3 rounded-full font-medium flex items-center justify-center gap-2 transition-all duration-300 shadow-md
                    ${
                        isSent
                        ? "bg-green-400 text-white"
                        : "bg-green-500 text-white hover:bg-green-600 hover:scale-[1.02]"
                    }
                    ${isSending ? "opacity-80 cursor-not-allowed" : ""}
                    `}
                >
                    {isSending ? (
                    <>
                        <FontAwesomeIcon icon={faPaperPlane} spin />
                        Sending...
                    </>
                    ) : isSent ? (
                    "Message Sent ✓"
                    ) : (
                    <>
                        <FontAwesomeIcon icon={faPaperPlane} />
                        Send Message
                    </>
                    )}
                </button>

                </form>

            </div>

            </div>

        </div>
        </div>
    )
}