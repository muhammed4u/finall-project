import { authReducer, AuthState } from "@/features/auth/store/auth.slice"
import { cartReducer, CartState } from "@/features/cart/store/Cart.slice"
import { wishlistReducer, WishlistState } from "@/features/wishlist/store/Wishlist.slice"
import {configureStore} from "@reduxjs/toolkit"

export type preloadedState = {
    auth: AuthState
    cart: CartState
    wishlist: WishlistState
}

export function createStore(preloadedState:preloadedState){
    const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
        wishlist: wishlistReducer
    },
    preloadedState
})

    return store;
}

export type AppStore = ReturnType<typeof createStore>
export type AppState = ReturnType<AppStore['getState']>