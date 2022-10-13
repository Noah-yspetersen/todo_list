const Todo = require('../model/todos');
const mongoose = require('mongoose');
const { titles, descriptions } = require('./seedhelpers');
const todos = require('../model/todos');

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
    await todos.deleteMany();
    for (let i = 0; i < 14; i++) {
        const rand14 = Math.floor(Math.random() * 14);
        const rand3 = Math.floor(Math.random() * 3);
        const todo = new Todo(
            {
                title: `${titles[rand14]}`,
                description: `${descriptions[rand3]}`
            })
        await todo.save();
    }
}

seedDB()
    .then(() => {
        db.close();
    })