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
    const { title, horario, date_event } = req.body;
    const lists = {
        title,
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

})
app.get("/list-todo", async (req, resp) => {
    const list = await Todo.find();
    return resp.status(201).json({ list });
})
app.delete("/list-todo/:id", (req, resp) => {
    const { id } = req.params;
    console.log(id)
    const newArray = lists.filter(item => item.id != id);
    // console.log(newArray)
    lists = newArray;
    return resp.status(201).send();
})
app.put("/list-todo/:id", (req, resp) => {
    const { id } = req.params;
    const data = req.body
    const newArray = lists.find(item => item.id === id);
    // const ArrayPosition = lists.indexOf(id);
    console.log(newArray);

    // Object.keys(data).forEach(el=>{
    //     console.log(data[el])
    // })
    // lists = newArray;
    // return resp.status(201).send();
})

app.listen(port, () => {
    console.log(`Up server ${port}`)
})