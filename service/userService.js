const UserModel = require('../models/User')
const findByIdUserService = (idUser) => UserModel.findById(idUser)

module.exports = { findByIdUserService }