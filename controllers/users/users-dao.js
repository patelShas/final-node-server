import usersModel from "./users-model.js";
import reviewsModel from "../reviews/reviews-model.js";
export const findUsers = () => usersModel.find()
export const findUser = (user_name) => usersModel.findOne({username : user_name})
export const findUserByCredentials = (user_name, password) => usersModel.findOne({username : user_name, password: password})
export const createUser = (user) => usersModel.create(user)
export const updateUser = (uid, user) => reviewsModel.updateOne({_id: uid}, {$set: user})