export type ReviewResponse = {
    review: string;
    rating: number;
};

export interface Review {
    _id: string;
    review: string;
    rating: number;
    product: string;   
    user: ReviewUser;     
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface CreateReviewResponse {
    data: Review;
}


export interface ReviewUser {
    _id: string;
    name: string;
}

export interface PaginationMetadata {
    currentPage: number;
    numberOfPages: number;
    limit: number;
}

export interface GetReviewsResponse {
    results: number;
    metadata: PaginationMetadata;
    data: Review[];
}


export interface ReviewUser {
    _id: string;
    name: string;
}

export interface editReview {
    _id: string;
    rating: number;
    review: string;
    product: string;
    user: ReviewUser;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface SingleReviewResponse {
    data: Review;
}