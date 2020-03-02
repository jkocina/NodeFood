const express = require('express')
const router = express.Router()

const Recipe = require('../models/Recipes.js')

//This GET request will show all the articles
router.get('/',  (req, res, next) => {

    Recipe.getRecipes((err, recipes) => {
      if (err) {
        res.send(err)
      }
      res.render('recipes', {
        title:"recipes",
        recipes: recipes
      })
    })
})

//This GET request will show a specific article based on the articles id
router.get('/show/:id',  (req, res, next) => {

    let query = { _id: req.params.id }

    Recipe.getRecipeById(query, (err, recipe) => {
        if (err) {
          res.send(err)
        }

        res.render('recipe', {
          title: Recipe,
          recipe: recipe
        })
    })
})

//This GET request will show categories based on their category Id
router.get('/category/:category_id',  (req, res, next) => {
    res.render('category', {
      title:"Category recipes"
    })
})


// add category POST
router.post('/add', (req, res, next) => {

  let recipe = new Recipe()
  recipe.title = req.body.title
  recipe.ingredients = req.body.ingredients
  recipe.steps = req.body.steps
  recipe.author = req.body.author
  recipe.body = req.body.body


  Recipe.addRecipe(recipe, (err, recipe) => {
    if (err) {
      res.send(err)
    }
    res.redirect('/manage/recipes')
  })
})

// edit recipe POST
router.post('/edit/:id', (req, res, next) => {

  let recipe = new Recipe()
  const query = {_id: req.params.id}
  const update = {title: req.body.title, ingredients: req.body.ingredients, steps: req.body.steps, category: req.body.category, author: req.body.author, body: req.body.body}

  Recipe.updateRecipe( query, update, {}, (err, recipe) => {
    if (err) {
      res.send(err)
    }
    res.redirect('/manage/recipes')
  })
})

// edit category POST
router.delete('/delete/:id', (req, res, next) => {

  const query = {_id: req.params.id}

  Category.removeCategory(query, (err, category) => {
    if (err) {
      res.send(err)
    }
    res.json({ success:true })
  })
})

module.exports = router
