// service.js
const Movie = require("../movies/movies.model");
const convertedMovieList = require('../movies/service.js');

let movieList = [];
let showingMovieList = [];
let upcomingMovieList = [];
const promotions = [
    {
        image_url: "https://iguov8nhvyobj.vcdn.cloud/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/o/n/onl_980x448_roliing.png",
        title: "Promotion 1",
        href: "/movies/"
    },
    {
        image_url: "https://iguov8nhvyobj.vcdn.cloud/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/r/o/rolling_1.png",
        title: "Promotion 2",
        href: "/movies/movie-details/961d735e-3657-427d-b633-d1e02732e349"
    },
    {
        image_url: "https://iguov8nhvyobj.vcdn.cloud/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/w/k/wkd_gcpro_980x448_1_-min.jpg",
        title: "Promotion 3",
        href: "/movies/movie-details/5dd87e2f-b06b-49fc-9a35-5aa93deb28ee"
    },
    {
        image_url: "https://iguov8nhvyobj.vcdn.cloud/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/r/o/rolling_1.png",
        title: "Promotion 4",
        href: "/movies/movie-details/961d735e-3657-427d-b633-d1e02732e349"
    },
    {
        image_url: "https://iguov8nhvyobj.vcdn.cloud/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/9/8/980x448_32_.jpg",
        title: "Promotion 5",
        href: "/movies/movie-details/5dd87e2f-b06b-49fc-9a35-5aa93deb28ee"
    }
    // Add more promotions as needed
];
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

module.exports = {getMovieLists, promotions};
