const express = require('express');
const app = express();
const path = require('path');
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

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))

app.get('/todolist', async (req, res) => {
    const todos = await Todo.find({});
    res.render('index.ejs', { todos })
})

app.get('/todolist/new', (req, res) => {
    res.render('new.ejs')
});

app.post('/todolist', (req, res) => {
    console.log(req.body)
})

app.listen(3000, () => {
    console.log('LISTENING ON PORT 3000')
})