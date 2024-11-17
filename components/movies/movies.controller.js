const Movie = require("./movies.model");

// Render the movie list page
exports.renderMovieList = async (req, res) => {
  try {
    // Fetch movies from the database
    const movies = await Movie.find().lean();
    console.log(movies);
    // Render the 'movie-list' view and pass the movies
    res.render("movie-list", { layout: "main", movies });
  } catch (error) {
    res.status(500).send("Error loading movies.");
  }
};

// Render a page for adding a new movie
exports.renderAddMoviePage = (req, res) => {
  res.render("add-movie", { layout: "main" });
};
