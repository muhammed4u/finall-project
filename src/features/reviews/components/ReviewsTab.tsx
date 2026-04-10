"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faStar,
    faPen,
    faThumbsUp,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import ReviewModal from "./ReviewModal";
import { Product } from "@/features/Products/Types/Products.types";
import { deleteReviews, editReview, getReviews } from "../server/reviews.action";
import { Review } from "@/features/Profile/types/reviews.type";
import { useSelector } from "react-redux";
import { AppState } from "@/store/store";
import { toast } from "react-toastify";

export default function ReviewsTab({product , onReviewsChange}:{product:Product, onReviewsChange:(count:number) => void}) {

    const {userInfo , isAuthenticated} = useSelector((state:AppState) => state.auth)
    const currentUserId = userInfo?.id;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);

    const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
    const [editText, setEditText] = useState("");
    const [editRating, setEditRating] = useState<number>(0);
    const [updating, setUpdating] = useState(false);

    const {_id , ratingsAverage, ratingsQuantity} = product

    const handleUpdateReview = async () => {
        if (!editingReviewId) return;

        try {
            setUpdating(true);

            await editReview({
            reviewId: editingReviewId,
            values: {
                rating: editRating,
                review: editText,
            },
            });
            await fetchReviews();

            setEditingReviewId(null);
        } catch (error) {
            console.error("Failed to update review", error);
        } finally {
            setUpdating(false);
        }
        };

    const handleDeleteReview = async (reviewId: string) => {
        try {
            setLoading(true);
            await deleteReviews({ id: reviewId });
            await fetchReviews();
            toast.success("Review deleted successfully!");
        } catch (error) {
            toast.error("Failed to delete review.");
        } finally {
            setLoading(false);
    }
    };

    const fetchReviews = async () => {
        try {
            setLoading(true);
            const response = await getReviews({ id: _id });
            setReviews(response.data || []);
            onReviewsChange?.(response.data?.length || 0)
        } catch (error) {
            console.error("Failed to fetch reviews", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, [_id]);


    return (
        <div className="w-full bg-white rounded-3xl border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.06)] p-10">

        <div className="grid lg:grid-cols-3 gap-10 items-center">

            {/* Rating Card */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500 to-emerald-600 p-10 text-white shadow-xl">

            <div className="absolute inset-0 bg-white/5 backdrop-blur-xl"></div>

            <div className="relative z-10 flex flex-col items-center text-center">
                <h2 className="text-6xl font-bold tracking-tight">{ratingsAverage}</h2>

                <div className="flex text-yellow-300 mt-4 text-lg">
                {[...Array(5)].map((_, i) => (
                    <FontAwesomeIcon key={i} icon={faStar} />
                ))}
                </div>

                <p className="mt-3 text-sm text-emerald-100">
                Based on {reviews.length} verified reviews
                </p>

                <button
                onClick={() => setIsModalOpen(true)}
                className="mt-7 bg-white text-emerald-700 hover:bg-gray-100 transition-all duration-200 px-6 py-3 rounded-xl text-sm font-semibold flex items-center gap-2 shadow-md">
                <FontAwesomeIcon icon={faPen} />
                Write a Review
                </button>
            </div>
            </div>

            {/* Rating Distribution */}
            <div className="lg:col-span-2">
            <h3 className="text-xl font-semibold text-gray-900 mb-8">
                Rating Distribution
            </h3>

            <div className="space-y-5">
                {(() => {
                const counts: Record<number, number> = {5: 0, 4: 0, 3: 0, 2: 0, 1: 0};
                reviews.forEach((star) => {
                    counts[star.rating] = (counts[star.rating] || 0) + 1;
                });
                const maxCount = Math.max(...Object.values(counts), 1); 
                return [5,4,3,2,1].map((star) => {
                    const count = counts[star];
                    const width = `${Math.round((count / maxCount) * 100)}%`;
                    return (
                    <div key={star} className="flex items-center gap-6">
                        <div className="flex items-center gap-1 w-14 text-sm font-medium text-gray-700">
                        {star} <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
                        </div>
                        <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full transition-all duration-500"
                            style={{ width }}
                        />
                        </div>
                        <div className="w-10 text-sm text-gray-500 text-right">{count}</div>
                    </div>
                    );
                });
                })()}
            </div>
            </div>
        </div>
        <div className="my-14 border-t border-gray-100"></div>

        {/* ================= HEADER ================= */}
        <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-semibold text-gray-900">
            Customer Reviews
            </h3>
            <span className="text-sm text-gray-500">
            Showing {reviews.length} reviews
            </span>
        </div>

        <div>
        {loading ? (
            <p>Loading reviews...</p>
        ) : reviews.length === 0 ? (
            <p>No reviews yet.</p>
        ) : (
            <div
            className="overflow-y-auto space-y-5 pr-3 scrollbar-thin scrollbar-thumb-emerald-400 scrollbar-track-gray-100 scrollbar-thumb-rounded-full scrollbar-track-rounded-full
                        max-h-[360px] sm:max-h-[400px] md:max-h-[440px] lg:max-h-[360px]"
            >
            {reviews.map((review) => (
                <div
                key={review._id}
                className="p-5 sm:p-6 md:p-6 rounded-3xl border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white relative"
                >
                {/* Edit/Delete icons */}
                {isAuthenticated && review.user._id === currentUserId && (
                <div className="absolute top-4 right-4 flex gap-3 opacity-70 hover:opacity-100 transition">
                    <FontAwesomeIcon
                    icon={faPen}
                    className="text-gray-400 hover:text-emerald-600 cursor-pointer"
                    onClick={() => {
                        setEditingReviewId(review._id);
                        setEditText(review.review);
                        setEditRating(review.rating);
                    }}
                    />
                    <FontAwesomeIcon
                    icon={faTrash}
                    className="text-gray-400 hover:text-red-500 cursor-pointer"
                    onClick={() => handleDeleteReview(review._id)}
                    />
                </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                    {/* Avatar */}
                    <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-emerald-600 text-white flex items-center justify-center font-semibold text-lg sm:text-xl md:text-2xl shadow-md shrink-0">
                    {review.user.name[0].toUpperCase()}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">
                        <div>
                        <h4 className="font-semibold text-gray-900 text-base sm:text-lg md:text-xl">
                            {review.user.name}
                        </h4>
                        <div className="flex items-center gap-2 sm:gap-3 mt-1 flex-wrap">
                            <div className="flex text-yellow-400 text-sm sm:text-base">
                            {[...Array(review.rating)].map((_, i) => (
                                <FontAwesomeIcon key={i} icon={faStar} />
                            ))}
                            </div>
                            <span className="text-xs sm:text-sm md:text-base text-gray-400">
                            {new Date(review.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                        </div>


                    </div>

                    {/* Review Text */}
                    <div className="mt-2 sm:mt-3">
                        {editingReviewId === review._id ? (
                        <div className="mt-3 space-y-3">

                            {/* Editable Stars */}
                            <div className="flex text-yellow-400 text-lg">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <FontAwesomeIcon
                                key={star}
                                icon={faStar}
                                onClick={() => setEditRating(star)}
                                className={`cursor-pointer ${
                                    star <= editRating ? "text-yellow-400" : "text-gray-300"
                                }`}
                                />
                            ))}
                            </div>

                            <textarea
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none resize-none"
                            rows={3}
                            />

                            {/* Buttons */}
                            <div className="flex gap-3">
                            <button
                                onClick={handleUpdateReview}
                                disabled={updating}
                                className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm"
                            >
                                {updating ? "Saving..." : "Save"}
                            </button>

                            <button
                                onClick={() => setEditingReviewId(null)}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm"
                            >
                                Cancel
                            </button>
                            </div>
                        </div>
                        ) : (
                        <p className="text-gray-700 leading-relaxed text-sm sm:text-base md:text-lg">
                            {review.review}
                        </p>
                        )}
                    </div>
                    </div>
                </div>
                </div>
            ))}
            </div>
        )}
        </div>
        <ReviewModal
        productId={_id}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onReviewAdded={fetchReviews}
        />
        </div>
        
    );
};
