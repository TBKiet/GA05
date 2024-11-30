const {
  getMovieListsByType,
} = require("../../libraries/movies/movies.service");
const { getFSMovieLists } = require("./search.service");
const renderMovieListByType = async (req, res, movieType) => {
  try {
    const movieData = await getMovieListsByType(movieType);
    const filteredMovies = getFSMovieLists(movieData ,req.query);
   
    res.render("movie-list", {
      layout: "main",
      ...filteredMovies,
    });
  } catch (error) {
    console.error("Error loading movies:", error);
    res.status(500).send("Error loading movies.");
  }
};
exports.renderMovieList = async (req, res) => {
  renderMovieListByType(req, res, "all");
};
exports.renderShowingMovieList = async (req, res) => {
  renderMovieListByType(req, res, "showing");
};
exports.renderUpcomingMovieList = async (req, res) => {
  renderMovieListByType(req, res, "upcoming");
};
