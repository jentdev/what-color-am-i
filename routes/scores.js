const express = require('express');
const router = express.Router();
const Score = require("../models/Score");
const Color = require("../models/Color");

const { ensureAuth, ensureGuest } = require('../config/auth');

router.post('/', async (req, res) => {
    try {
        const [accuracy, rr, rg, rb, gh, rh] = (req.body.resultval).split(',');
        const [r, g, b] = req.body.rgbval;
        const score = await Score.create({
            score: accuracy,
            name: req.user,
        });

        const guessedColor = await Color.create({
            red: r,
            green: g,
            blue: b,
            hex: gh
        });
        const randomColor = await Color.create({
            red: rr,
            green: rg,
            blue: rb,
            hex: rh
        });
        
        
        res.render('result', { name: req.user.name, score, guessedColor, randomColor });

    } catch (err) {
        console.error(err);
        res.redirect('/');
    }

});

router.get('/', ensureAuth, async (req, res) => {
    try {
        res.render('main');
    } catch (err) {
        console.error(err);
        res.redirect('/');
    }
});

router.get('/highscores', ensureAuth, async (req, res) => {
    try {
        let scores = await Score.find()
            .sort({ score: -1, date: 1 })
            .limit(10)
            .populate('name')
            .lean(); 
        res.render('highscores', { scores });
        // console.log('scores ', scores);

    } catch (err) {
        console.error(err);
        res.redirect('/');
    }
});


module.exports = router;