import { getAllCategories } from "@/features/Categories/Servers/Categories.action"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import Link from "next/link"
import CategorySlider from "./CategorySlider"

export default async function OurCategories() {
    const response = await getAllCategories()
    return (
        <>
            <section id="categories" className="py-24 bg-gray-50/50">
                <div className="container mx-auto px-6">
                    {/* Section Header */}
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                        <div className="space-y-2">
                            <h2 className="text-4xl font-bold text-gray-900 tracking-tight">
                                Shop by <span className="text-emerald-600">Category</span>
                            </h2>
                            <p className="text-gray-500 font-medium">Explore our wide range of premium collections</p>
                        </div>
                        <Link href={'/categories'}
                        className="group flex items-center gap-2 text-emerald-600 font-bold hover:text-emerald-700 transition-colors cursor-pointer">
                            <span>Browse All Categories</span>
                            <FontAwesomeIcon icon={faArrowRight} className="text-xs group-hover:translate-x-1 transition-transform"/>
                        </Link>
                    </div>

                    {/* Categories Slider */}
                    <div className="mt-8 -mx-4 px-4 sm:mx-0 sm:px-0">
                        <CategorySlider categories={response.data} />
                    </div>
                </div>
            </section>
        </>
    )
}
