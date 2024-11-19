// models/bookshelves.js
const mongoose = require('mongoose');

// Define the schema for the Bookshelf collection
const bookshelfSchema = new mongoose.Schema({
  name: String,
  material: String,
  shelves: Number
})
module.exports = mongoose.model("Bookshelf", bookshelfSchema)
