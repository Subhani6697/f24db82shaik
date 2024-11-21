const mongoose = require("mongoose");

const bookshelveSchema = new mongoose.Schema({
  name: String,        // Name of the bookshelve
  material: String,    // Material used for the bookshelve
  shelves: Number      // Number of shelves in the bookshelve
});

module.exports = mongoose.model("Bookshelve", bookshelveSchema);