const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const ejsMate = require('ejs-mate');
const todos = require('./todos');
const path = require('path');

mongoose.connect('mongodb://localhost:27017/todo-list', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log('Database Connected!');
});

const app = express();

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.get('/todos', (req, res) => {
    res.send('Welcome!')
})

app.listen(3000, () => {
    console.log('LISTENING ON PORT 3000')
})