const express = require("express");
const router = express.Router();
const movieController = require("./movies.controller");

// Routes for rendering pages
router.get("/", movieController.renderMovieList);
router.get("/add", movieController.renderAddMoviePage);

module.exports = router;