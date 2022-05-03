const mongoose = require('mongoose');

const Todo = mongoose.model('todo', {
    titulo: String,
    horario: String,
    date_event: String,
    date_update: Date,
    date_create: Date,
    date_end: Date,
});

module.exports = Todo;