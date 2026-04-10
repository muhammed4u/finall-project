import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./../styles/globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import "@fortawesome/fontawesome-svg-core/styles";
import { config } from "@fortawesome/fontawesome-svg-core";
import {ToastContainer, Bounce} from "react-toastify"
import icon from "../assets/images/mini-logo.png"
config.autoAddCss = false;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"], 
});

import {Exo} from "next/font/google";
import Providers from "@/components/Providers/Providers";
import { auth } from "@/auth";
import { verifyToken } from "@/features/auth/server/Token.action";
import { getLoggedUserCart } from "@/features/cart/server/cart.action";
import { CartState, setCartInfo } from "@/features/cart/store/Cart.slice";
import { getLoggedUserWishlist } from "@/features/wishlist/server/Wishlist.action";
import {  WishlistState } from "@/features/wishlist/store/Wishlist.slice";
const exo = Exo({
  variable: "--font-exo",
  subsets: ["latin"],
  weight: ["400","500", "600", "700", "800", "900"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  // cart state to hold items
  let cartState:CartState = {
    cartId: null,
    numOfCartItems: 0,
    totalCartPrice: 0,
    products: [],
    error: null,
    isLoading: false
  }

  const authValues = await verifyToken()
  const session = await auth();

  if (session && session.user) {
    authValues.isAuthenticated = true;
    authValues.userInfo = {
      id: session.user.id || 'next-auth-id',
      name: session.user.name || '',
      role: 'user'
    };
  }
  
  // check if user is logged in
  if(authValues.isAuthenticated){
    try {
      const cartResponse = await getLoggedUserCart()
      cartState ={
        cartId: cartResponse.cartId,
        numOfCartItems: cartResponse.numOfCartItems,
        totalCartPrice: cartResponse.data.totalCartPrice,
        products: cartResponse.data.products,
        error: null,
        isLoading: false
      }
    } catch (error) {
      
    }
  }

  let wishlistState:WishlistState = {
    count: 0,
    data: [],
    isLoading: false,
    error: null
  }

  if(authValues.isAuthenticated){
    try {
      const wishlistResponse = await getLoggedUserWishlist()

      wishlistState = {
        count: wishlistResponse.count,
        data:wishlistResponse.data,
        error: null,
        isLoading: false
      }
      
    } catch (error) {
      
    }
  }

  return (
    <html lang="en">
    <head>
    <link rel="icon" type="image/svg+xml" href={icon.src}/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Fresh Cart</title>
  </head>
      <body
        className={`${exo.className} font-medium`}
        suppressHydrationWarning
      >
        <Providers preloadedState={{auth:authValues, cart: cartState , wishlist: wishlistState  }} >
          <Navbar/>
        {children}
        <Footer/>
        <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
        />
        </Providers>
      </body>
    </html>
  );
}
