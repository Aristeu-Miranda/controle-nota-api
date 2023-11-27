const mongoose = require("mongoose");
async function main() {
    try {
        await mongoose.connect(
            "mongodb+srv://aristeujose1999:UwN6ztpAeLMag81n@controle-notas.qrj0y0h.mongodb.net/?retryWrites=true&w=majority"
        );
        console.log("Conectado ao ATLAS")
    } catch (error) {
        console.log(`[ERROR] ${error}`)
    }
}
module.exports = main;