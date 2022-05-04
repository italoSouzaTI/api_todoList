const { response } = require('express');
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
    const list = await Todo.find();
    return resp.status(201).json({ list });
});
app.delete("/list-todo/:id", async (req, resp) => {
    const { id } = req.params;
    const todo = await Todo.findOne({ _id: id });
    if (!todo) {
        return resp.status(402).json({ menssage: 'Item não encontrado!' });
    }

    try {
        await Todo.deleteOne({ _id: id });
        return resp.status(201).json('Excluido com sucesso!');
    } catch (error) {
        return resp.status(500).json({ error: error });
    }

});
app.put("/list-todo/:id", async (req, resp) => {
    const { id } = req.params;
    const data = req.body
    const todo = await Todo.findOne({ _id: id });
    if (!todo) {
        return resp.status(402).json({ menssage: 'Item não encontrado!' });
    }

    try {
        await Todo.findOneAndUpdate({ _id: id }, data);
        return resp.status(201).json('Alualizado com sucesso');
    } catch (error) {
        return resp.status(500).json({ error: error });
    }

});

app.listen(port, () => {
    console.log(`Up server ${port}`)
})