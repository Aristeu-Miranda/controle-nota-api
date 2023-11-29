const NoteModel = require("../models/note");
const noteController = {
    create: async (req, res) => {
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
    getAll: async (req, res) => {
        try {
            const notes = await NoteModel.find()
            res.json(notes)
        } catch (error) {
            console.log(`error: ${error}`)
        }
    }
};
module.exports = noteController;