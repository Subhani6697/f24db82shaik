const Bookshelf = require('../models/bookshelves');

// Function to handle the GET request to list all bookshelves
exports.getAllBookshelves = async (req, res) => {
  try {
    const results = await Bookshelf.find(); // Fetch all bookshelves from DB
    res.status(200).json(results); // Send the results as a JSON response
  } catch (err) {
    res.status(500).json({ message: "Error fetching bookshelves", error: err });
  }
};

// Function to handle the POST request to create a new bookshelf
exports.createBookshelf = async (req, res) => {
  try {
    const newBookshelf = new Bookshelf(req.body);
    await newBookshelf.save();
    res.status(201).json(newBookshelf);
  } catch (err) {
    res.status(500).json({ message: "Error creating bookshelf", error: err });
  }
};
