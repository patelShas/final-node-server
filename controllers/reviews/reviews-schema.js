import mongoose from 'mongoose';
const schema = mongoose.Schema({
    album_id: String,
    text: String,
    date: String,
    reviewer: String,
    score: Number,
    likes: Number
}, {collection: 'reviews'});
export default schema;