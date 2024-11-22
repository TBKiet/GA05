const Movie = require("../movies/movies.model");
const convertedMovieList = require('../movies/service.js');
// Helper function to fetch movies and categorize them
const fetchCategorizedMovies = async () => {
    const movies = await Movie.find().lean();  // Fetch movies from the database once
    return convertedMovieList.getCategorizedMovieLists(movies);  // Categorize movies
};

// Render the showing movie list page
exports.renderMovieList = async (req, res) => {
    try {
        const {showingMovieList, upcomingMovieList} = await fetchCategorizedMovies();

        // Render the 'movie-list' view and pass showing movies
        res.render("home", {
            layout: "main",
            showingMovies: showingMovieList,
            upcomingMovies: upcomingMovieList
        });
    } catch (error) {
        console.error('Error loading movies:', error);
        res.status(500).send("Error loading movies.");
    }
};


