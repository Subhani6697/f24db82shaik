const express = require('express');
const router = express.Router();
const bookshelvesController = require('../controllers/bookshelves');

// GET request to fetch all bookshelves
router.get('/', bookshelvesController.getAllBookshelves);

// POST request to create a new bookshelf
router.post('/', bookshelvesController.createBookshelf);

module.exports = router;
