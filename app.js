const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/todo_list', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log('Database Connected!');
});

// app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))

// app.use(express.urlencoded({ extended: true }));
// app.use(methodOverride('_method'));
// app.use(express.static(path.join(__dirname, 'public')));

app.get('/todolist', (req, res) => {
    res.render('index.ejs')
})

app.listen(3000, () => {
    console.log('LISTENING ON PORT 3000')
})