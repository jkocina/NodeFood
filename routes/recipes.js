const express = require('express');
const router = express.Router();

//This GET request will show all the articles
router.get('/',  (req, res, next) => {
    res.render('recipes', {
      title:"recipes"
    })
})

//This GET request will show a specific article based on the articles id
router.get('/show/:id',  (req, res, next) => {
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



module.exports = router;
