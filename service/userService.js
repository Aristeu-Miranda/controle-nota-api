const UserModel = require('../models/User');
const findAllUsers = () => UserModel.find();
const findByIdUserService = (idUser) => UserModel.findById(idUser);
const createNewUser = (body) => UserModel.create(body);
const findEmailUser = (email) => UserModel.findOne({ email: email });
const upUser = (id, body) => UserModel.findByIdAndUpdate(id, body);
const deletedUser = (id) => UserModel.findByIdAndDelete(id);

module.exports = { findByIdUserService, createNewUser, findEmailUser, findAllUsers, upUser, deletedUser }