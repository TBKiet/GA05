const express = require("express");
const { engine } = require("express-handlebars"); // Import `engine` instead of `exphbs`
const path = require("path");
const cloudinary = require("./cloud");

const movies = [
  {
    title: "Thiên Đường Quả Báo",
    imageUrl:
      "https://res.cloudinary.com/djupm4v0l/image/upload/coeedkw4jxpyo9ojvlo6?_a=BAMCkGOa0",
    rating: 8.9,
    ageLimit: "T18",
  },
  {
    title: "Venom: Kèo Cuối",
    imageUrl:
      "https://res.cloudinary.com/djupm4v0l/image/upload/ifhpolrj9xeorwmbj8eo?_a=BAMCkGOa0",
    rating: 9.1,
    ageLimit: "T13",
  },
  {
    title: "Cô Dâu Hào Môn",
    imageUrl:
      "https://res.cloudinary.com/djupm4v0l/image/upload/film3_jo9cz2?_a=BAMCkGOa0",
    rating: 7.5,
    ageLimit: "T18",
  },
  {
    title: "Ngày Xưa Có Một Chuyện Tình",
    imageUrl:
      "https://res.cloudinary.com/djupm4v0l/image/upload/film1_skupam?_a=BAMCkGOa0",
    rating: 8.6,
    ageLimit: "T16",
  },
  {
    title: "Học Viện Anh Hùng: You're Next",
    imageUrl:
      "https://res.cloudinary.com/djupm4v0l/image/upload/up3_dvpucn?_a=BAMCkGOa0",
    rating: 9.5,
    ageLimit: "K",
  },
  {
    title: "Godzilla - 1.0",
    imageUrl:
      "https://res.cloudinary.com/djupm4v0l/image/upload/gmo_niafh7?_a=BAMCkGOa0",
    rating: 8.1,
    ageLimit: "T13",
  },
  {
    title: "Akira",
    imageUrl:
      "https://res.cloudinary.com/djupm4v0l/image/upload/akira_xfqj1o?_a=BAMCkGOa0",
    rating: 10,
    ageLimit: "T16",
  },
  {
    title: "Đi Karaoke Đi!",
    imageUrl:
      "https://res.cloudinary.com/djupm4v0l/image/upload/dkd_u8yz37?_a=BAMCkGOa0",
    rating: 10,
    ageLimit: "T13",
  },
  {
    title: "Tình Ta Đẹp Tựa Đóa Hoa",
    imageUrl:
      "https://res.cloudinary.com/djupm4v0l/image/upload/ttdtdh_wquvpf?_a=BAMCkGOa0",
    rating: 8.9,
    ageLimit: "T16",
  },
  {
    title: "Những Kẻ Bên Lề",
    imageUrl:
      "https://res.cloudinary.com/djupm4v0l/image/upload/bap_gs52cw?_a=BAMCkGOa0",
    rating: 6,
    ageLimit: "T16",
  },
  {
    title: "Cái Ác Không Tồn Tại",
    imageUrl:
      "https://res.cloudinary.com/djupm4v0l/image/upload/edne_btpv0g?_a=BAMCkGOa0",
    rating: 8,
    ageLimit: "K",
  },
  {
    title: "Mẹ À?!",
    imageUrl:
      "https://res.cloudinary.com/djupm4v0l/image/upload/mity_nigfdk?_a=BAMCkGOa0",
    rating: 7,
    ageLimit: "T13",
  },
];

const app = express();
const PORT = 3000;

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

app.get("/movie-details", (req, res) => {
  res.render("movie-details", { layout: "main"});
});

// app.get('/movies', (req, res) => {
//     res.render('movie-list', {layout: 'main'});
// });

app.get("/movies", (req, res) => {
  // Pass the movie data to the Handlebars template
  res.render("movie-list", { layout: "main", movies });
});

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
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
