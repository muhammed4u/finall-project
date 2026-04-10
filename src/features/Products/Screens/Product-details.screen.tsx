"use client";
import { useEffect, useState } from "react";
import ProductInfo from "../Components/ProductDetails/ProductInfo";
import { getProductById, getProducts } from "../Server/Products.action";
import ProductInfoSkeleton from "../Components/ProductInfoSkeleton";
import { Product } from "../Types/Products.types";
import SimilarProductsSwiper from "../Components/ProductDetails/SimilarProducts";
import ProductTabsScreen from "@/features/reviews/screen/ProductsTabs.screen";
import { getLoggedUserWishlist } from "@/features/wishlist/server/Wishlist.action";
import { setWishlistInfo } from "@/features/wishlist/store/Wishlist.slice";
import { useDispatch } from "react-redux";

export default function ProductDetailsScreen({ productId }: { productId: string }) {
    const dispatch = useDispatch();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [similarProducts, setSimilarProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProduct = async () => {
        try {
            setLoading(true);
            const response = await getProductById({ id: productId });
            setProduct(response.data);

            const similarResponse = await getProducts({
                category: [response.data.category._id],
            });

            const filtered = similarResponse.data.filter(
                (item) => item.id !== response.data.id
            );
            setSimilarProducts(filtered);
        } catch (error) {
            console.error("Failed to fetch product:", error);
        } finally {
            setLoading(false);
        }
        };

        fetchProduct();
    }, [productId]);

        useEffect(() => {
        const fetchWishlist = async () => {
            try {
            const wishlist = await getLoggedUserWishlist();
            dispatch(setWishlistInfo(wishlist));
            } catch (error) {
            console.log("No wishlist yet");
            }
        };

        fetchWishlist();
        }, []);

    return (
    <>
        {loading ? (
            <ProductInfoSkeleton />
        ) : (
            product && (
            <>
                <ProductInfo product={product} />

                  <section className="container mx-auto px-4 my-12">
                    <ProductTabsScreen product={product} />
                  </section>

                {similarProducts.length > 0 && (
                  <section className="container mx-auto px-4 my-12">
                    <div className="bg-gray-50 rounded-3xl shadow-xl p-6 md:p-10">
                      
                      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
                        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
                          You May Also Like
                        </h2>
                        <p className="text-sm md:text-base text-gray-500 mt-2 md:mt-0">
                          Discover products that complement your selection
                        </p>
                      </div>

                      <div className="relative">
                        <SimilarProductsSwiper products={similarProducts} />

                        <div className="absolute top-1/2 transform -translate-y-1/2 left-0 z-10">
                        </div>
                        <div className="absolute top-1/2 transform -translate-y-1/2 right-0 z-10">
                        </div>
                      </div>

                      <div className="mt-6 text-center">
                        <span className="text-gray-500 text-sm md:text-base">
                          Explore more trending items curated just for you
                        </span>
                      </div>
                    </div>
                  </section>
                )}
            </>
            )
        )}
        </>
    );
}
