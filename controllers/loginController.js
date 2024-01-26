const UserModel = require('../models/User');
const bcrypt = require('bcrypt')
const { serviceLogin, generateToken } = require('../service/loginService');
const loginController = async (req, res) => {
    const { name, password } = req.body;
    try {
        const user = await serviceLogin(name)
        if(!user){
           return res.status(404).send({ message: "User or password not found" })
        }
        const passwordIsValid = await bcrypt.compare(password, user.password)
        if(!passwordIsValid) {
            return res.status(400).send({ message: "User or password not found"})
        }
        const token = generateToken(user.id)
        res.send({token})
    } catch (error) {
        res.status(500).send(error.message)
    }
}

module.exports = loginController