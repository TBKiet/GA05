const app = require('express')();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Welcome to the Home Page');
});
app.get('/about', (req, res) => {
    res.send('About Us');
});
app.get('/contact', (req, res) => {
    res.send('Contac Us');
})


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});