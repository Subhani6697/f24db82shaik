const express = require('express');
const router = express.Router();
const bookshelveController = require('../controllers/bookshelve');
const secured = (req, res, next) => {
    if (req.user) {
        return next();
    }
    res.redirect("/login");
};

// Route to view all book shelves in a web page
router.get('/', bookshelveController.bookshelve_view_all_Page);

router.get('/create', (req, res) => res.render('bookshelve_create_form'));

/* GET delete book shelve page */
router.get('/bookshelves/delete', secured, bookshelveController.bookshelve_delete_Page);

// Export the router
module.exports = router;
