import mongoose from 'mongoose';
import reviewsSchema from "./reviews-schema.js";
const ReviewsModel = mongoose
    .model('ReviewModel', reviewsSchema);
export default ReviewsModel;