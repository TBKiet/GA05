require("dotenv").config();
const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const passport = require("passport");
const {engine} = require("express-handlebars"); // Import `engine` instead of `exphbs`
const path = require("path");
const cloudinary = require("./components/cloudinary/config/cloud");
const movie = require("./libraries/movies/movies.routes");
const search = require("./components/search/search.routes");
const home = require("./components/users/routes");
const userRouter = require("./components/auth/auth.routes");
const app = express();
const PORT = 3000;

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log('Error connecting to MongoDB', err);
});

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// handle register and login form data
app.use(express.json());

// console.log(process.env.MONGODB_URI);
app.use(express.urlencoded({extended: true}));

// Set up session middleware
app.use(session({secret: 'secretKey', resave: false, saveUninitialized: false}));

// Initialize Passport and session
app.use(passport.initialize());
app.use(passport.session());

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

// Middleware to pass user information to views
app.use((req, res, next) => {
    res.locals.isAuthenticated = req.isAuthenticated();
    res.locals.username = req.user ? req.user.username : null;
    next();
});

app.use("/", userRouter);
app.use("/", home);
app.use("/movies", movie);
app.use("/search", search);

app.get("/about", (req, res) => {
    res.render("about", {layout: "main"});
});

app.get("/contact", (req, res) => {
    res.render("contact", {layout: "main"});
});
app.get("/register", (req, res) => {
    res.render("register", {layout: "main"});
});
app.get("/login", (req, res) => {
    res.render("login", {layout: "main"});
});

app.get("/logout", (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.session.destroy((err) => {
            if (err) {
                return next(err);
            }
            res.redirect("/");
        });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
