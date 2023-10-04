// strategies
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const mongoose = require('mongoose'); // dealing with db -> need User model
const User = require('../models/User');

const passport = (passport) => {
    // google strategy
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
        },
        async(accessToken, refreshToken, profile, cb) => {
            // console.log(profile); <-- store these in db
            const newUser = {
                googleId: profile.id,
                name: profile.name.givenName,
                email: profile.emails[0].value,
            }

            try {
                // try to store user
                let user = await User.findOne({ googleId: profile.id })

                if (user) {
                    cb(null, user); // null for error, pass in user
                }
                else {
                    // create new user if no user
                    user = await User.create(newUser);
                    cb(null, user);
                }
            }
            catch (err) {
                console.error(err);
            }
        })
    );

    // local strategy
    passport.use(
        new LocalStrategy({ usernameField: 'email', }, (email, password, cb) => {
            // match user
            User.find({ email: email })
                .then(user => {
                    console.log('local strat user found: ', user);
                    const getUser = user.find(e => e.password !== undefined);
                    console.log('getuser: ', getUser);
                    if(!getUser) {
                        return cb(null, false, { message: 'That email is not registered.'});
                    }

                    // match pw
                           
                    bcrypt.compare(String(password), String(getUser.password), (err, isMatch) => {
                        if(err) throw err;

                        if(isMatch) {
                        return cb(null, getUser);
                        }
                        else {
                            return cb(null, false, {message: 'Password incorrect.'});
                        }
                    });
                    

                })
                .catch(err => console.error(err));
            
        
        })
    );

    passport.serializeUser((user, cb) => {
        cb(null, user.id);
    });
    
    passport.deserializeUser(async (id, cb) => {
        cb(null, await User.findById(id))
    })
}

module.exports = passport;