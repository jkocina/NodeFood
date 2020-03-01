const express = require('express')
const router = express.Router()
Category = require('../models/Category.js')
Recipe = require('../models/Recipes.js')


//This will handle a GET request to manage articles
router.get('/recipes',  (req, res, next) => {

  Recipe.getRecipes((err, recipes) => {
    if (err) {
      res.send(err)
    }
    res.render('manage_recipes', {
      title: 'Manage Recipes',
      recipes: recipes
    })
  })
})

//This will handle a GET request to manage categories
router.get('/categories', (req, res, next) => {

  Category.getCategories((err, categories) => {
    if (err) {
      res.send(err)
    }

    //render the manage categories view
    res.render('manage_categories', {
      title: 'Manage Categories',
      categories: categories
    })
  })
})


//This will handle a GET request that will add an recipe
router.get('/recipe/add', (req, res, next) => {
  Category.getCategories((err, categories) => {
    if (err) {
      res.send(err)
    }
    res.render('add_recipe', {
      title: 'Create Recipe',
      categories: categories
    })
  })
})


//This will handle a GET request that will add an category
router.get('/categories/add', (req, res, next) => {
  res.render('add_category', {
    title: 'Create Category'
  })
})

//This will handle a GET request for a view to edit articles
router.get('/recipe/edit/:id', (req, res, next) => {
  res.render('edit_recipe', {
    title: 'Edit Recipe'
  })
})


//This will handle a GET request to return a view to edit a category
router.get('/categories/edit/:id', (req, res, next) => {
  Category.getCategoryById(req.params.id, (err, category) => {
    if (err) {
      res.send(err)
    }

    res.render('edit_category', {
      title: 'Edit Category',
      category: category
    })
  })
})

module.exports = router
