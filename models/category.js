const mongoose = require('mongoose');

//Creating a schema for the categories
const categorySchema = mongoose.Schema({
  title:{
    type: String
  },
  description: {
    type: String
  }
})

const Category = module.exports = mongoose.model('Category', categorySchema);

// Get categories
module.exports.getCategories = function(callback, limit) {
  Category.find(callback).limit(limit).sort([['title','ascending']])
}
