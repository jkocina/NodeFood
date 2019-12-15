const express = require('express');
const router = express.Router();

//This GET request will show all the categories
router.get('/',  (req, res, next) => {
    res.render('categories', {
      title:'Categories'
    })
})

module.exports = router;
