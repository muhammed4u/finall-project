"use client"; // Must be first line

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { getCategoryDetails } from "../Servers/Categories.action";
import { getSubCategoryDetails } from "../Servers/SubCategories.action";
import CategoryDetailsCard from "../Components/CategoryDetailsCards";

import { Category } from "../Types/Categories.types";
import CategoryDetailsCardSkeleton from "../Components/CategoryCardDetailsSkeleton";

interface Props {
    id: string;
}

export default function CategoryDetailsScreen({ id }: Props) {
    const [category, setCategory] = useState<Category | null>(null);
    const [subcategories, setSubcategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
        try {
            const catResponse = await getCategoryDetails({ id });
            setCategory(catResponse.data);

            const subResponse = await getSubCategoryDetails({ id });
            setSubcategories(subResponse.data);
        } catch (error) {
            console.error("Failed to fetch category details:", error);
        } finally {
            setLoading(false);
        }
        }

    fetchData();
    }, [id]);

    return (
        <div className="min-h-screen bg-gray-100">
        
        {/* ================= HEADER ================= */}
        <div className="py-5 bg-gradient-to-r from-emerald-600 via-green-500 to-teal-500 text-white shadow-md">
            <div className="max-w-7xl mx-auto px-6 py-10">

            {/* Breadcrumb */}
            <div className="flex items-center text-sm text-emerald-100 mb-6">
                <Link href="/" className="hover:text-white hover:underline transition">Home</Link>
                <span className="mx-3 text-emerald-200">/</span>
                <Link href="/categories" className="hover:text-white hover:underline transition">Categories</Link>
                <span className="mx-3 text-emerald-200">/</span>
                <span className="text-white font-semibold">
                {loading ? "Loading..." : category?.name}
                </span>
            </div>

            {/* Title Section */}
            <div className="flex items-center gap-5">
                {/* Avatar */}
                <div className="w-20 h-20 rounded-2xl overflow-hidden bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
                {loading ? (
                    <div className="w-20 h-20 bg-gray-300 animate-pulse rounded-2xl" />
                ) : (
                    <Image
                    src={category!.image}
                    alt={category!.name}
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                    />
                )}
                </div>

                {/* Title + Subtitle */}
                <div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                    {loading ? "Loading..." : category?.name}
                </h1>
                <p className="text-emerald-100 mt-2 text-lg">
                    Choose a subcategory to browse products
                </p>
                </div>
            </div>

            </div>
        </div>

        {/* ================= CONTENT ================= */}
        <div className="max-w-7xl mx-auto px-6 py-10">
            {/* Back Button */}
            <Link
            href="/categories"
            className="inline-flex items-center text-gray-600 hover:text-emerald-600 font-medium mb-8 transition"
            >
            <FontAwesomeIcon icon={faArrowLeftLong} className="mr-3" />
            Back to Categories
            </Link>

            {/* Subcategories Header */}
            <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold text-gray-800">
                Subcategories
            </h2>
            <span className="bg-emerald-100 text-emerald-700 text-sm font-medium px-4 py-1 rounded-full">
                {loading ? "--" : subcategories.length} Available
            </span>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {loading
                ? Array.from({ length: 4 }).map((_, index) => (
                    <CategoryDetailsCardSkeleton key={index} />
                ))
                : subcategories.map((sub) => (
                    <CategoryDetailsCard
                    key={sub._id}
                    title={sub.name}
                    />
                ))
            }
            </div>

        </div>
        </div>
    );
}