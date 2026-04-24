import { getAllCategories } from "@/features/Categories/Servers/Categories.action"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import Link from "next/link"

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

                    {/* Categories Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                        {
                            response.data.map((category)=>(
                                <Link
                                href={`/search?category=${category._id}`} key={category._id}
                                className="group flex flex-col items-center bg-white border border-gray-100 rounded-3xl p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/10 hover:border-emerald-100 cursor-pointer"
                                >
                                    <div className="relative size-32 mb-4 rounded-2xl overflow-hidden bg-gray-50 transition-transform duration-500 group-hover:scale-105">
                                        <Image
                                        width={200}
                                        height={200}
                                        src={category.image}
                                        alt={category.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        {/* Overlay Glow */}
                                        <div className="absolute inset-0 bg-emerald-500/0 group-hover:bg-emerald-500/5 transition-colors" />
                                    </div>

                                    <div className="text-center">
                                        <h3 className="font-bold text-gray-800 text-sm group-hover:text-emerald-600 transition-colors">
                                            {category.name}
                                        </h3>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            Explore
                                        </span>
                                    </div>
                                </Link>
                            ))
                        }
                    </div>
                </div>
            </section>
        </>
    )
}
