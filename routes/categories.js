const express = require('express');
const router = express.Router();

//Getting the category model
Category = require('../models/Category.js');

//This GET request will show all the categories
router.get('/',  (req, res, next) => {

  Category.getCategories((err, categories) => {

    if (err) {
      res.send(err)
    }

    console.log(categories);

    //Rendering the category page
    res.render('categories', {
      title:'Categories',
      categories: categories
    })
  })
})

Category.getCategories((err, categories) => {

})

router.post('/add', (req, res, next) => {
  let category = new Category();
  category.title = req.body.title;
  category.description = req.body.description;

})

module.exports = router;
