const express = require('express')
const router = express.Router()

//This is the home page
router.get('/',  (req, res, next) => {
  res.render('index', {
    title: 'Index'
  })
})

module.exports = router
