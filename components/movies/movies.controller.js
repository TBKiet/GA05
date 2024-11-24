const { getMovieById } = require("../movies/service");
const { getMovieLists } = require("../users/service");

exports.renderMovieList = async (req, res) => {
  try {
    const { movieList } = await getMovieLists();

    // Ensure genres are unique and sorted
    const genres = [...new Set(movieList.flatMap(movie => movie.genre.split(',').map(g => g.trim())))].sort();
    const ages = [...new Set(movieList.map(movie => movie.age))].sort();
    const ratings = [...new Set(movieList.map(movie => movie.rating))].sort();
    const countries = [...new Set(movieList.map(movie => movie.country))].sort();

    res.render("movie-list", {
      layout: "main",
      movies: movieList, // Use filtered movies
      genres,
      ages,
      ratings,
      countries,
      showingMovie_type: "inactive-film",
      upcomingMovie_type: "inactive-film",
    });
  } catch (error) {
    console.error("Error loading movies:", error);
    res.status(500).send("Error loading movies.");
  }
};

exports.renderShowingMovieList = async (req, res) => {
  try {
    const { showingMovieList } = await getMovieLists();
    const genres = [...new Set(showingMovieList.flatMap(movie => movie.genre.split(',').map(g => g.trim())))].sort();
    const ages = [...new Set(showingMovieList.map(movie => movie.age))].sort();
    const ratings = [...new Set(showingMovieList.map(movie => movie.rating))].sort();
    const countries = [...new Set(showingMovieList.map(movie => movie.country))].sort();

    res.render("movie-list", {
      layout: "main",
      movies: showingMovieList,
      genres,
      ages,
      ratings,
      countries,
      showingMovie_type: "active-film",
      upcomingMovie_type: "inactive-film",
    });
  } catch (error) {
    console.error("Error loading movies:", error);
    res.status(500).send("Error loading movies.");
  }
};

exports.renderUpcomingMovieList = async (req, res) => {
  try {
    const { upcomingMovieList } = await getMovieLists();
    const genres = [...new Set(upcomingMovieList.flatMap(movie => movie.genre.split(',').map(g => g.trim())))].sort();
    const ages = [...new Set(upcomingMovieList.map(movie => movie.age))].sort();
    const ratings = [...new Set(upcomingMovieList.map(movie => movie.rating))].sort();
    const countries = [...new Set(upcomingMovieList.map(movie => movie.country))].sort();

    res.render("movie-list", {
      layout: "main",
      movies: upcomingMovieList,
      genres,
      ages,
      ratings,
      countries,
      showingMovie_type: "inactive-film",
      upcomingMovie_type: "active-film",
    });
  } catch (error) {
    console.error("Error loading movies:", error);
    res.status(500).send("Error loading movies.");
  }
};

exports.renderMoviePage = async (req, res) => {
  try {
    const movieId = req.params.id;
    const movie = await getMovieById(movieId);

    if (!movie) {
      return res
          .status(404)
          .render("404", { layout: "main", message: "Movie not found" });
    }
    res.render("movie-details", { layout: "main", ...movie });
  } catch (error) {
    console.error("Error fetching movie:", error);
    res.status(500).send("Internal server error");
  }
};