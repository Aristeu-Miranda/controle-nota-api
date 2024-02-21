const NoteModel = require("../models/Note");
const UserModel = require("../models/User");
const { countNotes, searchByName, findContract, createNewNote } = require("../service/notesService")
const noteController = {
    create: async (req, res) => { //metodo POST criando uma nova inserção
        try {
            const { name, service, contract, portion, description, date} = req.body
            if(!name || !service || !contract || !portion || !description || !date) {
                return res.status(400).send({ message: "send all fields"})
            }
            const idUser = req.userId
            const existingContract = await findContract(idUser, contract);
                if (existingContract) {
                    return res.status(400).send({ message: "register already exists" });
                 }
            const note = await createNewNote(req.body).catch((error) => console.log(error.message))
            if(!note) {
                return res.status(400).send({ message: "New register of note failed"})
            }
            
            await UserModel.findByIdAndUpdate(idUser, { $push: { notes: note } })
            res.status(201).send({ 
                note: {
                    id: note.id,
                    name,
                    service,
                    contract,
                    portion,
                    description,
                    date,
                },
                idUser,
             })
        } catch (error) {
            console.log(`Error: ${error}`)
        }
    },
    getAll: async (req, res) => { //pegando todos os dados do banco
        try {
            let {limit, offset} = req.query; //recebendo limit e offset da query
            limit = Number(limit);
            offset = Number(offset);
            //Validação se tem ou não parametros setados pelo Front
            if(!limit) {
                limit = 5;
            }
            if(!offset) {
                offset = 0;
            }
            const notes = await NoteModel.find().skip(offset).limit(limit); //Passando para a rota, os query parameters de limit e offset
            const total = await countNotes(); //contando quantas colletions
            //Verificando se a qtd de itens da query params é menor que o total de itens da colletion, para poder aplicar a paginação;
            const currentyURL = req.baseUrl;
            const next = offset + limit;
            const nextUrl = next < total ? `${currentyURL}?limit=${limit}&offset=${next}` : null //criando a nova URL
            if(notes.length === 0){
                return res.status(400).send({
                    message: "There are not notes register"
                })
            }
            //Mandando dados para no Frontend poder tratar
            res.send({
                nextUrl,
                limit,
                offset,
                total,
                
                results: notes.map((item) => ({
                    _id: item._id,
                    name: item.name,
                    service: item.service,
                    contract: item.contract,
                    portion: item.portion,
                    status: item.status,
                    date: item.date,
                }))
            })
        } catch (error) {
            console.log(`error: ${error}`)
        }
    },
    get: async (req, res) => { //pegando só com base no ID pelo 'params'
        try {
            const id = req.params.id;
            const notes = await NoteModel.findById(id)
            if (!notes) {
                res.status(404).json({ msg: "Registro não encontrado" });
                return
            }
            res.json(notes)
        } catch (error) {
            console.log(`error: ${error}`)
        }
    },
    update: async (req, res) => { //Update da NOTA
        try {
            const id = req.params.id;
            const note = {
                name: req.body.name,
                service: req.body.service,
                contract: req.body.contract,
                portion: req.body.portion,
                status: req.body.status,
                date: req.body.date,
            };
            const updateNote = await NoteModel.findByIdAndUpdate(id, note)
            if(!updateNote) {
                res.status(404).json({ msg: "Registro não encontrada" });
                return
            }
            res.status(200).json({ note, msg: "Registro atualizado" })           
        } catch (error) {
            console.log(`error: ${error}`)
        }
    },
    delete: async (req, res) => { //Delete da NOTA
        try {
            const id = req.params.id;
            const notes = await NoteModel.findById(id)
            if (!notes) {
                res.status(404).json({ msg: "Registro não encontrado" });
                return
            }
            const deletedNote = await NoteModel.findByIdAndDelete(id)
            res.status(200).json({ deletedNote, msg: "Registro removido" })
        } catch (error) {
            console.log(`error: ${error}`)
        }
    },
    getSearch: async (req, res) => {
        try {
            const {name} = req.query;
            const searchNotes = await searchByName(name);
            if(searchNotes.length === 0){
                return res.status(400).send({
                    message: "There are not notes register with this client"
                })
            }
            return res.json(searchNotes)
        } catch (error) {
            console.log(`error: ${error}`)
        }
    }
};
module.exports = noteController;