const { response } = require('express');
const express = require('express');
const { v4: uuidv4 } = require("uuid");
const app = express();
const port = 3000;

const lists = []
app.use(express.json());
/*
    -> id
    -> Titulo
    -> Horario
    -> date_update
    -> date_create
    -> date_end

*/
app.post("/list-todo", (req, resp) => {
    const { title, hour, dateinit } = req.body;
    const id = uuidv4();
    lists.push({
        id,
        title,
        hour,
        dateinit,
        date_create: new Date(),
    });
    return resp.status(201).send();
})

app.listen(port, () => {
    console.log(`Up server ${port}`)
})