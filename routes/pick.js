const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  // Array of image file names
  const image_names = [
    'babu1.jpg', 
    'babu2.jpg', 
    'babu3.jpg', 
    'babu4.jpg', 
    'babu5.jpg'
  ];

  res.render('randomitem', { title: 'A random item', image_names: image_names });
});

module.exports = router;