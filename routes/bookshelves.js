var express = require('express');
var router = express.Router();

/* GET bookshelves page. */
router.get('/', function(req, res, next) {
  res.render('bookshelves', { title: 'Search Results - Bookshelves' });
});

module.exports = router;
