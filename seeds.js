const Todo = require('./model/todos');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/todo-list', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log('Database Connected!');
});

const seedDB = async () => {
    const todo = new Todo(
        {
            title: 'Wash car',
            description: 'Bugatti or ferrari'
        })
    await todo.save();
}

// seedDB()
//     .then(() => {
//         db.close();
//     })