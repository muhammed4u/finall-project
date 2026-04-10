"use client"
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faShieldAlt, faLock } from "@fortawesome/free-solid-svg-icons";

export default function ForgetPasswordHero() {
    const [animate, setAnimate] = useState(false);
    useEffect(() => {
        setAnimate(true);
    }, []);

    return (
        <section
        className={`relative hidden lg:flex flex-col justify-center items-center
            bg-linear-to-br from-green-700 via-green-500 to-green-400
            rounded-l-3xl p-16   text-white overflow-hidden`}
        >
        <div className="absolute -top-24 -left-24 w-56 h-56 bg-green-300 rounded-full opacity-30 animate-floatSlow"></div>
        <div className="absolute bottom-16 right-12 w-40 h-40 bg-green-200 rounded-full opacity-20 animate-float"></div>
        <div className="absolute top-12 right-28 w-32 h-32 bg-green-400 rounded-full opacity-25 animate-floatSlow"></div>

        <div className="mb-12">
            <svg
            className="w-28 h-28 text-green-100 animate-pulse"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
            aria-hidden="true"
            >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0110 0v4" />
            </svg>
        </div>

        <h2
            className={`text-4xl font-bold tracking-wide mb-4 max-w-xs text-center 
            transition-all duration-700 ease-out transform ${
                animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
        >
            Reset Your Password
        </h2>

        <p
            className={`max-w-xs text-center text-green-100 text-lg leading-relaxed
            transition-opacity duration-1000 delay-300 ${
                animate ? "opacity-100" : "opacity-0"
            }`}
        >
            Forgot your password? Don’t worry, we’ll help you recover your account quickly and securely.
        </p>

        <div className="flex space-x-8 mt-16">
            {[faEnvelope, faShieldAlt, faLock].map((icon, i) => (
            <div
                key={i}
                className={`bg-green-600 p-4 rounded-full shadow-lg text-white cursor-default animate-bounceSlow`}
                style={{ animationDelay: `${i * 0.3}s` }}
            >
                <FontAwesomeIcon icon={icon} className="w-6 h-6" />
            </div>
            ))}
        </div>

        <style jsx>{`
            @keyframes float {
            0%, 100% { transform: translateY(0) }
            50% { transform: translateY(-12px) }
            }
            @keyframes floatSlow {
            0%, 100% { transform: translateY(0) }
            50% { transform: translateY(-6px) }
            }
            @keyframes bounceSlow {
            0%, 100% { transform: scale(1) }
            50% { transform: scale(1.1) }
            }
            .animate-float {
            animation: float 6s ease-in-out infinite;
            }
            .animate-floatSlow {
            animation: floatSlow 8s ease-in-out infinite;
            }
            .animate-bounceSlow {
            animation: bounceSlow 3s ease-in-out infinite;
            }
        `}</style>
        </section>
    );
}