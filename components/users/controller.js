// controller.js
const { getMovieLists } = require("../../libraries/movies/movies.service");
const { promotions } = require("./service");

const renderMovieList = async (req, res) => {
  try {
    const { showingMovieList, upcomingMovieList } = await getMovieLists();

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
