const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

const Todo = require('./model/todos');

mongoose.connect('mongodb://localhost:27017/todo-list', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Mongo connection error"));
db.once("open", () => {
    console.log('Mongo Database Connected!');
});

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))

app.get('/todolist', async (req, res) => {
    const todos = await Todo.find({});
    res.render('index.ejs', { todos })
})

app.get('/todolist/new', (req, res) => {
    res.render('new.ejs')
});

app.post('/todolist', async (req, res) => {
    const newTodo = new Todo(req.body);
    await newTodo.save();
    console.log(newTodo);
    res.redirect('/todolist');
})

app.get('/todolist/:id', async (req, res) => {
    const { id } = req.params;
    const todo = await Todo.findById(id)
    res.render('show.ejs', { todo })
})

app.listen(3000, () => {
    console.log('LISTENING ON PORT 3000')
})