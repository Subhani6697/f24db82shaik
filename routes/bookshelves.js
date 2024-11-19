var express = require('express');
const bookshelve_controller = require('../controllers/bookshelve');
var router = express.Router();
// GET request to fetch all bookshelve
router.get('/', bookshelve_controller.bookshelve_list);
// POST request to create a new bookshelve
router.post('/bookshelves', bookshelve_controller.bookshelve_create_post);
module.exports = router;