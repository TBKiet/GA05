function queryMovies(movies, query) {
  return movies.filter((movie) => {
    let matches = true;
    // Check each query parameter and match it with movie properties
    if (
      query.keyword &&
      !movie.title.toLowerCase().includes(query.keyword.toLowerCase())
    ) {
      matches = false;
    }
    if (query.genre && !movie.genre.includes(query.genre)) {
      matches = false;
    }
    if (query.age && movie.age !== query.age) {
      matches = false;
    }
    if (query.country && movie.country !== query.country) {
      matches = false;
    }
    if (query.rating && movie.rating !== query.rating) {
      matches = false;
    }
    return matches;
  });
}

function getFSMovieLists(movieData, query) {
  const filteredMovies = queryMovies(movieData.movies, query);
  return {
    movies: filteredMovies,
    genres: movieData.genres,
    ages: movieData.ages,
    ratings: movieData.ratings,
    countries: movieData.countries,
    movie_type: movieData.movie_type,
    showingMovie_type: movieData.showingMovie_type,
    upcomingMovie_type: movieData.upcomingMovie_type,
  };
}
module.exports = { getFSMovieLists };
