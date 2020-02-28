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

//setting a variable and exporting it as the mongoose model following the schema
const Category = module.exports = mongoose.model('Category', categorySchema);

// creating and exporting a getCategories function
module.exports.getCategories = function(callback, limit) {
  Category.find(callback).limit(limit).sort([['title','ascending']])
}

//add category
module.exports.addCategory = function(category, callback ){
  Category.create(category, callback);
}

//get a single category by id
module.exports.getCategoryById = function(id, callback ){
  Category.findById(id, callback);
}

//get a single category by id
module.exports.updateCategory = function(query, update, options, callback) {

  Category.findOneAndUpdate(query, update, options, callback)

}
