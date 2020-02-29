const express = require('express')
const router = express.Router()

//Getting the category model
Category = require('../models/Category.js')

//This GET request will show all the categories
router.get('/',  (req, res, next) => {

  Category.getCategories((err, categories) => {

    if (err) {
      res.send(err)
    }

    //To make sure we are getting the categories from mongo
    console.log(categories)

    res.render('categories', {
      title:'Categories',
      categories: categories
    })
  })
})

// add category
router.post('/add', (req, res, next) => {

  let category = new Category()
  category.title = req.body.title
  category.description = req.body.description

  Category.addCategory(category, (err, category) => {
    if (err) {
      res.send(err)
    }
    res.redirect('/manage/categories')
  })
})

// edit category POST
router.post('/edit/:id', (req, res, next) => {

  let category = new Category()
  const query = {_id: req.params.id}
  const update = {title: req.body.title, description: req.body.description}

  category.title = req.body.title
  category.description = req.body.description

  Category.updateCategory( query, update, {}, (err, category) => {
    if (err) {
      res.send(err)
    }
    res.redirect('/manage/categories')
  })
})

// edit category POST
router.delete('/delete/:id', (req, res, next) => {

  console.log("Made it to the post delete")
  const query = {_id: req.params.id}

  Category.removeCategory(query, (err, category) => {
    if (err) {
      res.send(err)
    }
    res.json({ success:true })
  })
})

module.exports = router
