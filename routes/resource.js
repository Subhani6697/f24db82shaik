// routes/resource.js
var express = require('express');
var router = express.Router();

// Import the controller for bookshelves
const bookshelvesController = require('../controllers/bookshelves');

// Route to get all bookshelves
router.get('/bookshelves', bookshelvesController.getAllBookshelves);

module.exports = router;
