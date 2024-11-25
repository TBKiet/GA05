const Movie = require("./movies.model");
let movieList = [];
let showingMovieList = [];
let upcomingMovieList = [];

function getCategorizedMovieLists(movies) {
    const today = new Date();

    const categorizedMovies = {
        movieList: [],
        showingMovieList: [],
        upcomingMovieList: []
    };

    movies.forEach(movie => {
        const movieData = movie.props.pageProps.res.movieData;
        const releaseDate = new Date(movieData.release_date);

        const movieObj = {
            id: movieData.id,
            title: movieData.name_vn,
            image_url: movieData.image,
            rating: movieData.ratings,
            age: movieData.limitage_vn,
            genre: movieData.type_name_vn, // Keep genre as a string
            country: movieData.country_name_vn
        };

        categorizedMovies.movieList.push(movieObj);

        if (releaseDate <= today) {
            categorizedMovies.showingMovieList.push(movieObj);
        } else {
            categorizedMovies.upcomingMovieList.push(movieObj);
        }
    });

    return categorizedMovies;
}

const getMovieLists = async () => {
    if (showingMovieList.length === 0 || upcomingMovieList.length === 0) {
        const movies = await Movie.find().lean();
        const categorizedMovies = getCategorizedMovieLists(movies);
        movieList = categorizedMovies.movieList;
        showingMovieList = categorizedMovies.showingMovieList;
        upcomingMovieList = categorizedMovies.upcomingMovieList;
    }
    return {movieList, showingMovieList, upcomingMovieList};
};

async function getMovieListsByType(movieType) {
    const {movieList, showingMovieList, upcomingMovieList} = await getMovieLists();
    let movies;
    let movie_type = "inactive-film";
    let showingMovie_type = "inactive-film";
    let upcomingMovie_type = "inactive-film";

    if (movieType === "all") {
        movies = movieList;
        movie_type = "active-film";
    } else if (movieType === "showing") {
        movies = showingMovieList;
        showingMovie_type = "active-film";
    } else if (movieType === "upcoming") {
        movies = upcomingMovieList;
        upcomingMovie_type = "active-film";
    }

    // Ensure genres are unique and sorted
    const genres = [...new Set(movieList.flatMap(movie => movie.genre.split(',').map(g => g.trim())))].sort();
    const ages = [...new Set(movieList.map(movie => movie.age))].sort();
    const ratings = [...new Set(movieList.map(movie => movie.rating))].sort();
    const countries = [...new Set(movieList.map(movie => movie.country))].sort();

    return {
        movies,
        genres,
        ages,
        ratings,
        countries,
        movie_type,
        showingMovie_type,
        upcomingMovie_type,
    };
}

async function getRelatedMovies(movieData) {
    try {
        const genres = movieData.type_name_vn.split(',').map((genre) => genre.trim());
        const relatedMovies = await Movie.find({
            $or: [
                {
                    $or: genres.map(genre => ({
                        "props.pageProps.res.movieData.type_name_vn": {$regex: new RegExp(`\\b${genre}\\b`, 'i')}
                    }))
                },
                // Uncomment these lines if you want to match country or limit age as well
                // { "props.pageProps.res.movieData.country_name_vn": movieData.country_name_vn }, // Match country
                // { "props.pageProps.res.movieData.limitage_vn": movieData.limitage_vn } // Match limit age
            ],
            "props.pageProps.res.movieData.id": {$ne: movieData.id} // Exclude the current movie
        }).lean();


        // Extract relevant details from relatedMovies
        const extractedMovies = relatedMovies.map((movie) => {
            if (movie.props && movie.props.pageProps && movie.props.pageProps.res) {
                const movieData = movie.props.pageProps.res.movieData;
                return {
                    id: movieData.id,
                    title: movieData.name_vn,
                    rating: movieData.ratings,
                    age: movieData.limitage_vn,
                    image_url: movieData.image
                };
            }
            return null; // Handle unexpected structure
        }).filter(Boolean); // Remove null entries
        return extractedMovies;
    } catch (error) {
        console.error(`Error fetching related movies: ${error.message}`);
        return [];
    }
}

async function getMovieById(movieId) {
    const movie = await Movie.findOne({"props.pageProps.res.movieData.id": movieId}).lean();
    const movieData = movie.props.pageProps.res.movieData;
    const relatedMovies = await getRelatedMovies(movieData);
    if (!movie) {
        return null;
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return {
        title: movieData.name_vn,
        director: movieData.director,
        actors: movieData.actor,
        country: movieData.country_name_vn,
        genre: movieData.type_name_vn,
        brief: movieData.brief_vn,
        image: movieData.image,
        trailer: movieData.trailer,
        start_date: formatDate(movieData.release_date),
        end_date: formatDate(movieData.end_date),
        rating: movieData.ratings,
        time: movieData.time,
        limitage: movieData.limitage_vn,
        language: movieData.language_vn,
        relatedMovies: relatedMovies
    };
}

module.exports = {getMovieListsByType, getMovieById, getMovieLists};