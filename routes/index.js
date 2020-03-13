const express = require('express')
const router = express.Router()

//This is the home page
router.get('/',  (req, res, next) => {

  //This will get all recipes
  Recipe.getRecipes((err, recipes) => {
    if (err) {
      res.send(err)
    }

    res.render('index', {
      title: 'Index',
      recipes: recipes
    })
  })
})

module.exports = router
