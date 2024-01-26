const express = require("express");
const cors = require("cors");
const app = express();
require('dotenv').config()

app.use(cors()); //uso do cors para não ter problemas de rotas;
app.use(express.json()); //usando o express para ler arquivos JSON;

//Conexão ao Mongo ATLAS
const conn = require("./db/conn")
conn();

//Rotas
const routes = require("./routes/router");
app.use(routes)

//Iniciando o servidor express

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log("Server online!")
    console.log(`Conectado na porta ${port}`)
})
