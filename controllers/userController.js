const { findByIdUserService, createNewUser, findEmailUser, findAllUsers, upUser, deletedUser } = require("../service/userService");
const { generateToken } = require("../service/loginService")
const userController = {
    create: async (req, res) => {
        try {
            const { name, email, password, notes } = req.body;
            if(!name || !email || !password) {
                return res.status(400).send({ message: "send all fields"})
            }
            const foundUser = await findEmailUser(email);
            if(foundUser) {
                return res.status(400).send({ message: "user allready exists"})
            }
            const user = await createNewUser(req.body).catch((error) => console.log(error.message))
            if(!user) {
                return res.status(400).send({ message: "Creating user failed"})
            }
            const token = generateToken(user.id)
            res.status(201).send({
                user: {
                    id: user.id,
                    name,
                    email,
                    notes,
                },
                token,
            })
        } catch (error) {
            console.log(`[ERROR]: Não foi possivel inserer usuário ${error}`)
        }
    },
    getAll: async (req, res) => {
        try {
            const users = await findAllUsers()
            res.json(users)
        } catch (error) {
            console.log(`Error: ${error}`)
        }
    },
    get: async (req, res) => { //pegando só com base no ID pelo 'params'
        try {
            const id = req.params.id;
            const user = await findByIdUserService(id)
            if (!user) {
                res.status(404).json({ msg: "Registro não encontrado" });
                return
            }
            res.json(user)
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
            const updateUser = await upUser(id, user)
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
            const user = await findByIdUserService(id)
            if (!user) {
                res.status(404).json({ msg: "Registro não encontrado" })
                return
            }
            await deletedUser(id)
            res.status(200).json({ msg: "Usuário removido" })
        } catch (error) {
            console.log(`error: ${error}`)
        }
    }
};
module.exports = userController