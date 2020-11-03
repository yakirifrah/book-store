const Book = require('../models/book');

module.exports = {
  getAllBooks: async (req, res) => {
    try {
      const books = await Book.find();
      res.status(200).json({
        status: 'success',
        results: books.length,
        data: { books },
      });
    } catch (error) {
      res.status(400).json({
        status: 'fail',
        message: error,
      });
    }
  },
  deleteBookById: async (req, res) => {
    try {
      await Book.findByIdAndDelete(req.params.id);
      res.status(204).json({
        status: 'success',
        data: null,
      });
    } catch (error) {
      res.status(400).json({
        status: 'fail',
        message: error,
      });
    }
  },

  addBook: async (req, res) => {
    try {
      const newBook = await Book.create(req.body);
      res.status(201).json({
        status: 'success',
        data: { newBook },
      });
    } catch (error) {
      res.status(400).json({
        status: 'fail',
        message: 'invalid data sent!',
      });
    }
  },

  updateBookById: async (req, res) => {
    try {
      const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.status(200).json({
        status: 'success',
        data: {
          book,
        },
      });
    } catch (error) {
      res.status(400).json({
        status: 'fail',
        message: 'invalid data sent!',
      });
    }
  },
};
