var express = require('express');
var router = express.Router();
// Require controller modules.
var api_controller = require('../controllers/api');
var bookshelve_controller = require('../controllers/bookshelve');

router.get('/', api_controller.api);

// Artifacts Routes
router.get('/bookshelves', bookshelve_controller.bookshelve_list);
router.get('/bookshelves/:id', bookshelve_controller.bookshelve_detail);
router.post('/bookshelves/:id', bookshelve_controller.bookshelve_create_post);
router.delete('/bookshelves/:id', bookshelve_controller.bookshelve_delete);
router.put('/bookshelves/:id', bookshelve_controller.bookshelve_update_put);

module.exports = router;