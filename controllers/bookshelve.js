const Bookshelve = require('../models/bookshelve');

// Controller function to handle the creation of a new bookshelve
exports.bookshelve_create_post = async (req, res) => {
  let bookshelve = new Bookshelve();
  bookshelve.name = req.body.name;
  bookshelve.material = req.body.material;
  bookshelve.shelves = req.body.shelves;
  
  try {
    const result = await bookshelve.save();
    res.send(result);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// Controller function to list all bookshelves
exports.bookshelve_list = async (req, res) => {
  try {
    const bookshelves = await Bookshelve.find();
    res.json(bookshelves);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// Controller function to view a single bookshelve by ID
exports.bookshelve_detail = async (req, res) => {
  try {
    const bookshelve = await Bookshelve.findById(req.params.id);
    if (!bookshelve) {
      return res.status(404).send({ message: "Bookshelve not found" });
    }
    res.json(bookshelve);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// Controller function for updating a bookshelve
exports.bookshelve_update_put = async (req, res) => {
  try {
    const bookshelve = await Bookshelve.findById(req.params.id);
    if (!bookshelve) {
      return res.status(404).send({ message: "Bookshelve not found" });
    }

    bookshelve.name = req.body.name || bookshelve.name;
    bookshelve.material = req.body.material || bookshelve.material;
    bookshelve.shelves = req.body.shelves || bookshelve.shelves;

    const result = await bookshelve.save();
    res.send(result);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// Controller function for deleting a bookshelve
exports.bookshelve_delete = async (req, res) => {
  try {
    const result = await Bookshelve.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).send({ message: "Bookshelve not found" });
    }
    res.send({ message: "Bookshelve deleted successfully" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// Controller function to render the bookshelve create page
exports.bookshelve_create_Page = (req, res) => {
  res.render('bookshelvecreate', { title: 'Create Bookshelve' });
};

// Controller function to render the bookshelve update page
exports.bookshelve_update_Page = async (req, res) => {
  try {
    const bookshelve = await Bookshelve.findById(req.query.id);
    if (!bookshelve) {
      return res.status(404).send({ message: "Bookshelve not found" });
    }
    res.render('bookshelveupdate', { title: 'Update Bookshelve', toShow: bookshelve });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// Controller function to render the bookshelve delete page
exports.bookshelve_delete_Page = async (req, res) => {
  try {
    const bookshelve = await Bookshelve.findById(req.query.id);
    if (!bookshelve) {
      return res.status(404).send({ message: "Bookshelve not found" });
    }
    res.render('bookshelvedelete', { title: 'Delete Bookshelve', toShow: bookshelve });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};