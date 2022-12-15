import reviewsModel from "./reviews-model.js";
export const findReviews = (filter) => reviewsModel.find(filter);
export const findReviewsById = (rid) => reviewsModel.find({_id: rid});
export const createReview = (review) => reviewsModel.create(review);
export const deleteReview = (rid) => reviewsModel.deleteOne({_id: rid});
export const updateReview = (rid, review) => reviewsModel.updateOne({_id: rid}, {$set: review})