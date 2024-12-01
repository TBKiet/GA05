const express = require("express");
const mongoose = require('mongoose');

const url = 'mongodb+srv://quockhanh41:9hNKsR08vJlurpnO@cluster0.qrnq7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const PORT = 8080;
const HOSTNAME = "localhost"

app = express();

mongoose.connect(url);
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    role: String
  });

  const User = mongoose.model('User', userSchema);
  const users = User.find();  
  console.log(users)

app.get("/api/users", (req, res) => {
    res.json(users)
});

app.listen(PORT, (res, req) => {
    console.log(`Server is running at http://localhost:${PORT}`);
})