const { response } = require('express');
const { request } = require('express');
const express = require('express');
require('./src/config/database');
const app = express();
const port = 3000;

const Todo = require('./src/models/Todo')

app.use(express.json());
/*
    -> id
    -> Titulo
    -> Horario
    -> date_event
    -> date_update
    -> date_create
    -> date_end
*/
//Middeleware
async function validateTodo (req, resp, next) {
    const { id } = req.params;
    let todo = null;
    try {
        todo = await Todo.findOne({ _id: id });
        console.log()
    } catch (error) {
        return resp.status(500).json({ menssage: 'Item invalido' });
    }
    if (!todo) {
        return resp.status(402).json({ menssage: 'Item não encontrado' });
    }
    request.id = id;
    return next();
}
app.post("/list-todo", async (req, resp) => {
    const { titulo, horario, date_event } = req.body;
    const lists = {
        titulo,
        horario,
        date_event,
        date_create: new Date(),
    };
    try {
        await Todo.create(lists)
        return resp.status(201).json('Registrado');
    } catch (error) {
        return resp.status(500).json({ error: error });
    }
});
app.get("/list-todo", async (req, resp) => {
    const list = await Todo.find({ date_end: null });
    return resp.status(201).json({ list });
});
app.delete("/list-todo/:id", validateTodo, async (req, resp) => {
    const { id } = request;
    try {
        //EXCLUSÃO DO LOGICA
        await Todo.findOneAndUpdate({ _id: id }, { date_end: new Date() });
        //EXCLUSÃO DO BANCO
        // await Todo.deleteOne({ _id: id });
        return resp.status(201).json('Excluido com sucesso!');
    } catch (error) {
        return resp.status(500).json({ error: error });
    }

});
app.put("/list-todo/:id", validateTodo, async (req, resp) => {
    const { id } = request;
    const data = req.body
    try {
        await Todo.findOneAndUpdate({ _id: id }, data);
        return resp.status(201).json('Atualizado com sucesso');
    } catch (error) {
        return resp.status(500).json({ error: error });
    }

});

app.listen(port, () => {
    console.log(`Up server ${port}`)
})