    export type OrdersResponse = Order[];

    export interface Order {
    _id: string;
    id: number;
    shippingAddress: ShippingAddress;
    taxPrice: number;
    shippingPrice: number;
    totalOrderPrice: number;
    paymentMethodType: "cash" | "card" | string;
    isPaid: boolean;
    isDelivered: boolean;
    paidAt?: string;
    createdAt: string;
    updatedAt: string;
    user: User;
    cartItems: CartItem[];
    __v: number;
    }

    export interface ShippingAddress {
    details: string;
    phone: string;
    city: string;
    }

    export interface User {
    _id: string;
    name: string;
    email: string;
    phone: string;
    }

    export interface CartItem {
    _id: string;
    count: number;
    price: number;
    product: Product;
    }

    export interface Product {
    _id: string;
    id: string;
    title: string;
    imageCover: string;
    category: Category;
    brand: Brand;
    subcategory: SubCategory[];
    ratingsAverage: number;
    ratingsQuantity: number;
    }

    export interface Category {
    _id: string;
    name: string;
    slug: string;
    image: string;
    }

    export interface Brand {
    _id: string;
    name: string;
    slug: string;
    image: string;
    }

    export interface SubCategory {
    _id: string;
    name: string;
    slug: string;
    category: string;
}
