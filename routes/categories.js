const express = require('express')
const router = express.Router()


//Getting the category model
Category = require('../models/Category.js')

/**
 * GET request to render the categories views
 *
 */
router.get('/',  (req, res, next) => {

  //gets all categories from the model
  Category.getCategories((err, categories) =>  {
    if (err) {
      res.send(err)
    }

    //Renders the catagories view
    res.render('categories', {
      title:'Categories',
      categories: categories
    })
  })
})

/**
 * POST request adds a catagory and redirects to manage/categories view
 * Originates from the manage/catagories view
 */
router.post('/add', (req, res, next) => {

  //setting the validation rules to check req values for emptiness
  req.checkBody('title', 'Title is required').notEmpty()
  //req.checkBody('description', 'Description is required').notEmpty()

  //running the function to check for the defined rules
  let errors = req.validationErrors()

  //If there are validation rules, render the page with the rules, else, add category
  if (errors) {
    res.render('add_category', {
      errors: errors,
      title: 'Add Category'
    })
  } else {

    //Creates an object of the category model to add values from the request body
    let category = new Category()
    category.title = req.body.title
    category.description = req.body.description

    //Adds category
    Category.addCategory(category, (err, category) => {
      if (err) {
        res.send(err)
      }

      //redirects to the manage catagories
      res.redirect('/manage/categories')
    })
  }
})

// edit category POST
router.post('/edit/:id', (req, res, next) => {

  //setting the validation rules to check req values for emptiness
  req.checkBody('title', 'Title is required').notEmpty()
  //req.checkBody('description', 'Description is required').notEmpty()

  //running the function to check for the defined rules
  let errors = req.validationErrors()

  //If there are validation rules, render the page with the rules, else, add category
  if (errors) {
    res.render('edit_category', {
      errors: errors,
      title: 'Edit Category',
    })
  } else {

    //Creates an object of the category model to add values from the request body
    let category = new Category()
    let query = {_id: req.params.id}
    let update = {title: req.body.title, description: req.body.description}

    //Updates a category
    Category.updateCategory( query, update, {}, (err, category) => {
      if (err) {
        res.send(err)
      }
      //redirects to the manage/catagories view
      res.redirect('/manage/categories')
    })
  }
})

/**
 * DELETE request for a single category
 * AJAX request calls this from the edit/catagory view
 */
router.delete('/delete/:id', (req, res, next) => {

  //Setting the query
  let query = {_id: req.params.id}

  //Removing a single category
  Category.removeCategory(query, (err, category) => {
    if (err) {
      res.send(err)
    }
    //Passing success back to the ajax request. redirect happens in ajax
    res.json({success:true})
  })
})

module.exports = router
