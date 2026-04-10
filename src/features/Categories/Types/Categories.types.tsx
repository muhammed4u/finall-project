    export interface CategoriesResponse {
    results: number;
    metadata: Metadata;
    data: Category[];
    }

    export interface Metadata {
    currentPage: number;
    numberOfPages: number;
    limit: number;
    }

    export interface Category {
    _id: string;
    name: string;
    slug: string;
    image: string;
    createdAt: string;   // ISO date string
    updatedAt: string;   // ISO date string
    }
