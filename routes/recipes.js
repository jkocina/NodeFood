const express = require('express')
const router = express.Router()
const axios = require("axios")

const Recipe = require('../models/Recipes.js')

/**
 * GET request to render recipes
 *
 */
router.get('/', (req, res, next) => {

  //This will get all recipes
  Recipe.getRecipes((err, recipes) => {
    if (err) {
      res.send(err)
    }

    //rendering the recipes view
    res.render('recipes', {
      title:"recipes",
      recipes: recipes
    })
  })
})
/**
 * GET request to render a single recipe
 * Originates from
 */
router.get('/show/:id',  (req, res, next) => {

  //Set a query with the id of the single recipe
  let query = { _id: req.params.id }

  //Gets a single recipe
  Recipe.getRecipeById(query, (err, recipe) => {
    if (err) {
      res.send(err)
    }

    const siteUrl = "https://remoteok.io/";

    //Renders the recipe view
    res.render('recipe', {
      title: Recipe,
      recipe: recipe
    })
  })
})

/**
 * GET request will show recipes based on their category
 * Originates from the manage/category page
 */
router.get('/category/:category_id',  (req, res, next) => {
  Recipe.getCategoryRecipes(req.params.category_id, (err, recipes) => {
    Category.getCategoryById(req.params.category_id, (err, category) => {
      res.render('recipes', {
        title: category.title+' Recipes',
        recipes: recipes
      })
    })
  })
})

/**
 * POST to add category
 * Originates from the manage recipe view
 */
router.post('/add', (req, res, next) => {

  req.checkBody('title', 'Title is required').notEmpty()
  req.checkBody('category', 'Category is required').notEmpty()
  req.checkBody('ingredients', 'Ingredients is required').notEmpty()
  req.checkBody('steps', 'Steps is required').notEmpty()
  req.checkBody('author', 'Author is required').notEmpty()
  req.checkBody('body', 'Body is required').notEmpty()

  let errors = req.validationErrors()

  if (errors) {

    //getting the categories
    Category.getCategories((err,categories) => {
      if (err) {
        res.send(err)
      } else {

        //rendering the add recipe view with categories
        res.render('add_recipe', {
          title: 'Create Recipe',
          categories: categories,
          errors: errors
        })
      }
    })
  } else {

    //Creating a object of the recipe mongoose model to populate with info for the update
    let recipe = new Recipe()
    recipe.title = req.body.title
    recipe.category = req.body.category
    recipe.ingredients = req.body.ingredients
    recipe.steps = req.body.steps
    recipe.author = req.body.author
    recipe.body = req.body.body

    //Adding the recipe
    Recipe.addRecipe(recipe, (err, recipe) => {
      if (err) {
        res.send(err)
      }

      //Setting a flash message when adding recipe
      req.flash('success', 'Recipe ' + req.body.title + ' added')

      //Redirecting to the manage/recipes handler
      res.redirect('/manage/recipes')
    })
  }
})

/**
 * POST to edit a recipe
 * Originates from the manage recipe view
 */
router.post('/edit/:id', (req, res, next) => {

  //Setting the rules to validate
  req.checkBody('title', 'Title is required').notEmpty()
  req.checkBody('category', 'Category is required').notEmpty()
  req.checkBody('ingredients', 'Ingredients is required').notEmpty()
  req.checkBody('steps', 'Steps is required').notEmpty()
  req.checkBody('author', 'Author is required').notEmpty()
  req.checkBody('body', 'Body is required').notEmpty()

  //getting the errors from the validation rules
  let errors = req.validationErrors()

  if (errors) {
    //Getting a single recipe
    Recipe.getRecipeById(req.params.id, (err, recipe) => {
      if (err) {
        res.send(err)
      }

      //Get all catagories
      Category.getCategories((err, catagories) => {
        if (err) {
          res.send(err)
        }
        //Rendering the recipe for editing
        res.render('edit_recipe', {
          title: 'Edit Recipe',
          recipe: recipe,
          categories: catagories,
          errors: errors
        })
      })
    })
  } else {

    //sets an id to query and info to update
    let query = {_id: req.params.id}
    let update = {
      title: req.body.title,
      ingredients: req.body.ingredients,
      steps: req.body.steps,
      category: req.body.category,
      author: req.body.author,
      body: req.body.body
    }

    //updating the recipe
    Recipe.updateRecipe( query, update, {}, (err, recipe) => {
      if (err) {
        res.send(err)
      }

      //Setting a flash message when editing recipe
      req.flash('success', 'Recipe ' + req.body.title + ' edited')

      //redirecitng to the /manage/recipt handler
      res.redirect('/manage/recipes')
    })
  }
})

/**
 * POST to delete a recipe
 * Originates from the edit recipe view
 */
router.delete('/delete/:id', (req, res, next) => {

  //Create a query to remove a recipe
  let query = {_id: req.params.id}

  //Remvoing a recipe
  Recipe.removeRecipe(query, (err, recipe) => {
    if (err) {
      res.send(err)
    }

    //sending a success to and redirecting from the ajax request
    res.json({ success:true })
  })
})

module.exports = router
