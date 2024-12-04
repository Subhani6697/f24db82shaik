var Bookshelve = require('../models/bookshelve');

exports.bookshelve_view_one_Page = async function (req, res) {
    console.log('Single view for id ' + req.query.id);
    try {
      const result = await Bookshelve.findById(req.query.id);
      res.render('bookshelvedetail', {
        title: 'Bookshelve Detail',
        toShow: result,
      });
    } catch (err) {
      res.status(500);
      res.send(`{'error': '${err}'}`);
    }
  };
  
  exports.bookshelve_create_Page = function (req, res) {
    console.log("Create view");
    try {
      res.render('bookshelvecreate', { title: 'Create Bookshelve' });
    } catch (err) {
      res.status(500);
      res.send(`{'error': '${err}'}`);
    }
  };
  
exports.bookshelve_update_Page = async function(req, res) {
    console.log("Update view for item " + req.query.id);
    try {
      let result = await Bookshelve.findById(req.query.id);
      res.render('bookshelveupdate', { title: 'Bookshelve Update', toShow: result });
    } catch (err) {
      res.status(500);
      res.send(`{'error': '${err}'}`);
    }
  };
  
  exports.bookshelve_delete_Page = async function(req, res) {
    console.log("Delete view for id " + req.query.id)
    try{
    result = await Bookshelve.findById(req.query.id)
    res.render('bookshelvedelete', { title: 'Bookshelve Delete', toShow: 
   result });
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
   };