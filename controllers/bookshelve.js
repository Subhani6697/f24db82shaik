const Bookshelve = require('../models/bookshelve');

exports.bookshelve_list = async function (req, res) {
    try {
        const bookshelves = await Bookshelve.find();
        res.send(bookshelves);
    } catch (err) {
        res.status(500);
        res.send({ "error": err.message });
    }
};

exports.bookshelve_view_all_Page = async function (req, res) {
    try {
        results = await Bookshelve.find();  // Fetch all bookshelves from the DB
        res.render('bookshelves', { title: 'Book Shelve', results: results });  // Render the view with results
    } catch (err) {
        res.status(500).send(`{"error": ${err}}`);  // Handle errors and send a response
    }
};

// For a specific Bookshelve
exports.bookshelve_detail = async function (req, res) {
    console.log("Detail of Bookshelve with ID:", req.params.id);
    try {
        const result = await Bookshelve.findById(req.params.id);
        if (!result) {
            res.status(404).send(`{"error": "Bookshelve document for ID ${req.params.id} not found"}`);
        } else {
            res.send(result);
        }
    } catch (error) {
        res.status(500).send(`{"error": "Error retrieving document for ID ${req.params.id}: ${error.message}"}`);
    }
};

// Handle Bookshelve create on POST
exports.bookshelve_create_post = async function (req, res) {
    console.log(req.body)
    let document = new Bookshelve();
    document.name = req.body.name;
    document.material = req.body.material;
    document.shelves = req.body.shelves;
    try {
        let result = await document.save();
        res.send(result);
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};

// Handle building the view for deleting a bookshelve.
// Query provides the ID
// Render the delete view for a bookshelve
exports.bookshelve_delete_Page = async function (req, res) {
    try {
        // Find the bookshelve by ID
        const shelve = await Bookshelve.findById(req.query.id);

        if (!shelve) {
            return res.status(404).json({ error: `Bookshelve with ID ${req.query.id} not found` });
        }

        // Render the delete page with the bookshelve data
        res.status(200).render('bookshelvedelete', { title: 'Bookshelve Delete', toShow: shelve });
    } catch (err) {
        // Handle errors, send a 500 error response if there is an issue
        console.error(err);
        res.status(500).json({ error: `Error fetching bookshelve: ${err.message}` });
    }
};

// Handle the deletion of a bookshelve
exports.bookshelve_delete = async function (req, res) {
    try {
        // Delete the bookshelve by ID
        const result = await Bookshelve.findByIdAndDelete(req.params.id);

        if (!result) {
            return res.status(404).json({ error: `Bookshelve with ID ${req.params.id} not found` });
        }

        // Send a success message if the deletion is successful
        res.status(200).json({ message: `Bookshelve with ID ${req.params.id} deleted successfully` });
    } catch (err) {
        // Handle errors during deletion
        console.error("Error deleting shelve:", err);
        res.status(500).json({ error: `Error deleting bookshelve: ${err.message}` });
    }
};

// Handle Bookshelve update form on PUT.
exports.bookshelve_update_put = async function (req, res) {
    console.log(`Updating Bookshelve with ID: ${req.params.id} and data: ${JSON.stringify(req.body)}`);
    try {
        let toUpdate = await Bookshelve.findById(req.params.id);

        // Update fields if they are present in the request body
        if (req.body.shelve_name) toUpdate.shelve_name = req.body.shelve_name;
        if (req.body.location) toUpdate.location = req.body.location;
        if (req.body.year_established) toUpdate.year_established = req.body.year_established;

        // Checkbox example: converting undefined to false if unchecked
        toUpdate.is_famous = req.body.checkbox_famous ? true : false;

        let result = await toUpdate.save();
        console.log("Update successful:", result);
        res.send(result);
    } catch (err) {
        console.error("Error updating document:", err);
        res.status(500).send(`{"error": "Update for ID ${req.params.id} failed: ${err.message}"}`);
    }
};

exports.bookshelve_update_post = async function(req, res) {
    try {
        // Try updating the bookshelve
        const updatedShelve = await Bookshelve.findByIdAndUpdate(req.body.id, req.body, { new: true, runValidators: true });

        if (!updatedShelve) {
            return res.status(404).json({ error: 'Bookshelve not found' });
        }

        // Return a success message if the update is successful
        res.status(200).json({ message: 'Update succeeded', updatedShelve });
    } catch (err) {
        // Check if the error is a validation error
        if (err.name === 'ValidationError') {
            // Send back the validation error details to the client
            return res.status(400).json({ error: `Validation failed: ${err.message}` });
        }

        // Handle other types of errors
        res.status(500).json({ error: `Internal server error: ${err.message}` });
    }
};

// Handle displaying one Bookshelve by ID
exports.bookshelve_view_one_Page = async function (req, res) {
    console.log("Single view for ID:", req.query.id);
    try {
        const result = await Bookshelve.findById(req.query.id);
        if (!result) {
            res.status(404).send(`{"error": "Bookshelve with ID ${req.query.id} not found"}`);
        } else {
            res.render('bookshelveDetail', {
                title: 'Bookshelve Detail',
                toShow: result
            });
        }
    } catch (err) {
        res.status(500).send(`{'error': '${err}'}`);
    }
};

// Handle building the view for creating a bookshelve
exports.bookshelve_create_Page = function (req, res) {
    console.log("create view");
    try {
        res.render('bookshelvecreate', { title: 'Bookshelve Create' });
    } catch (err) {
        res.status(500);
        res.send(`{'error': '${err}'}`);
    }
};

// Handle building the view for updating a bookshelve.
// Query provides the id.
exports.bookshelve_update_Page = async function(req, res) {
    console.log("Update view for bookshelve with ID " + req.query.id);
    try {
        let result = await Bookshelve.findById(req.query.id);
        res.render('bookshelveupdate', { title: 'Bookshelve Update', toShow: result });
    } catch (err) {
        if (err.name === 'ValidationError') {
            // If it's a validation error, render the page with the error message
            res.render('bookshelveupdate', {
                title: 'Bookshelve Update',
                message: `Error: ${err.message}`,
                toShow: req.body // Preserve any previously entered data in the form
            });
        } else {
            // Handle other types of errors
            res.status(500).send(`{"error": "${err}"}`);
        }
    }
};