var express = require('express');
const artifact_controller = require('../controllers/bookshelves');
var router = express.Router();
// GET request to fetch all artifacts
router.get('/', bookshelves_controller.bookshelves_list);
// POST request to create a new artifact
router.post('/bookshelves', bookshelves_controller.bookshelves_create_post);
module.exports = router;