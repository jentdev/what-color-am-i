const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo'); // store session to db

const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config({ path: './config/config.env' });

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

// bodyparser to get data from form
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');
app.use(express.static('public'));

// sessions - make sure it's above passport middleware
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

// set global var - so i don't have to pass in name
// app.use(function (req, res, next) {
//     res.locals.user = req.user || null;
//     next();
// })

// routes
app.use('/', require('./routes/index'));
app.use('/scores', require('./routes/scores'));

//Connect to the database before listening
connectDB().then(() => {
    app.listen(PORT, () => console.log(`server started on port ${PORT}`));
})