const NoteModel = require("../models/Note")

const countNotes = () => NoteModel.countDocuments()

module.exports = { countNotes };