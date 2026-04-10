"use client"

import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProductToCart, getLoggedUserCart } from "../server/cart.action";
import { toast } from "react-toastify";
import { setCartInfo } from "../store/Cart.slice";



export function useAddToCart() {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const addToCart = async (productId: string) => {
        if (isLoading) return;

        try {
        setIsLoading(true);

        const response = await addProductToCart({ productId });

        if (response.status === "success") {
            toast.success(response.message);

            const cartInfo = await getLoggedUserCart();
            dispatch(setCartInfo(cartInfo));

            return true; // success flag
        }
        } catch (error) {
        toast.error("Failed to add product to cart, please login first");
        return false;
        } finally {
        setIsLoading(false);
        }
    };

    return { addToCart, isLoading };``
}
