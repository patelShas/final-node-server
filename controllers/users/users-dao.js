import usersModel from "./users-model.js";
export const findUsers = () => usersModel.find()
export const findUser = (user_name) => usersModel.findOne({username : user_name})
export const findUserByCredentials = (user_name, password) => usersModel.findOne({username : user_name, password: password})
export const createUser = (user) => usersModel.create(user)