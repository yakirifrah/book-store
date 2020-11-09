const express = require('express');

const router = express.Router();
const bookController = require('../controllers/book');
const authController = require('../controllers/auth');

// /books => GET
// /addBook => POST
// /deleteBook => DELETE
// /search/:search => SEARCH by book name

router
  .get('/', bookController.getAllBooks)
  .post(
    '/',
    authController.protected,
    authController.restrictTo('admin'),
    bookController.addBook
  )
  .get('/:query', bookController.getBookByName)
  .patch(
    '/:id',
    authController.protected,
    authController.restrictTo('admin'),
    bookController.updateBookById
  )
  .delete(
    '/:id',
    authController.protected,
    authController.restrictTo('admin'),
    bookController.deleteBookById
  );

module.exports = router;
