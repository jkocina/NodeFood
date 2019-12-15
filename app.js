const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const setEnv = require('./util/setEnv.js');

//Setting the ENV variables for db connection
setEnv.setEnv();

//Mongoose Connect
mongoose.connect('mongodb://localhost')
//Port
const port = (process.env.PORT) ? process.env.PORT : 3000;

//init app
const app = express();

const indexRoute = require('./routes/index');
const articlesRoute = require('./routes/articles');
const categoriesRoute = require('./routes/categories');
const manageRoute = require('./routes/manage');

//set view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//bodyParser middle ware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

//connect flash middle ware
app.use(cookieParser('keyboard cat'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());

app.use('/', indexRoute);
app.use('/articles', articlesRoute);
app.use('/categories', categoriesRoute);
app.use('/manage', manageRoute);


app.listen(port, () => {
  console.log("Server running on port " + port);
});
