const UserModel = require('../models/User')

const loginService = (name) => UserModel.findOne({ name: name}).select("+password")

module.exports = loginService