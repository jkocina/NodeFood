const express = require('express');
const router = express.router();

router.get('/',  (req, res, next) => {
  res.send('manage');
})

module.exports = router;
