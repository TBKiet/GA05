const {getMovieById} = require('../movies/service');
const {getMovieLists} = require('../users/service');
// Render the movie list page
exports.renderMovieList = async (req, res) => {
    try {
        const {movieList} = await getMovieLists();
        res.render("movie-list", {
            layout: "main",
            movies: movieList,
            showingMovie_type: "inactive-film",
            upcomingMovie_type: "inactive-film"
        });
    } catch (error) {
        console.error('Error loading movies:', error);
        res.status(500).send("Error loading movies.");
    }
};

// Render the showing movie list page
exports.renderShowingMovieList = async (req, res) => {
    try {
        const {showingMovieList} = await getMovieLists();
        res.render("movie-list", {
            layout: "main",
            movies: showingMovieList,
            showingMovie_type: "active-film",
            upcomingMovie_type: "inactive-film"
        });
    } catch (error) {
        console.error('Error loading movies:', error);
        res.status(500).send("Error loading movies.");
    }
};

// Render the upcoming movie list page
exports.renderUpcomingMovieList = async (req, res) => {
    try {
        const {upcomingMovieList} = await getMovieLists();
        res.render("movie-list", {
            layout: "main",
            movies: upcomingMovieList,
            showingMovie_type: "inactive-film",
            upcomingMovie_type: "active-film"
        });
    } catch (error) {
        console.error('Error loading movies:', error);
        res.status(500).send("Error loading movies.");
    }
};

// Render the movie details page
exports.renderMoviePage = async (req, res) => {
    try {
        const movieId = req.params.id;
        const movie = await getMovieById(movieId);

        if (!movie) {
            return res.status(404).render('404', {layout: 'main', message: 'Movie not found'});
        }
        res.render('movie-details', {layout: 'main', ...movie});
    } catch (error) {
        console.error('Error fetching movie:', error);
        res.status(500).send('Internal server error');
    }
};