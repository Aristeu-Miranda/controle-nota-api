const UserModel = require('../models/User')
const jwt = require('jsonwebtoken');
require('dotenv').config()

const serviceLogin = (name) => UserModel.findOne({ name: name}).select("+password")
const generateToken = (id) => jwt.sign({ id: id }, process.env.SECRET_JWT, { expiresIn: 10800 })

module.exports = { serviceLogin, generateToken };