// Import
const express = require('express');
const quotesRouter = require('./routes/quotes');
const path = require('path');
const sass = require('sass');

const app = express();
const port = 3000 || process.env.PORT;

app.use(express.json());

// Routes configuration
app.get('/', (req, res) => {
  res.render('index', { title: 'Punchline' });
});

// Server configuration
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/js_files'));

app.use('/quotes', quotesRouter);

app.listen(port, () => {
  console.log(`start here : http://localhost:${port}`);
});
