// Import
const express = require('express');
const path = require('path');
const sass = require('sass');

const app = express();

const {
    PORT = 3000,
        NODE_ENV = 'development',
} = process.env

// Server configuration
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/js_files'))
app.listen(PORT, () => console.log('http://localhost:${PORT}'))

// Routes configuration
app.get('/', (req, res) => {
    res.render('index', { title: 'Punchline' })
})