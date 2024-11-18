const express = require("express");
const router = express.Router();
const movieController = require("./movies.controller");

// Routes for rendering pages
router.get("/", movieController.renderMovieList);
router.get("/movie-details/:id", movieController.renderMoviePage);
module.exports = router;