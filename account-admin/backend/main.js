const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors'); // Import thư viện CORS

// URL kết nối tới MongoDB UserDB
const url = "mongodb+srv://quockhanh41:9hNKsR08vJlurpnO@cluster0.qrnq7.mongodb.net/UserDB?retryWrites=true&w=majority&appName=Cluster0";

const PORT = 8080;
const HOSTNAME = "localhost";

const app = express();
app.use(cors());

mongoose.connect(url)
.then(() => {
    console.log("Kết nối MongoDB thành công!");
  })
.catch((err) => {
    console.error("Lỗi kết nối MongoDB:", err);
});

// Định nghĩa Schema cho collection users
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  role: String,
  data: Date,
  phone: String,
});

const userDB = mongoose.connection.useDb("UserDB");
const User = userDB.model("users", userSchema);

app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find(); 
    res.json(users); 
  } catch (err) {
    console.error("Lỗi khi lấy dữ liệu người dùng:", err);
    res.status(500).json({ error: "Lỗi server" });
  }
});

const moviesSchema = new mongoose.Schema({
    name_vn: String,
    name_en: String,
});

const movieDB = mongoose.connection.useDb("MovieDB");
const movies = movieDB.model("movies", moviesSchema);

app.get("/api/movies", async (req, res) => {
    try {
      const movie = await movies.find(); 
      res.json(movie); 
    } catch (err) {
      console.error("Lỗi khi lấy dữ liệu phim:", err);
      res.status(500).json({ error: "Lỗi server" });
    }
});
  

// Khởi chạy server
app.listen(PORT, () => {
  console.log(`Server đang chạy tại api của http://${HOSTNAME}:${PORT}`);
});
