const mongoose = require("mongoose");
const { Schema } = mongoose;
const noteSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    service: {
        type: String,
        require: true
    },
    contract: {
        type: String,
        require: true,
        unique: true
    },
    portion: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    date: {
        type: Number,
        require: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, //Pega o ID de quem está logado.
        ref: "User",
        require: true
    }
}, {timestamps: true}); 

const Note = mongoose.model("Note", noteSchema);
module.exports = Note;