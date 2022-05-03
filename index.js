const { response } = require('express');
const express = require('express');
const { v4: uuidv4 } = require("uuid");
require('./config/database');
const app = express();
const port = 3000;

let lists = []
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
app.post("/list-todo", (req, resp) => {
    const { title, hour, date_event } = req.body;
    const id = uuidv4();
    lists.push({
        id,
        title,
        hour,
        date_event,
        date_create: new Date(),
    });
    return resp.status(201).send();
})
app.get("/list-todo", (req, resp) => {
    return resp.status(201).json({ lists });
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