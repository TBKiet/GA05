function getCategorizedMovieLists(movies) {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

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

module.exports = { getCategorizedMovieLists };
