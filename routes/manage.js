const express = require('express')
const router = express.Router()
Category = require('../models/Category.js')
Recipe = require('../models/Recipes.js')

/**
 * Manage page to see all the views to manage parts of the application. Request
 * to change the actual fields are in the respective routes file
 */

//RECIPES SECTION

/**
 * GET request to manage recipes
 *
 */
router.get('/recipes',  (req, res, next) => {

  //getting all recipes
  Recipe.getRecipes((err, recipes) => {
    if (err) {
      res.send(err)
    }

    //rendering the manage recipes view
    res.render('manage_recipes', {
      title: 'Manage Recipes',
      recipes: recipes
    })
  })
})

/**
 * This will handle a GET request that will add an recipe
 * Originates from manage recipe view
 */
router.get('/recipe/add', (req, res, next) => {

  //getting the categories, the categories will populate a select tag
  Recipe.getCategories((err, categories) => {
    if (err) {
      res.send(err)
    }

    //rendering the add recipe view with categories
    res.render('add_recipe', {
      title: 'Create Recipe',
      categories: categories
    })
  })
})

/**
 * GET request to render a single recipe
 */
router.get('/recipe/edit/:id', (req, res, next) => {

  //Getting a single recipe
  Recipe.getRecipeById(req.params.id, (err, recipe) => {
    if (err) {
      res.send(err)
    }
    //Rendering the recipe for editing
    res.render('edit_recipe', {
      title: 'Edit Recipe',
      recipe: recipe
    })
  })
})

//CATAGORIES SECTION

/**
 * GET request to render manage categories
 * Originates from
 */
//
router.get('/categories', (req, res, next) => {

  // Gettting the catagories
  Category.getCategories((err, categories) => {
    if (err) {
      res.send(err)
    }

    //render the view to manage catagories
    res.render('manage_categories', {
      title: 'Manage Categories',
      categories: categories
    })
  })
})

//This will handle a GET request that will add an category
router.get('/categories/add', (req, res, next) => {

  //Rending the page to create a catagory, originates from manage catagories page
  res.render('add_category', {
    title: 'Create Category'
  })
})


/**
 * GET request to render a edit catagory view
 * originates from the manage categories view
 */
router.get('/categories/edit/:id', (req, res, next) => {

  //Gets a specific catagory by id
  Category.getCategoryById(req.params.id, (err, category) => {
    if (err) {
      res.send(err)
    }

    //Rendering the edit catagory page with the categoriy retrieved
    res.render('edit_category', {
      title: 'Edit Category',
      category: category
    })
  })
})

module.exports = router
