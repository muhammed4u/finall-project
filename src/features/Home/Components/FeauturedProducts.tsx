import ProductCard from "@/features/Products/Components/ProductCard"
import { getProducts } from "@/features/Products/Server/Products.action"
import StaggerReveal from "./Animation/products"

export default async function FeauturedProducts() {
    const response = await getProducts()
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Soft decorative background - Gives the section a premium feel */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-linear-to-b from-gray-50/50 to-white pointer-events-none" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-2 bg-linear-to-b from-emerald-400 to-emerald-600 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.3)]"></div>
                            <h2 className="text-4xl font-black text-gray-900 tracking-tight">
                                Featured <span className="text-emerald-500 uppercase italic">Collection</span>
                            </h2>
                        </div>
                        <p className="text-gray-500 font-medium ml-5">Discover our handpicked premium products just for you</p>
                    </div>
                    
                    <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-gray-400">
                        <span className="text-emerald-500">Trending Now</span>
                        <div className="size-1 bg-gray-200 rounded-full" />
                        <span>Limited Edition</span>
                    </div>
                </div>

            {/* Responsive grid: 1 col on mobile, 2 on small tablets, 3 on tablets, 4-5 on larger screens */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
            {
                response.data.map((Product) => (
                <StaggerReveal key={Product._id}>
                    <ProductCard info={Product} />
                </StaggerReveal>
                ))
            }
            </div>
            </div>
        </section>
    )
}
