const express = require('express');
const router = express.Router();
const bookshelveController = require('../controllers/bookshelve');
const detail_controller = require('../controllers/detail_controller');

// Routes for Bookshelve

// Get all bookshelve sites and display them on the page
router.get('/', bookshelveController.bookshelve_list);

// Render the page for creating a new bookshelve
router.get('/detail', detail_controller.bookshelve_create_Page);
router.get('/create', detail_controller.bookshelve_create_Page);

// Render the page for updating an existing bookshelve
router.get('/update', secured, detail_controller.bookshelve_update_Page);

// Render the page to delete an existing bookshelve
router.get('/delete', detail_controller.bookshelve_delete_Page);

// Get the details of a specific bookshelve by ID
router.get('/bookshelves/:id', bookshelveController.bookshelve_detail);

// Create a new bookshelve using POST request
router.post('/bookshelves', bookshelveController.bookshelve_create_post);

// Update an existing bookshelve using PUT request
router.put('/bookshelves/:id', bookshelveController.bookshelve_update_put);

// Delete a specific bookshelve using DELETE request
router.delete('/bookshelves/:id', bookshelveController.bookshelve_delete);

module.exports = router;