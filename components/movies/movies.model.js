const mongoose = require('mongoose');

// Schema for times in schedule
const TimeSchema = new mongoose.Schema({
  time: String,
  showtime_id: String,
  theater_id: String,
  theater_name_vn: String,
  theater_name_en: String,
  room_id: String,
  room_name: String,
  room_type_id: String,
  room_type_name_vn: String,
  room_type_name_en: String,
  room_type_image: String,
  private_key: String,
});

// Schema for schedule
const ScheduleSchema = new mongoose.Schema({
  date: String,
  times: [TimeSchema],
});

// Schema for dataShowTime
const DataShowTimeSchema = new mongoose.Schema({
  schedule: [ScheduleSchema],
});

// Schema for maxTicketData
const MaxTicketDataSchema = new mongoose.Schema({
  message: String,
});

// Schema for movieData
const MovieDataSchema = new mongoose.Schema({
  id: String,
  name_vn: String,
  name_en: String,
  director: String,
  actor: String,
  country_id: String,
  country_name_vn: String,
  country_name_en: String,
  formats_id: String,
  formats_name_vn: String,
  formats_name_en: String,
  type_id: String,
  type_name_vn: String,
  type_name_en: String,
  release_date: String,
  end_date: String,
  brief_vn: String,
  brief_en: String,
  image: String,
  himage: String,
  trailer: String,
  status: String,
  ratings: String,
  time: String,
  limitage_id: String,
  limitage_vn: String,
  limitage_en: String,
  language_id: String,
  language_vn: String,
  language_en: String,
  sortorder: String,
});

// Main movie schema
const MovieSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  props: {
    pageProps: {
      res: {
        movieData: MovieDataSchema,
        dataShowTime: DataShowTimeSchema,
        maxTicketData: MaxTicketDataSchema,
      },
    },
    __N_SSG: Boolean,
  },
  page: String,
  query: {
    slug: String,
  },
});
const db = mongoose.connection.useDb("MovieDB");
const Movie = db.model("movie", MovieSchema);

module.exports = Movie;
