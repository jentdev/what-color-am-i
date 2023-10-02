const express = require('express');
const router = express.Router();
const Score = require("../models/Score");
const path = require('path');

router.post('/', async (req, res) => {
    try {
        // console.log('req body', req.body);
        const [accuracy, rr, rg, rb] = (req.body.resultval).split(',');
        const name = req.session.name;
        await Score.create({
            score: accuracy,
            name: name
        });
        const [r, g, b] = req.body.rgbval;
        
        res.render('result', { name, accuracy, r, g, b, rr, rg, rb });
        // console.log(rr);
        // console.log(rg);

    } catch (err) {
        console.error(err);
    }

});

router.get('/', async (req, res) => {
    try {
        res.render('main', { name: req.session.name });

    } catch (err) {
        console.error(err);
    }
});

router.get('/highscores', async (req, res) => {
    let scores;
    try {
        scores = await Score.find().sort({ score: -1, date: 1 }).limit(10); 
    } catch (err) {
        console.error(err);
    }
    res.render('highscores', { scores });
});


module.exports = router;