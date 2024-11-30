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
  const movieStates = { all: "inactive-film", showing: "inactive-film", upcoming: "inactive-film" };

    if (movieType === "showing") {
        filter = { release_date: { $lte: today }, end_date: { $gte: today } };
        movieStates.showing = "active-film";
    } else if (movieType === "upcoming") {
        filter = { release_date: { $gt: today } };
        movieStates.upcoming = "active-film";
    } else {
        movieStates.all = "active-film";
    }
  const filteredMovies = queryMovies(movieData.movies, query);
  console.log("filteredMovies", filteredMovies);
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
