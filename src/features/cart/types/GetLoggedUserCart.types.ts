// Root response type
export interface CartResponse {
    status: string;
    numOfCartItems: number;
    cartId: string;
    data: CartData;
    }

    // Main cart data
    export interface CartData {
    _id: string;
    cartOwner: string;
    products: CartProduct[];
    createdAt: string; 
    updatedAt: string; 
    __v: number;
    totalCartPrice: number;
    }

    // Product in the cart
    export interface CartProduct {
    count: number;
    _id: string;
    product: Product;
    price: number;
    }

    // Product details
    export interface Product {
    _id: string;
    title: string;
    quantity: number;
    imageCover: string;
    category: Category;
    subcategory: Subcategory[];
    brand: Brand;
    ratingsAverage: number;
    id: string;
    }

    // Category of the product
    export interface Category {
    _id: string;
    name: string;
    slug: string;
    image?: string; 
    }

    // Subcategory of the product
    export interface Subcategory {
    _id: string;
    name: string;
    slug: string;
    category: string; // category ID
    }

    // Brand details
    export interface Brand {
    _id: string;
    name: string;
    slug: string;
    image: string;
}
