const mongoose = require('mongoose');
const { image } = require('../../cloud');

const movieSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  rating: { type: Number, required: true },
  age: { type: String, required: true },
  duration: { type: Number, required: true },
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
  trailer_url: { type: String, required: true },
  actors: { type: [String], required: true },
  genre: { type: [String], required: true },
  image_url: { type: String, required: true },
  director: { type: [String], default: null },
  production: { type: [String], default: null }, 
  country: { type: String, default: null },
});

const Movie = mongoose.model('movie', movieSchema);

module.exports = Movie;
