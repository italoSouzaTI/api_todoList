const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/todo-list')
    .then(() => console.log('conectado ao mongoDB'))
    .catch((err) => console.error(err))