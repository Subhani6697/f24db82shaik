var Bookshelf = require('../models/bookshelves');
// List of all Costumes
exports.bookshelves_list = async function (req, res) {
  try {
    // Fetch all potions from the database
    const allBookshelfs = await Bookshelf.find();

    // Send the list of potions as a JSON response
    res.render('bookshelves', { title: 'Bookshelf Search Results', results: allBookshelfs });
  }
  catch (err) {
    // If an error occurs, return status 500 with the error message
    res.status(500).send(`{"error": ${err}}`);
  }
};
// for a specific Bookshelves.
exports.bookshelves_detail = function (req, res) {
  res.send('NOT IMPLEMENTED: Bookshelves detail: ' + req.params.id);
};
// Handle Costume create on POST.
exports.bookshelves_create_post = async function(req, res) {
  console.log(req.body);

    let newBookshelf = new Bookshelf({
      name: req.body.name,
      material: req.body.material,
      shelves: req.body.shelves
    });
    try {
      const result = await newBookshelf.save();
      res.status(201).json(result);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  };

  // Handle Costume delete from on DELETE.
  exports.bookshelves_delete = function (req, res) {
    res.send('NOT IMPLEMENTED: Bookshelves delete DELETE ' + req.params.id);
  };
  // Handle Costume update form on PUT.
  exports.bookshelves_update_put = function (req, res) {
    res.send('NOT IMPLEMENTED: Bookshelves update PUT' + req.params.id);
  };