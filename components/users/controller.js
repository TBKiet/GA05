// controller.js
const { promotions } = require("./service");
const { getMovieListsByType } = require("../../libraries/movies/movies.service");
const renderMovieList = async (req, res) => {
  try {

    const showingMovieList = (await getMovieListsByType("showing")).movies;
    const upcomingMovieList = (await getMovieListsByType("upcoming")).movies;
    res.render("home", {
      layout: "main",
      showingMovies: showingMovieList,
      upcomingMovies: upcomingMovieList,
      promotions,
    });
  } catch (error) {
    console.error("Error loading movies:", error);
    res.status(500).send("Error loading movies.");
  }
};

module.exports = { renderMovieList };
