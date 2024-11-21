require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const connectionString = process.env.MONGO_CON;

// Connect to MongoDB
mongoose.connect(connectionString);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log("Connection to DB succeeded");
});

// Initialize app
var app = express();

// Routers
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var gridRouter = require('./routes/grid');
var pickRouter = require('./routes/pick');
const Bookshelve = require('./models/bookshelve'); // Updated model
const resourceRouter = require('./routes/resource');
var bookshelvesRouter = require('./routes/bookshelve');  // Updated route for bookshelve

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Use routers after app is initialized
app.use('/bookshelveSites', bookshelvesRouter);  // Updated route for bookshelve
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/grid', gridRouter);
app.use('/randomitem', pickRouter);
app.use('/resource', resourceRouter);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

// Recreate DB with sample data
async function recreateDB() {
  // Delete existing data
  await Bookshelve.deleteMany();

  // Create new sample bookshelve sites
  const shelve1 = new Bookshelve({ name: "Wooden Shelve", material: "Wood", shelves: 5 });
  const shelve2 = new Bookshelve({ name: "Metal Shelve", material: "Metal", shelves: 3 });
  const shelve3 = new Bookshelve({ name: "Glass Shelve", material: "Glass", shelves: 7 });

  // Save the sample bookshelves to the database
  shelve1.save().then(doc => console.log("First bookshelve saved:", doc)).catch(console.error);
  shelve2.save().then(doc => console.log("Second bookshelve saved:", doc)).catch(console.error);
  shelve3.save().then(doc => console.log("Third bookshelve saved:", doc)).catch(console.error);
}

const reseed = true;
if (reseed) {
  recreateDB();
}

module.exports = app;