const Movie = require("./movies.model");
// import { getMovieListToDisplay } from './service';
const convertedMovieList = require('./service.js');
// Render the movie list page
exports.renderMovieList = async (req, res) => {
    try {
        // Fetch all movies from the database
        const movies = await Movie.find().lean();

        // Chuyển đổi dữ liệu movies theo dạng bạn muốn hiển thị
        const movieList = convertedMovieList.getMovieListToDisplay(movies);

        // Render the 'movie-list' view và truyền movieList vào
        res.render("movie-list", {
            layout: "main", movies: movieList, showingMovie_type: "inactive-film", upcomingMovie_type: "inactive-film"
        });
    } catch (error) {
        console.error('Error loading movies:', error);
        res.status(500).send("Error loading movies.");
    }
};

// Render the showing movie list page
exports.renderShowingMovieList = async (req, res) => {
    try {
        // Fetch all movies from the database
        const movies = await Movie.find().lean();

        // Chuyển đổi dữ liệu movies theo dạng bạn muốn hiển thị
        const movieList = convertedMovieList.getShowingMovieListToDisplay(movies);

        // Render the 'movie-list' view và truyền movieList vào
        res.render("movie-list", {
            layout: "main", movies: movieList, showingMovie_type: "active-film", upcomingMovie_type: "inactive-film"
        });
    } catch (error) {
        console.error('Error loading movies:', error);
        res.status(500).send("Error loading movies.");
    }
};

// Render the upcoming movie list page
exports.renderUpcomingMovieList = async (req, res) => {
    try {
        // Fetch all movies from the database
        const movies = await Movie.find().lean();

        // Chuyển đổi dữ liệu movies theo dạng bạn muốn hiển thị
        const movieList = convertedMovieList.getUpcomingMovieListToDisplay(movies);

        // Render the 'movie-list' view và truyền movieList vào
        res.render("movie-list", {
            layout: "main", movies: movieList, showingMovie_type: "inactive-film", upcomingMovie_type: "active-film"
        });
    } catch (error) {
        console.error('Error loading movies:', error);
        res.status(500).send("Error loading movies.");
    }
};



// Render the movie details page
exports.renderMoviePage = async (req, res) => {
    try {
        const movieId = req.params.id; // Extract the movie ID from the URL
        const movie = await Movie.findOne({"props.pageProps.res.movieData.id": movieId}).lean(); // Find the movie by its ID

        if (!movie) {
            return res.status(404).render('404', {layout: 'main', message: 'Movie not found'}); // Render a 404 page
        }

        // Format the date
        const formatDate = (dateString) => {
            const date = new Date(dateString); // Convert string to Date object
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        };

        // Convert movie data to an object and pass it to the render function
        const movieData = movie.props.pageProps.res.movieData;
        const movieDetails = {
            title: movieData.name_vn, // Or name_en
            director: movieData.director.split(','),
            actors: movieData.actor.split(','), // Changed to actors
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
        console.log(movieDetails);
        // Render movie details page
        res.render('movie-details', {layout: 'main', ...movieDetails});
    } catch (error) {
        console.error('Error fetching movie:', error);
        res.status(500).send('Internal server error');
    }
};