const NoteModel = require("../models/Note")
const createNewNote = (body) => NoteModel.create(body)
const countNotes = () => NoteModel.countDocuments();;
const searchByName = (name) => NoteModel.find({
    name: { $regex: `${name || ""}`, $options: "i" } //Determinando ser case insensitive
})
const findContract = (contract) => NoteModel.findOne({ contract: contract})

module.exports = { countNotes, searchByName, findContract, createNewNote };