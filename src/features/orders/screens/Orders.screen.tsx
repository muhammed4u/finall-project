"use client"
import { faBox, faBoxOpen, faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { getUserOrders } from "../server/Orders.action";
import OrderCard from "../components/OrderCard";
import { useSelector } from "react-redux";
import { AppState } from "@/store/store";
import { useEffect, useState } from "react";
import { OrdersResponse } from "../Types/orders.types";

export default function OrdersScreen() {
    const { userInfo } = useSelector((state: AppState) => state.auth);
    const [orders, setOrders] = useState<null | OrdersResponse>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!userInfo) return;

        const fetchOrders = async () => {
            setLoading(true);
            try {
                const response = await getUserOrders({ id: userInfo.id });
                setOrders(response);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [userInfo]);

    if (!userInfo) return null;

    // Loading skeleton
    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8 animate-pulse">
                    <div className="h-6 w-40 bg-gray-200 rounded mb-4"></div>
                    <div className="h-6 w-60 bg-gray-200 rounded mb-6"></div>
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-28 bg-gray-100 rounded-xl mb-4"></div>
                    ))}
                </div>
            </div>
        );
    }

    // No orders
    if (!orders || orders.length === 0) {
        return (
            <div className="min-h-[60vh] px-4 flex items-center justify-center">
                <div className="max-w-sm text-center">
                    <div className="w-24 h-24 rounded-xl bg-gray-100 flex items-center justify-center mb-6 mx-auto">
                        <FontAwesomeIcon icon={faBoxOpen} className="text-4xl text-gray-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">No Orders Yet</h2>
                    <p className="text-gray-500 mb-8 text-sm leading-relaxed">
                        You haven't placed any orders yet.
                    </p>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-xl text-sm hover:bg-green-600 transition-colors duration-200"
                    >
                        <FontAwesomeIcon icon={faShoppingBag} className="text-xs" />
                        Start Shopping
                    </Link>
                </div>
            </div>
        );
    }

    // Orders list
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <nav className="flex items-center gap-2 mb-6 text-sm text-gray-500">
                    <Link href="/" className="hover:text-green-600 transition-colors duration-200">
                        Home
                    </Link>
                    <span className="text-gray-300">/</span>
                    <span className="text-gray-900 font-medium"> My Orders</span>
                </nav>

                {/* Title */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/25">
                            <FontAwesomeIcon icon={faBox} className="text-2xl text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Orders</h1>
                            <p className="text-gray-500 text-sm mt-0.5">
                                Track and manage your {orders.length} {orders.length === 1 ? "order" : "orders"}
                            </p>
                        </div>
                    </div>
                    <Link
                        href="/"
                        className="self-start sm:self-auto text-green-500 font-medium flex items-center gap-2 px-4 py-2 rounded-xl text-sm hover:bg-green-50 hover:text-green-600 transition-colors duration-200"
                    >
                        <FontAwesomeIcon icon={faShoppingBag} className="text-xs" />
                        Continue Shopping
                    </Link>
                </div>
            </div>
            {/* Orders */}
            <div className="space-y-4">
                {orders.map((order) => (
                    <OrderCard key={order._id} orderInfo={order} />
                ))}
            </div>
        </div>
    );
}
