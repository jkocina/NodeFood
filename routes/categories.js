const express = require('express');
const router = express.Router();

//Getting the category model
Category = require('../models/Category.js');

//This GET request will show all the categories
router.get('/',  (req, res, next) => {

  Category.getCategories((err, categories) => {

    console.log(categories);

    //Rendering the category page
    res.render('categories', {
      title:'Categories',
      categories: categories
    })
  })
})

module.exports = router;
