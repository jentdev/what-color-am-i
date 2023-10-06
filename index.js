// top level routes

const express = require('express');
const dotenv = require('dotenv');
const passport = require('passport');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo'); // store session to db

const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config({ path: './config/config.env' });

// passport config
require('./config/passport')(passport);

// sessions - makre sure it's above passport middleware
app.use(session({
  secret: 'keyboard cat',
  resave: false, // don't save if nothing is modified
  saveUninitialized: false, // don't create a session until something is stored
  cookie : {
    maxAge: 1000* 60 * 60 *24 * 7,
  },
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    client: mongoose.connection.getClient()
    })
}));

app.use(passport.authenticate('session'));

app.set('view engine', 'ejs');
// bodyparser to get data from form
app.use(express.urlencoded({ extended: false }));

app.use(express.static('public'));

// use morgan to log requests
app.use(morgan('dev'));

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// set global var - can use this instead of passing user in
app.use(function (req, res, next) {
  res.locals.user = req.user || null;
  next();
});

// access public folder
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/', require('./routes/index'));
app.use('/scores', require('./routes/scores'));
app.use('/auth', require('./routes/auth'));

//Connect to the database before listening
connectDB().then(() => {
    app.listen(PORT, () => console.log(`server started on port ${PORT}`));
})