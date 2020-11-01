const mongoose = require('mongoose');
const Publisher = require('./publisher');
const Author = require('./author');

const { Schema } = mongoose;
const bookSchema = new Schema({
  title: { type: String, required: true },
  author: Author,
  publisher: Publisher,
  description: { type: String, default: 'the best book ever!!' },
  price: { type: Number, required: true },
  imageURL: String,
});

module.exports = mongoose.model('Book', bookSchema);
