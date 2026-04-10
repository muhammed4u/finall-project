export interface CategoryResponse {
    data: Category;
}

export interface Category {
    _id: string;
    name: string;
    slug: string;
    image: string;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    __v: number;
}