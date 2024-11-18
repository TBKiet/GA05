const Movie = require("./movies.model");

// Render the movie list page
exports.renderMovieList = async (req, res) => {
  try {
    // Fetch movies from the database

    const movies = await Movie.find().lean();
    // Render the 'movie-list' view and pass the movies
    res.render("movie-list", { layout: "main", movies });
  } catch (error) {
    res.status(500).send("Error loading movies.");
  }
};
exports.renderMoviePage = async (req, res) => {
  try {
    const movieId = req.params.id; // Extract the movie ID from the URL
    const movie = await Movie.findOne({id:movieId}); // Find the movie by its _id field
    if (!movie) {
      return res.status(404).render('404', { layout: 'main', message: 'Movie not found' }); // Render a 404 page
    }
    const formatDate = (dateString) => {
      const date = new Date(dateString); // Convert string to Date object
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    };
    // Render the movie-details page with the fetched movie data
    res.render('movie-details', {
      layout: 'main',...movie.toObject(),start_date: formatDate(movie.start_date),end_date: formatDate(movie.end_date)
    });
  } catch (error) {
    console.error('Error fetching movie:', error);
    res.status(500).send('Internal server errorrr');
  }
};
