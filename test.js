require('./components/auth/config/db');
const express = require('express');
const app = express();
const PORT = 3000;

const userRouter = require('./components/auth/api/user');

app.use(express.json());
app.use('/user', userRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});