const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const bcrypt = require('bcrypt');
const expressLayouts = require('express-ejs-layouts');

const Todo = require('./models/todos');
const User = require('./models/user');

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
app.use(methodOverride('_method'));
app.use(expressLayouts);

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))
app.set("layout extractScripts", true)
app.set('layout', 'layouts/boilerplate.ejs');

app.get('/register', (req, res) => {
    res.render('register.ejs')
})

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    // bcrypt.hash - auto-gen a salt and hash
    const hashedPw = await bcrypt.hash(password, 10);
    const user = new User({
        username: username,
        password: hashedPw
    })
    await user.save();
    res.redirect('/todolist');
})

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

app.get('/todolist/:id/edit', async (req, res) => {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    res.render('edit.ejs', { todo })
})

app.post('/todolist/:id', async (req, res) => {
    const { id } = req.params;
    console.log(req.body)
    const todo = await Todo.findByIdAndUpdate(id, { ...req.body });
    await todo.save();
    res.redirect(`/todolist/${todo._id}`);
})

app.delete('/todolist/:id', async (req, res) => {
    const { id } = req.params;
    await Todo.findByIdAndDelete(id);
    res.redirect('/todolist');
})

app.listen(3000, () => {
    console.log('LISTENING ON PORT 3000')
})