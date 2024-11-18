const express = require("express");
const router = express.Router();
const movieController = require("./movies.controller");

// Routes for rendering pages
router.get("/", movieController.renderMovieList);
router.get("/:mv-name", movieController.renderAddMoviePage);

module.exports = router;