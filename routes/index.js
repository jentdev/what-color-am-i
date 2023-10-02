const express = require('express');
const router = express.Router();

// desc     show get name page
// route    GET /
router.get('/', (req, res) => {
    try {
        if (req.session.name) {
        res.redirect('/start');
        }
        else {
            res.render('index');
        }
    } catch (err) {
        console.error(err);
    }
    
});

// desc     show get name page
// route    POST /
router.post('/start', (req, res) => {
    const { name } = req.body;
    // console.log('name ', name);
    req.session.name = name;
    res.render('main', {
        name,
    });
});

// desc     show get name page
// route    POST /
router.get('/start', (req, res) => {
    const name = req.session.name;
    res.render('main', {
        name,
    });
});

module.exports = router;