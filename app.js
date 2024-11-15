require('dotenv').config();
const mongoose = require('mongoose');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Import routers
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var bookshelvesRouter = require('./routes/bookshelves');
var gridRouter = require('./routes/grid');
var pickRouter = require('./routes/pick');

// Import model
const Bookshelf = require("./models/bookshelves");  // Matches the file name in /models

var app = express();

// MongoDB connection setup
const connectionString = process.env.MONGO_CON;
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once("open", function() {
    console.log("Connection to DB succeeded");
});

// Function to seed the database
async function recreateDB() {
  await Bookshelf.deleteMany(); // Delete all existing bookshelves
  // Create instances of bookshelves (sample data)
  let instance1 = new Bookshelf({ name: "Bookshelf A", material: "Wood", shelves: 5 });
  let instance2 = new Bookshelf({ name: "Bookshelf B", material: "Metal", shelves: 3 });
  let instance3 = new Bookshelf({ name: "Bookshelf C", material: "Plastic", shelves: 4 });

  // Save instances to the database
  await instance1.save().then(() => console.log("Bookshelf 1 saved"));
  await instance2.save().then(() => console.log("Bookshelf 2 saved"));
  await instance3.save().then(() => console.log("Bookshelf 3 saved"));
}

// Seed the database on server start if needed
let reseed = true;
if (reseed) {
  recreateDB();
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes setup
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/resource/bookshelves', bookshelvesRouter); // Updated route path
app.use('/grid', gridRouter);
app.use('/pick', pickRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
