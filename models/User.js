const mongoose = require("mongoose");
const { Schema } = mongoose;
const { noteSchema } = require("./Note")
const bcrypt = require('bcrypt')
const userSchema = new Schema({
    name: {
        type: String,
        require: true,
        unique: true,
        lowercase: true
    },
    email: {
        type: String,
        require: true,
        lowercase: true
    },
    password: {
        type: String,
        require: true,
        select: false,
    },
    notes: {
        type: [noteSchema]
    }
}, {timestamps: true});

userSchema.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

const User = mongoose.model("User", userSchema);
module.exports = User