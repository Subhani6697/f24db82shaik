var express = require('express');
const artifact_controller = require('../controllers/bookshelveController');
var router = express.Router();
// GET request to fetch all artifacts
router.get('/', bookshelve_controller.bookshelve_list);
// POST request to create a new artifact
router.post('/bookshelves', bookshelve_controller.bookshelve_create_post);
module.exports = router;