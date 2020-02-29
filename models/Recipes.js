const mongoose = require('mongoose')

//Creating a schema for the Recipes
const recipeSchema = mongoose.Schema({
  title:{
    type: String
  },
  ingredients: [],
  category: {
    type: String
  },
  steps: [],
  author: {
    type: String
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  author: {
    type: String
  },
  comments:  [{
    comment_subject: {
      type: String
    },
    comment_body: {
      type: String
    },
    comment_author: {
      type: String
    },
    comment_email: {
      type: String
    },
    comment_date: {
      type: String
    }
  }]

})

//setting a variable and exporting it as the mongoose model following the schema
const Recipe = module.exports = mongoose.model('recipe', recipeSchema)

// creating and exporting a getRecipes function
module.exports.getRecipes = function(callback, limit) {
  Recipe.find(callback).limit(limit).sort([['title','ascending']])
}

//add recipe
module.exports.addRecipe = function(recipe, callback ){
  Recipe.create(recipe, callback)
}

//get a single recipe by id
module.exports.getRecipeById = function(id, callback ){
  Recipe.findById(id, callback)
}

//get a single recipe by id
module.exports.updateRecipe = function(query, update, options, callback) {
  Recipe.findOneAndUpdate(query, update, options, callback)
}

//delete recipe
module.exports.removeRecipe = function(query, callback) {
  Recipe.deleteOne(query, callback)
}
