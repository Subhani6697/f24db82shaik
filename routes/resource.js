const express = require('express');
const router = express.Router();

// Require controller modules
const api_controller = require('../controllers/api');
const bookshelveController = require('../controllers/bookshelve');

// Base API route
router.get('/', api_controller.api);

// API routes for Bookshelve Sites
router.post('/bookshelveSites', bookshelveController.bookshelve_create_post);
router.get('/bookshelveSites', bookshelveController.bookshelve_list);
router.get('/bookshelveSites/all', bookshelveController.bookshelve_view_all_Page);
router.get('/bookshelveSites/create', bookshelveController.bookshelve_create_Page);
router.get('/bookshelveSites/detail', bookshelveController.bookshelve_view_one_Page);
router.get('/update', bookshelveController.bookshelve_update_Page);
router.get('/bookshelveSites/:id', bookshelveController.bookshelve_detail);
router.put('/bookshelveSites/:id', bookshelveController.bookshelve_update_put);
router.delete('/bookshelveSites/:id', bookshelveController.bookshelve_delete);

module.exports = router;