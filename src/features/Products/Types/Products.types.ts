export interface ProductsResponse {
    results: number;
    metadata: Metadata;
    data: Product[];
}

// Metadata
export interface Metadata {
    currentPage: number;
    numberOfPages: number;
    limit: number;
    nextPage?: number;
}

// Product
export interface Product {
    _id: string;
    id: string;
    sold: number;
    images: string[];
    subcategory: SubCategory[];
    ratingsQuantity: number;
    title: string;
    slug: string;
    description: string;
    quantity: number;
    price: number;
    priceAfterDiscount: number;
    imageCover: string;
    category: Category;
    brand: Brand;
    ratingsAverage: number;
    createdAt: string;   // ISO date string
    updatedAt: string;   // ISO date string
}

// SubCategory
export interface SubCategory {
    _id: string;
    name: string;
    slug: string;
    category: string;
}

// Category
export interface Category {
    _id: string;
    name: string;
    slug: string;
    image: string;
}

// Brand
export interface Brand {
    _id: string;
    name: string;
    slug: string;
    image: string;
}

export interface SingleProductResponse {
    data: Product;
}