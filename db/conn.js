const mongoose = require("mongoose");
async function main() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Conectado ao ATLAS")
    } catch (error) {
        console.log(`[ERROR] ${error}`)
    }
}
module.exports = main;