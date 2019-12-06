const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const expressValidator = require("express-validator");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");

const port = (process.env.PORT) ? process.env.PORT : 3000;

//init app
const app = express();

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

app.get('/', (req, res, next) => {
  res.send("Hello");
})

app.listen(port, () => {
  console.log("Server running on port " + port);
});
