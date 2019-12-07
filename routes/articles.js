const express = require('express');
const router = express.Router();

router.get('/',  (req, res, next) => {
  res.send('articles');
});

router.get('/articles/add', () => {
  res.render('add_article', {title: 'Create Article'});
});

module.exports = router;
