const express = require('express')
const router = express.Router()

const Recipe = require('../models/Recipes.js')

/**
 * GET request to render recipes
 *
 */
router.get('/',  (req, res, next) => {

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

    //Renders the recipe view
    res.render('recipe', {
      title: Recipe,
      recipe: recipe
    })
  })
})

/**
 * GET request will show categories based on their category Id
 * Originates from the manage/category page
 */
router.get('/category/:category_id',  (req, res, next) => {

  //Renders a catagory view
  res.render('category', {
    title:"Category recipes"
  })
})

/**
 * POST to add category
 * Originates from the manage recipe view
 */
router.post('/add', (req, res, next) => {

  //Creating a object of the recipe mongoose model to populate with info for the update
  let recipe = new Recipe()
  recipe.title = req.body.title
  recipe.ingredients = req.body.ingredients
  recipe.steps = req.body.steps
  recipe.author = req.body.author
  recipe.body = req.body.body

  //Adding the recipe
  Recipe.addRecipe(recipe, (err, recipe) => {
    if (err) {
      res.send(err)
    }
    //Redirecting to the manage/recipes handler
    res.redirect('/manage/recipes')
  })
})
/**
 * POST to edit a recipe
 * Originates from the manage recipe view
 */
router.post('/edit/:id', (req, res, next) => {

  //sets an id to query and info to update
  let query = {_id: req.params.id}
  let update = {title: req.body.title, ingredients: req.body.ingredients, steps: req.body.steps, category: req.body.category, author: req.body.author, body: req.body.body}

  //updating the recipe
  Recipe.updateRecipe( query, update, {}, (err, recipe) => {
    if (err) {
      res.send(err)
    }
    //redirecitng to the /manage/recipt handler
    res.redirect('/manage/recipes')
  })
})
/**
 * POST to delete a recipe
 * Originates from the edit recipe view
 */
router.delete('/delete/:id', (req, res, next) => {

  //Create a query to remove a category
  let query = {_id: req.params.id}

  //Remvoing a category
  Category.removeCategory(query, (err, category) => {
    if (err) {
      res.send(err)
    }
    //sending a success to and redirecting from the ajax request
    res.json({ success:true })
  })
})

module.exports = router
