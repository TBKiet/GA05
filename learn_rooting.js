const app = require('express')();
const PORT = 3000;

// bai 1
app.get('/', (req, res) => {
    res.send('Welcome to the Home Page');
});
app.get('/about', (req, res) => {
    res.send('About Us');
});
app.get('/contact', (req, res) => {
    res.send('Contac Us');
})

// bai 2
app.get('/user/:userId', (req, res) => {
    res.send('User ID: ' + req.params.userId);
});
app.get('/posts/:postId/comments/:commentId', (req, res) => {
    res.send('Post ID: ' + req.params.postId );
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});