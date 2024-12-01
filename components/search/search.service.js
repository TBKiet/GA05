const Movie = require('../../libraries/movies/movies.model');

async function getFSMovieLists(movieType, queryParam) {
  try {
    const query = {};
    
    // Build the query object based on queryParam
    if (queryParam.name_vn) query.name_vn = { $regex: queryParam.name_vn, $options: "i" };
    if (queryParam.type_name_vn) query.type_name_vn = queryParam.type_name_vn;
    if (queryParam.limitage_vn) query.limitage_vn = queryParam.limitage_vn;
    if (queryParam.country_name_vn) query.country_name_vn = queryParam.country_name_vn;

    let filter = {};
    const movieStates = { all: "inactive-film", showing: "inactive-film", upcoming: "inactive-film" };
    const today = new Date(); // You need to define `today` as the current date

    // Filter based on movieType
    if (movieType === "showing") {
      filter = { release_date: { $lte: today }, end_date: { $gte: today } };
      movieStates.showing = "active-film";
    } else if (movieType === "upcoming") {
      filter = { release_date: { $gt: today } };
      movieStates.upcoming = "active-film";
    } else {
      movieStates.all = "active-film";
    }

    // Fetch movies with the filter
    const movies = await Movie.find(filter).lean();

    // Function to extract unique values
    const extractUnique = (key) => [...new Set(movies.flatMap((movie) => movie[key]))].sort();

    // Fetch filtered movies
    const filteredMovies = await Movie.find(query).lean();

    return {
      movies: filteredMovies,
      genres: extractUnique("type_name_vn"),
      ages: extractUnique("limitage_vn"),
      ratings: extractUnique("ratings"),
      countries: extractUnique("country_name_vn"),
      ...movieStates, // Include movieStates
    };

  } catch (err) {
    console.error('Error fetching movie lists:', err); // Log the error
    throw new Error('Error fetching movie lists'); // Optionally rethrow the error
  }
}

module.exports = { getFSMovieLists };
