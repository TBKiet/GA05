function queryMovies(movies, query) {
  return movies.filter((movie) => {
    let matches = true;
    // Check each query parameter and match it with movie properties
    if (
      query.keyword &&
      !movie.name_vn.toLowerCase().includes(query.keyword.toLowerCase())
    ) {
      matches = false;
    }
    if (query.genre && !movie.type_name_vn.includes(query.genre)) {
      matches = false;
    }
    if (query.age && movie.limitage_vn !== query.age) {
      matches = false;
    }
    if (query.country && movie.country_name_vn !== query.country) {
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
    all: movieData.all,
    showing: movieData.showing,
    upcoming: movieData.upcoming,
  };
}
module.exports = { getFSMovieLists };
