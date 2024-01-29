const UserModel = require('../models/User');
const userController = {
    create: async (req, res) => {
        try {
            const user = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                notes: req.body.notes
            }
            const response = await UserModel.create(user);
            res.status(201).json({ response, msg: "Usuário criado com sucesso!" })
        } catch (error) {
            console.log(`[ERROR]: Não foi possivel inserer usuário ${error}`)
        }
    },
    getAll: async (req, res) => {
        try {
            const users = await UserModel.find()
            res.json(users)
        } catch (error) {
            console.log(`Error: ${error}`)
        }
    },
    get: async (req, res) => { //pegando só com base no ID pelo 'params'
        try {
            const id = req.params.id;
            const users = await UserModel.findById(id)
            if (!users) {
                res.status(404).json({ msg: "Registro não encontrado" });
                return
            }
            res.json(users)
        } catch (error) {
            console.log(`error: ${error}`)
        }
    },
    update: async (req, res) => {
        try {
            const id = req.params.id;
            const user = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            };
            const updateUser = await UserModel.findByIdAndUpdate(id, user)
            if(!updateUser) {
                res.status(404).json({ msg: "Registro não encontrado" });
                return
            }
            res.status(200).json({ user, msg: "Usuário atualizado" })
        } catch (error) {
            console.log(`error: ${error}`)
        }
    },
    delete: async (req, res) => {
        try {
            const id = req.params.id;
            const users = await UserModel.findById(id);
            if (!users) {
                res.status(404).json({ msg: "Registro não encontrado" })
                return
            }
            const deleteUser = await UserModel.findByIdAndDelete(id)
            res.status(200).json({ deleteUser, msg: "Usuário removido" })
        } catch (error) {
            console.log(`error: ${error}`)
        }
    }
};
module.exports = userController