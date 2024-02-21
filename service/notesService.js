const NoteModel = require("../models/Note")
const UserModel = require("../models/User")
const createNewNote = (body) => NoteModel.create(body)
const countNotes = () => NoteModel.countDocuments();;
const searchByName = (name) => NoteModel.find({
    name: { $regex: `${name || ""}`, $options: "i" } //Determinando ser case insensitive
})
const findContract = async (idUser, contract) => {
    const user = await UserModel.findById(idUser);
    if(!user) {
        return null;
    }
    const existingContract = user.notes.find(note => note.contract === contract);
    return existingContract;
}

module.exports = { countNotes, searchByName, findContract, createNewNote };