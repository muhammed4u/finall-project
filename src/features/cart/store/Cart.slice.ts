import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartProduct, CartResponse } from "../types/GetLoggedUserCart.types";
;

export interface CartState {
    numOfCartItems: number,
    cartId: null | string,
    products: CartProduct[],
    totalCartPrice: number,
    isLoading: boolean,
    error: null | string
}

const initialState:CartState = {
    numOfCartItems: 0,
    cartId: null,
    products: [],
    totalCartPrice: 0,
    isLoading: false,
    error: null
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCartInfo: function(state, action:PayloadAction<CartResponse>){
            state.cartId = action.payload.cartId
            state.numOfCartItems = action.payload.numOfCartItems
            state.totalCartPrice = action.payload.data.totalCartPrice
            state.products = action.payload.data.products
        },
        clearCart: (state) => {
            state.cartId = null
            state.numOfCartItems = 0
            state.totalCartPrice = 0
            state.products = []
        }
        
    }
})

export const cartReducer = cartSlice.reducer
export const {setCartInfo , clearCart} = cartSlice.actions