const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors()); //uso do cors para não ter problemas de rotas;
app.use(express.json()); //usando o express para ler arquivos JSON;

//Conexão ao Mongo ATLAS
const conn = require("./db/conn")
conn();

//Rotas
const routes = require("./routes/router");
app.use("/api", routes)

//Iniciando o servidor express
app.listen(3000, () => {
    console.log("Server online!")
})
