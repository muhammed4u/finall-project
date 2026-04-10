"use client"
import { faHeart, faTrash, faCartShopping, faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import WishlistItem from "../components/WishlistItem";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "@/store/store";
import WishlistEmpty from "../components/NoWishlist";
import WishlistLoadingScreen from "../components/WishlistLoadingScreen";
import { useEffect } from "react";
import { setWishlistInfo, setWishlistLoading } from "../store/Wishlist.slice";
import { getLoggedUserWishlist } from "../server/Wishlist.action";

export default function WishlistScreen() {

    const {count , data , isLoading} = useSelector((state:AppState)=> state.wishlist)

    const dispatch = useDispatch();

    useEffect(() => {
    const fetchWishlist = async () => {
        dispatch(setWishlistLoading(true));
        try {
            const wishlistInfo = await getLoggedUserWishlist();
            dispatch(setWishlistInfo(wishlistInfo));
        } catch (error) {
            console.error(error);
        } finally {
            dispatch(setWishlistLoading(false));
        }
    };

    fetchWishlist();
    }, [dispatch]);


    if(isLoading) {
        return <WishlistLoadingScreen/>
    }
    if (count === 0) {
    return <WishlistEmpty />;
    }


    return (
        <div className=" min-h-screen py-8">
            <div className="container mx-auto px-4">

                {/* Header */}
                <div className="mb-8">
                    <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                        <Link href={"/"} className="hover:text-green-500 transition">
                            Home
                        </Link>
                        <span>/</span>
                        <span className="text-gray-900 text-sm">Wishlist</span>
                    </nav>

                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                            <span className="bg-red-500 text-white h-12 w-12 rounded-xl flex items-center justify-center">
                                <FontAwesomeIcon icon={faHeart} />
                            </span>
                            My Wishlist
                        </h1>

                        <p className="text-gray-500 mt-2">
                            <span className="font-semibold text-red-500">
                                {count} 
                            </span>{" "}
                            {count === 1? "item" : "items"} added
                        </p>
                    </div>
                </div>

                {/* Wishlist Items */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

                    {/* Table Header */}
                    <div className="hidden md:grid grid-cols-4 bg-gray-50 px-6 py-4 text-sm font-medium text-gray-500">
                        <span className="col-span-2">Product</span>
                        <span>Price</span>
                        <span className="text-right">Actions</span>
                    </div>

                    {/* Items */}
                    <div className="divide-y divide-gray-100 ">
                        {data.map((item, index) => (
                            <WishlistItem key={index} itemInfo={item} />
                        ))}
                    </div>
                </div>

                {/* Continue Shopping */}
                <div className="mt-6">
                    <Link
                        href={"/"}
                        className="text-green-500 hover:text-green-600 transition font-medium flex items-center gap-2"
                    >
                        <FontAwesomeIcon icon={faArrowLeftLong} />
                        Continue shopping
                    </Link>
                </div>

            </div>
        </div>
    );
}
