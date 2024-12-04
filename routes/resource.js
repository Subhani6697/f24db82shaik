const express = require('express');
const router = express.Router();

// Check if the user is authenticated
const secured = (req, res, next) => {
    if (req.user) {
        return next();
    }
    res.redirect("/login");
};

// Require controller modules
const api_controller = require('../controllers/api');
const bookshelveController = require('../controllers/bookshelve');

// Base API route
router.get('/', api_controller.api);

// API routes for Bookshelve
router.post('/bookshelves', bookshelveController.bookshelve_create_post);
router.get('/bookshelves', bookshelveController.bookshelve_list);
router.get('/bookshelves/all', bookshelveController.bookshelve_view_all_Page);
router.get('/bookshelves/create', secured, bookshelveController.bookshelve_create_Page);
router.get('/bookshelves/delete', secured, bookshelveController.bookshelve_delete_Page);
router.get('/bookshelves/detail', bookshelveController.bookshelve_view_one_Page);
router.get('/bookshelves/:id', bookshelveController.bookshelve_detail);
router.put('/bookshelves/:id', bookshelveController.bookshelve_update_put);
router.delete('/bookshelves/:id', bookshelveController.bookshelve_delete);
router.get('/update', secured, bookshelveController.bookshelve_update_Page);

module.exports = router;