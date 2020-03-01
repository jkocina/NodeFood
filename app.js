const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')
const expressValidator = require('express-validator')
const flash = require('connect-flash')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const setEnv = require('./util/setEnv.js')
const cors = require("cors")


//Setting the ENV variables for db connection
setEnv.setEnv()

//Mongoose Connect
mongoose.connect('mongodb://localhost/food')

//Getting the Port
const port = (process.env.PORT) ? process.env.PORT : 3000

//init app
const app = express()

//setting the route locations for the project
const indexRoute = require('./routes/index')
const recipeRoute = require('./routes/recipes')
const categoriesRoute = require('./routes/categories')
const manageRoute = require('./routes/manage')

//set view engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

//bodyParser middle ware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))

//set static folder
app.use(express.static(path.join(__dirname, 'public')))

//connect flash middle ware
app.use(cookieParser('keyboard cat'))
app.use(session({ cookie: { maxAge: 60000 }}))
app.use(flash())


// Express messages
app.use(require('connect-flash')());
app.use((req, res, next) => {
  res.locals.messages = require('express-messages')(req, res)
  next()
})


//setting the routes for the router
app.use('/', indexRoute)
app.use('/recipes', recipeRoute)
app.use('/categories', categoriesRoute)
app.use('/manage', manageRoute)

//setting the app to listen on the port
app.listen(port, () => {
  console.log("Server running on port " + port)
})
