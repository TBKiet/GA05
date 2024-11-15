const express = require('express');
const {engine} = require('express-handlebars'); // Import `engine` instead of `exphbs`
const path = require('path');

const app = express();
const PORT = 3000;

// Set up Handlebars view engine
app.engine('hbs', engine({
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'views', 'partials'),
}));
app.set('view engine', 'hbs');

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Define routes
app.get('/', (req, res) => {
    res.render('home', {layout: 'main'});
});

app.get('/index', (req, res) => {
    res.render('home', {layout: 'main'});
});

app.get('/movies', (req, res) => {
    res.render('movie-list', {layout: 'main'});
});

app.get('/about', (req, res) => {
    res.render('about', {layout: 'main'});
});

app.get('/register', (req, res) => {
    res.render('register', {layout: 'main'});
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
