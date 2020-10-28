const mongoose = require('mongoose');

const { Schema } = mongoose;

const bookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  publisher: { type: String, required: true },
  description: { type: String, default: 'the best book ever!!' },
  price: { type: Number, required: true },
});

module.exports = mongoose.model('Book', bookSchema);
