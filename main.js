// Import
const express = require('express');
const quotesRouter = require('./routes/quotes');
const path = require('path');
var cors = require('cors')

const app = express();
const port = 3000 || process.env.PORT;

app.use(express.json());

// Server configuration
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/js_files'));

app.use('/quotes', cors(), quotesRouter);

app.listen(port, () => {
    console.log(`start here : http://localhost:${port}`);
});