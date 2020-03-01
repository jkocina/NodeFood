const express = require('express')
const router = express.Router()

const Recipe = require('../models/Recipes.js')

//This GET request will show all the articles
router.get('/',  (req, res, next) => {
    res.render('recipes', {
      title:"recipes"
    })
})

//This GET request will show a specific article based on the articles id
router.get('/show/:id',  (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")

    res.render('receipe', {
      title:"Receipe"
    })
})

//This GET request will show categories based on their category Id
router.get('/category/:category_id',  (req, res, next) => {
    res.render('category', {
      title:"Category recipes"
    })
})


// add category
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


module.exports = router
