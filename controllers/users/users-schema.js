import mongoose from 'mongoose';
const schema = mongoose.Schema({
    username: String,
    password: String,
    type: String,
    bio: String,
    following: Array
}, {collection: 'users'});
export default schema;