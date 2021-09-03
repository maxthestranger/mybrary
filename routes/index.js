const express = require('express');
const router = express.Router();
const Book = require('../models/books');

router.get('/', async (req, res) => {
  let books;
  try {
    books = await Book.find().sort({ createdAT: 'desc' }).limit(10).exec();
  } catch {
    books = [];
  }
  res.render('index', {
    books: books,
  });
});

module.exports = router;
