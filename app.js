const express = require("express");
const { engine } = require("express-handlebars"); // Import `engine` instead of `exphbs`
const path = require("path");
const router = express.Router();
const cloudinary = require("./cloud");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;

const movie = require("./components/movies/movies.routes");
app.use("/movies", movie);
// Set up Handlebars view engine
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    layoutsDir: path.join(__dirname, "views", "layouts"),
    partialsDir: path.join(__dirname, "views", "partials"),
  })
);
app.set("view engine", "hbs");

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Define routes
app.get("/", (req, res) => {
  res.render("home", { layout: "main" });
});

app.get("/index", (req, res) => {
  res.render("home", { layout: "main" });
});



// app.get('/movies', (req, res) => {
//     res.render('movie-list', {layout: 'main'});
// });

// app.get("/movies", (req, res) => {
//   // Pass the movie data to the Handlebars template
//   res.render("movie-list", { layout: "main", movies });
// });

app.get("/about", (req, res) => {
  res.render("about", { layout: "main" });
});

app.get("/contact", (req, res) => {
  res.render("contact", { layout: "main" });
});
app.get("/register", (req, res) => {
  res.render("register", { layout: "main" });
});
app.get("/login", (req, res) => {
  res.render("login", { layout: "main" });
});
app.use((req, res) => {
  res.status(404).render("404", { layout: "main" });
});
// Start the server
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
  console.log("Connected to the database");
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
})
.catch(() => {
  console.log("Error connecting to the database");
});
