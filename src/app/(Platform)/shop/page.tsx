"use client"

import ShopLoading from "@/components/ui/ShopLoading";
import ProductCard from "@/features/Products/Components/ProductCard";
import { getProducts } from "@/features/Products/Server/Products.action";
import { Product } from "@/features/Products/Types/Products.types";
import { useEffect, useState } from "react";


export default function AllProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProducts() {
        try {
            const response = await getProducts();
            setProducts(response.data || []);
        } catch (error) {
            console.error("Error loading products:", error);
            setProducts([]);
        } finally {
            setLoading(false);
        }
        }
        fetchProducts();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-linear-to-r from-green-600 to-green-500 text-white p-8 shadow-lg">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <nav aria-label="Breadcrumb" className="text-sm opacity-90">
                <ol className="inline-flex space-x-2">
                <li>
                    <a href="/" className="hover:underline">Home</a>
                </li>
                <li>
                    <span>/</span>
                </li>
                <li aria-current="page" className="font-semibold">
                    All Products
                </li>
                </ol>
            </nav>
            <div className="text-sm opacity-90">{products.length} products</div>
            </div>

            <h1 className="mt-4 text-4xl font-extrabold drop-shadow-lg max-w-7xl mx-auto px-6 sm:px-0">
            All Products
            </h1>
            <p className="max-w-7xl mx-auto px-6 sm:px-0 mt-1 text-green-100 text-lg font-light">
            Explore our complete product collection
            </p>
        </header>

        {/* Product Grid */}
        <main className="max-w-7xl mx-auto px-6 py-12">
            {loading ? (
            <ShopLoading />
            ) : products.length === 0 ? (
            <div className="text-center text-gray-500 text-lg py-20">
                No products found.
            </div>
            ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {products.map((product) => (
                <ProductCard key={product.id} info={product} />
                ))}
            </div>
            )}
        </main>
        </div>
    );
}