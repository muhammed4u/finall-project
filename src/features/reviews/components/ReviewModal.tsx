"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faXmark } from "@fortawesome/free-solid-svg-icons";
import { createReview } from "../server/reviews.action";
import { toast } from "react-toastify";

interface ReviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    productId: string;
    onReviewAdded?: () => void; 
    }

    export default function ReviewModal({ isOpen, onClose, productId , onReviewAdded }: ReviewModalProps) {
        type RatingValue = 0 | 1 | 2 | 3 | 4 | 5;
        const [rating, setRating] = useState<RatingValue>(0);
        const [hover, setHover] = useState<RatingValue>(0);
        const [review, setReview] = useState("");
        const [loading, setLoading] = useState(false);


    if (!isOpen) return null;

    const ratingLabels: Record<Exclude<RatingValue, 0>, string> = {
        1: "Poor",
        2: "Fair",
        3: "Good",
        4: "Very Good",
        5: "Excellent",
    };

    const handleSubmit = async () => {
        if (!rating || !review) return;

        try {
            setLoading(true);
            await createReview({
            id: productId,
            values: {
                rating,
                review,
            },
            });
            toast.success("Review submitted successfully!");
            setRating(0);
            setReview("");
            onClose();
            onReviewAdded?.();

        } catch (error) {
            toast.error("Failed to submit review.");
        } finally {
            setLoading(false);
        }
        };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">

        <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl p-8 relative animate-[fadeIn_.3s_ease]">

            {/* Close */}
            <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
            <FontAwesomeIcon icon={faXmark} size="lg" />
            </button>

            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
            Write a Review
            </h3>

            {/* Rating */}
            <div>
            <p className="text-sm font-medium text-gray-700 mb-3">
                Your Rating
            </p>

            <div className="flex items-center gap-3">
                <div className="flex text-2xl">
                {([1, 2, 3, 4, 5] as RatingValue[]).map((star) => (
                    <FontAwesomeIcon
                    key={star}
                    icon={faStar}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                    className={`cursor-pointer transition duration-200 ${
                        star <= (hover || rating)
                        ? "text-yellow-400 scale-110"
                        : "text-gray-300"
                    }`}
                    />
                ))}
                </div>

                {rating !== 0 && (
                <span className="text-sm font-medium text-gray-600">
                    {ratingLabels[rating]}
                </span>
                )}
            </div>
            </div>

            {/* Review */}
            <div className="mt-6">
            <p className="text-sm font-medium text-gray-700 mb-3">
                Your Review
            </p>

            <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                maxLength={500}
                placeholder="Share your experience with this product..."
                className="w-full h-32 p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none resize-none text-sm"
            />

            <div className="text-xs text-gray-400 mt-2 text-right">
                {review.length}/500 characters
            </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 mt-8">
            <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition"
            >
                Cancel
            </button>

            <button
                onClick={handleSubmit}
                disabled={!rating || !review || loading}
                className={`px-6 py-2.5 rounded-xl font-medium transition ${
                    rating && review && !loading
                    ? "bg-emerald-600 text-white hover:bg-emerald-700"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
                >
                {loading ? "Submitting..." : "Submit Review"}
            </button>
            </div>
        </div>
        </div>
    );
}