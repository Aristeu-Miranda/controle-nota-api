const UserModel = require('../models/User');
const findByIdUserService = (idUser) => UserModel.findById(idUser);
const createNewUser = (body) => UserModel.create(body);
const findEmailUser = (email) => UserModel.findOne({ email: email });

module.exports = { findByIdUserService, createNewUser, findEmailUser }