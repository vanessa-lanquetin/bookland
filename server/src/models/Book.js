const mongoose = require('mongoose')
const schema = new mongoose.Schema({
  title: String,
  author: String,
  rating: Number,
  summary: String,
  review: String,
  category: String,
  image: String
});
module.exports = mongoose.model("Book", schema);
