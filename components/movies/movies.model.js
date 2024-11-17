const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  imgUrl: { type: String, required: true },
  ageLimit: { type: String, required: true },
  rating: { type: Number, default: 0 },
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
