// models/bookshelves.js
const mongoose = require('mongoose');

// Define the schema for the Bookshelf collection
const bookshelfSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  material: {
    type: String,
    required: true
  },
  shelves: {
    type: Number,
    required: true
  }
});

// Create the model for the Bookshelf collection
const Bookshelf = mongoose.model('Bookshelf', bookshelfSchema);

module.exports = Bookshelf;
