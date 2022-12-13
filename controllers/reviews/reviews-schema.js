import mongoose from 'mongoose';
const schema = mongoose.Schema({
    album_id: String,
    text: String,
    date: String,
    reviewer: String,
    likes: Number
}, {collection: 'reviews'});
export default schema;