// service.js
const Movie = require("../movies/movies.model");
const convertedMovieList = require('../movies/service.js');

let movieList = [];
let showingMovieList = [];
let upcomingMovieList = [];

const fetchCategorizedMovies = async () => {
    const movies = await Movie.find().lean();
    // show notify query on db
    // console.log('Querying database for movies');
    return convertedMovieList.getCategorizedMovieLists(movies);
};

const initializeMovieLists = async () => {
    const categorizedMovies = await fetchCategorizedMovies();
    movieList = categorizedMovies.movieList;
    showingMovieList = categorizedMovies.showingMovieList;
    upcomingMovieList = categorizedMovies.upcomingMovieList;
};

// Ensure lists are only accessible after initialization
const getMovieLists = async () => {
    if (showingMovieList.length === 0 || upcomingMovieList.length === 0) {
        await initializeMovieLists();
    }
    return {movieList, showingMovieList, upcomingMovieList};
};

module.exports = {getMovieLists};
