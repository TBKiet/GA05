const Movie = require("./movies.model");

function getCategorizedMovieLists(movies) {
    const today = new Date();

    // Initialize categorized movie lists
    const categorizedMovies = {
        movieList: [],
        showingMovieList: [],
        upcomingMovieList: []
    };

    movies.forEach(movie => {
        const movieData = movie.props.pageProps.res.movieData;
        const releaseDate = new Date(movieData.release_date);

        // Convert movie data to desired format
        const movieObj = {
            id: movieData.id,
            title: movieData.name_vn, // Or movieData.name_en based on language
            image_url: movieData.image,
            rating: movieData.ratings,
            age: movieData.limitage_vn
        };

        // Add to movieList
        categorizedMovies.movieList.push(movieObj);

        // Check if movie is showing or upcoming and add to the corresponding list
        if (releaseDate <= today) {
            categorizedMovies.showingMovieList.push(movieObj);
        } else {
            categorizedMovies.upcomingMovieList.push(movieObj);
        }
    });

    return categorizedMovies;
}

async function getMovieById(movieId) {
    const movie = await Movie.findOne({"props.pageProps.res.movieData.id": movieId}).lean();

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

    const movieData = movie.props.pageProps.res.movieData;
    return {
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
};
module.exports = {getCategorizedMovieLists, getMovieById};
