import mongoose from 'mongoose';
import usersSchema from "./users-schema.js";
const UsersModel = mongoose.model('UserModel', usersSchema)
export default UsersModel