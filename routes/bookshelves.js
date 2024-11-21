const express = require('express');
const router = express.Router();
const bookshelveController = require('../controllers/bookshelve');

// Routes for Bookshelve

// Get all bookshelve sites and display them on the page
router.get('/', bookshelveController.bookshelve_list);

// Render the page for creating a new bookshelve
router.get('/create', bookshelveController.bookshelve_create_Page);

// Render the page for updating an existing bookshelve
router.get('/update', bookshelveController.bookshelve_update_Page);

// Render the page to delete an existing bookshelve
router.get('/delete', bookshelveController.bookshelve_delete_Page);

// Get the details of a specific bookshelve by ID
router.get('/:id', bookshelveController.bookshelve_detail);

// Create a new bookshelve using POST request
router.post('/', bookshelveController.bookshelve_create_post);

// Update an existing bookshelve using PUT request
router.put('/:id', bookshelveController.bookshelve_update_put);

// Delete a specific bookshelve using DELETE request
router.delete('/:id', bookshelveController.bookshelve_delete);

module.exports = router;