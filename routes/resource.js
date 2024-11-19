var express = require('express');
var router = express.Router();
// Require controller modules.
var api_controller = require('../controllers/api');
var bookshelves_controller = require('../controllers/bookshelves');

router.get('/', api_controller.api);

// Artifacts Routes
router.get('/bookshelves', bookshelves_controller.bookshelves_list);
router.get('/bookshelves/:id', bookshelves_controller.bookshelves_detail);
router.post('/bookshelves/:id', bookshelves_controller.bookshelves_create_post);
router.delete('/bookshelves/:id', bookshelves_controller.bookshelves_delete);
router.put('/bookshelves/:id', bookshelves_controller.bookshelves_update_put);

module.exports = router;