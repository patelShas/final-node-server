import reviewsModel from "./reviews-model.js";
export const findReviews = () => reviewsModel.find();
export const findReviewsByAlbum = (album_id) => reviewsModel.find({album_id: album_id});
export const findReviewsByUser = (user_name) => reviewsModel.find({reviewer: user_name});
export const findReviewsById = (rid) => reviewsModel.find({_id: rid});
export const createReview = (review) => reviewsModel.create(review);
export const deleteReview = (rid) => reviewsModel.deleteOne({_id: rid});
export const updateReview = (rid, review) => reviewsModel.updateOne({_id: rid}, {$set: review})