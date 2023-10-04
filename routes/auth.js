// auth routes /auth/

const express = require('express');
const passport = require('passport');
const router = express.Router();
const bcrypt = require('bcrypt');
const session = require('express-session');
// const flash = require('connect-flash'); // to display flash msg

// bring in User model to validate
const User = require('../models/User');

// ---- GOOGLE AUTH ---- //

// desc     authenticate with google
// route    GET /auth/google
// router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// desc     google callback
// route    GET /auth/google/callback
// router.get('/google/callback', passport.authenticate('google', {failureRedirect: '/'}), (req, res) => {
//     res.redirect('/main'); // if success
// });

// ---- LOCAL AUTH ---- //

// desc     show signup page
// route    GET /auth/signup
router.get('/signup', (req, res) => {
    res.render('signup');
});

// desc     local signup
// route    POST /auth/signup
router.post('/signup', (req, res) => {
  const { name, email, password, password2 } = req.body;

  // console.log('name ', name);
  // console.log('pw ', password);
  let errors = [];

  // check required fields
  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please fill in all fields.' });
  }

  // check pw match
  if (password !== password2) {
    errors.push({msg: 'Passwords do not match.' });
  }

  if (errors.length > 0) {
    res.render('signup', {
      errors,
      name,
      email,
      password,
      password2
    });
  
  }
  else {
    // validation passed
    User.findOne({ email: email })
      .then(user => {
        if (user) {
          errors.push({msg: 'Email is already registerd.'});

          res.render('signup', {
            errors,
            name,
            email,
            password,
            password2
          });          
        }
        else {
          const newUser = new User({
            name: name,
            email: email,
            password: password
        });

        // console.log(newUser);

        // hash password
        bcrypt.genSalt(10, function (err, salt) { 
          bcrypt.hash(newUser.password, salt, function (err, hash) {
            if(err) throw err;
            // set password to hashed 
            newUser.password = hash;
            // save user
            newUser.save()
              .then(user => {
                res.render('signup-success');
              })
              .catch(err => console.log(err));
          })});
        }
      });
  }  
});

// desc     login
// route    POST /auth/signin

router.post('/signin', 
  passport.authenticate('local', {
  successRedirect: '/main',
  failureRedirect: '/'
}), (req, res) => {
    res.redirect('/');
});

// desc   logout
// route  GET /auth/logout
router.get('/logout', (req, res, next) => {
    req.logout((error)=>{
        if (error) {return next(error)}
        res.redirect('/')
    });  
})

module.exports = router;