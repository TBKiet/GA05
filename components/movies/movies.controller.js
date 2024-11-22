const Movie = require("./movies.model");
const convertedMovieList = require('./service.js');

// Helper function to fetch movies and categorize them
const fetchCategorizedMovies = async () => {
    const movies = await Movie.find().lean();  // Fetch movies from the database once
    return convertedMovieList.getCategorizedMovieLists(movies);  // Categorize movies
};

// Render the movie list page
exports.renderMovieList = async (req, res) => {
    try {
        const {movieList} = await fetchCategorizedMovies();

        // Render the 'movie-list' view and pass categorized lists
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
        const {showingMovieList} = await fetchCategorizedMovies();

        // Render the 'movie-list' view and pass showing movies
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
        const {upcomingMovieList} = await fetchCategorizedMovies();

        // Render the 'movie-list' view and pass upcoming movies
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
        const movie = await Movie.findOne({"props.pageProps.res.movieData.id": movieId}).lean();

        if (!movie) {
            return res.status(404).render('404', {layout: 'main', message: 'Movie not found'});
        }

        const formatDate = (dateString) => {
            const date = new Date(dateString);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        };

        const movieData = movie.props.pageProps.res.movieData;
        const movieDetails = {
            title: movieData.name_vn,
            director: movieData.director.split(','),
            actors: movieData.actor.split(','),
            country: movieData.country_name_vn,
            genre: movieData.type_name_vn.split(','),
            brief: movieData.brief_vn,
            image: movieData.image,
            trailer: movieData.trailer,
            start_date: formatDate(movieData.release_date),
            end_date: formatDate(movieData.end_date),
            rating: movieData.ratings,
            time: movieData.time,
            limitage: movieData.limitage_vn,
            language: movieData.language_vn,
        };

        res.render('movie-details', {layout: 'main', ...movieDetails});
    } catch (error) {
        console.error('Error fetching movie:', error);
        res.status(500).send('Internal server error');
    }
};
