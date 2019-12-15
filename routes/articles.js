const express = require('express');
const router = express.Router();

//This GET request will show all the articles
router.get('/',  (req, res, next) => {
    res.render('articles', {
      title:"Articles"
    })
})

//This GET request will show a specific article based on the articles id
router.get('/show/:id',  (req, res, next) => {
    res.render('article', {
      title:"Article"
    })
})

//This GET request will show articles based on their category Id
router.get('/category/:category_id',  (req, res, next) => {
    res.render('articles', {
      title:"Category Articles"
    })
})



module.exports = router;
