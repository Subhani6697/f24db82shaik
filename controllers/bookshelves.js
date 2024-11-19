var Bookshelf = require('../models/bookshelves');

// List of all Bookshelves
exports.bookshelves_list = async function (req, res) {
  try {
    // Fetch all bookshelves from the database
    const allBookshelves = await Bookshelf.find();

    // Send the list of bookshelves as a JSON response
    res.json(allBookshelves);
  } catch (err) {
    // If an error occurs, return status 500 with the error message
    res.status(500).send({ error: err.message });
  }
};

// Detail for a specific Bookshelf
exports.bookshelves_detail = async function (req, res) {
  try {
    const bookshelf = await Bookshelf.findById(req.params.id);
    if (!bookshelf) {
      return res.status(404).send({ message: 'Bookshelf not found' });
    }
    res.json(bookshelf);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

// Handle Bookshelf creation (POST)
exports.bookshelves_create_post = async function (req, res) {
  const { name, material, shelves } = req.body;

  // Validate input
  if (!name || !material || !shelves) {
    return res.status(400).json({ error: 'Name, material, and shelves are required' });
  }

  try {
    let newBookshelf = new Bookshelf({
      name,
      material,
      shelves
    });

    const result = await newBookshelf.save();
    res.status(201).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

// Handle Bookshelf delete (DELETE)
exports.bookshelves_delete = async function (req, res) {
  try {
    const bookshelf = await Bookshelf.findByIdAndDelete(req.params.id);
    if (!bookshelf) {
      return res.status(404).send({ message: 'Bookshelf not found' });
    }
    res.status(204).send(); // No content to return after successful deletion
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

// Handle Bookshelf update (PUT)
exports.bookshelves_update_put = async function (req, res) {
  const { name, material, shelves } = req.body;

  // Validate input
  if (!name || !material || !shelves) {
    return res.status(400).json({ error: 'Name, material, and shelves are required' });
  }

  try {
    const bookshelf = await Bookshelf.findByIdAndUpdate(
      req.params.id,
      { $set: { name, material, shelves } },
      { new: true } // Return the updated bookshelf
    );
    if (!bookshelf) {
      return res.status(404).send({ message: 'Bookshelf not found' });
    }
    res.json(bookshelf);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};
