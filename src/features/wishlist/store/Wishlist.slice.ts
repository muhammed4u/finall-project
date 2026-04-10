import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product, ProductsResponse } from "../Types/getLoggedUserWishlist.type";

export interface WishlistState {
    count: number
    data: Product[]
    isLoading: boolean
    error: null | string
}

const initialState:WishlistState = {
    count: 0,
    data:[],
    isLoading: false,
    error: null
}

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        setWishlistInfo: function(state , action:PayloadAction<ProductsResponse>){
            state.count = action.payload.count
            state.data = action.payload.data
        },
        removeWishlistItem: (state, action: PayloadAction<{id: string}>) => {
        const productId = action.payload.id
        const removedProduct = state.data.find((item)=> item.id == productId)
        if(removedProduct){
            state.data = state.data.filter((item)=> item.id !== productId)
            state.count = state.data.length
        } 
    },
    setWishlistLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
        },
        addWishlistItem: (state, action: PayloadAction<Product>) => {
            const exists = state.data.find(item => item.id === action.payload.id)
            if (!exists) {
                state.data.push(action.payload)
                state.count = state.data.length
            }
        },

    }
})

export const wishlistReducer = wishlistSlice.reducer
export const {setWishlistInfo , removeWishlistItem , setWishlistLoading , addWishlistItem} = wishlistSlice.actions