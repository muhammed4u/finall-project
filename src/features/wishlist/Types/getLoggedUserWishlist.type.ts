    export interface ProductsResponse {
    status: string;
    count: number;
    data: Product[];
    }

    export interface Product {
    sold: number;
    images: string[];
    subcategory: SubCategory[];
    ratingsQuantity: number;
    _id: string;
    id: string;
    title: string;
    slug: string;
    description: string;
    quantity: number;
    price: number;
    priceAfterDiscount?: number;
    availableColors: string[];
    imageCover: string;
    category: Category;
    brand: Brand;
    ratingsAverage: number;
    createdAt: string;   
    updatedAt: string;   
    __v: number;
    }

    export interface SubCategory {
    _id: string;
    name: string;
    slug: string;
    category: string;
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
