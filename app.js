require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const connectionString = process.env.MONGO_CON;

// Passport authentication setup
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

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
var bookshelvesRouter = require('./routes/bookshelve'); 
var resourceRouter = require('./routes/resource');
const Bookshelve = require('./models/bookshelve');

// Passport authentication configuration
passport.use(new LocalStrategy(
  function(username, password, done) {
    Account.findOne({ username: username })
      .then(function (user) {
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      })
      .catch(function(err) {
        return done(err);
      });
  }
));

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Add session handling and passport initialization
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

// Use routers
app.use('/bookshelveSites', bookshelvesRouter);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/grid', gridRouter);
app.use('/randomitem', pickRouter);
app.use('/resource', resourceRouter);

// Passport configuration
const Account = require('./models/account'); // Account model
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

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
  await Bookshelve.deleteMany();

  const shelve1 = new Bookshelve({ name: "Wooden Shelve", material: "Wood", shelves: 5 });
  const shelve2 = new Bookshelve({ name: "Metal Shelve", material: "Metal", shelves: 3 });
  const shelve3 = new Bookshelve({ name: "Glass Shelve", material: "Glass", shelves: 7 });

  shelve1.save().then(doc => console.log("First bookshelve saved:", doc)).catch(console.error);
  shelve2.save().then(doc => console.log("Second bookshelve saved:", doc)).catch(console.error);
  shelve3.save().then(doc => console.log("Third bookshelve saved:", doc)).catch(console.error);
}

const reseed = true;
if (reseed) {
  recreateDB();
}

module.exports = app;
