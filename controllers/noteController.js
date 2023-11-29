const NoteModel = require("../models/note");
const noteController = {
    create: async (req, res) => { //metodo POST criando uma nova inserção
        try {
            const note = {
                name: req.body.name,
                service: req.body.service,
                contract: req.body.contract,
                portion: req.body.portion,
                status: req.body.status,
                date: req.body.date,
            };

            const response = await NoteModel.create(note);
            res.status(201).json({ response, msg: "Registro de nota cadastrada com sucesso!" })
        } catch (error) {
            console.log(`Error: ${error}`)
        }
    },
    getAll: async (req, res) => { //pegando todos os dados do banco
        try {
            const notes = await NoteModel.find()
            res.json(notes)
        } catch (error) {
            console.log(`error: ${error}`)
        }
    },
    get: async (req, res) => { //pegando só com base no ID pelo 'params'
        try {
            const id = req.params.id;
            const notes = await NoteModel.findById(id)
            if (!notes) {
                res.status(404).json({ msg: "Registro não encontrado" });
                return
            }
            res.json(notes)
        } catch (error) {
            console.log(`error: ${error}`)
        }
    },
    update: async (req, res) => {
        try {
            const id = req.params.id;
            const note = {
                name: req.body.name,
                service: req.body.service,
                contract: req.body.contract,
                portion: req.body.portion,
                status: req.body.status,
                date: req.body.date,
            };
            const updateNote = await NoteModel.findByIdAndUpdate(id, note)
            if(!updateNote) {
                res.status(404).json({ msg: "Registro não encontrada" });
                return
            }
            res.status(200).json({ note, msg: "Registro atualizado" })           
        } catch (error) {
            console.log(`error: ${error}`)
        }
    },
    delete: async (req, res) => {
        try {
            const id = req.params.id;
            const notes = await NoteModel.findById(id)
            if (!notes) {
                res.status(404).json({ msg: "Registro não encontrado" });
                return
            }
            const deletedNote = await NoteModel.findByIdAndDelete(id)
            res.status(200).json({ deletedNote, msg: "Registro removido" })
        } catch (error) {
            console.log(`error: ${error}`)
        }
    }
};
module.exports = noteController;