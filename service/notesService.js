const NoteModel = require("../models/Note")

const countNotes = () => NoteModel.countDocuments();;

const searchByName = (name) => NoteModel.find({
    name: { $regex: `${name || ""}`, $options: "i" } //Determinando ser case insensitive
})

module.exports = { countNotes, searchByName };