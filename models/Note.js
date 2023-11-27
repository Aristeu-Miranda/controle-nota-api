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
        require: true
    },
    portion: {
        type: String,
        require: true
    },
    status: {
        type: String,
        require: true
    },
    date: {
        type: Number,
        require: true
    },
}, {timestamps: true}); 

const Note = mongoose.model("Note", noteSchema);
module.exports = Note;