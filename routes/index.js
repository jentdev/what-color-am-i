const express = require('express');
const router = express.Router();

const { ensureAuth, ensureGuest } = require('../config/auth');

// desc     login/landing page
// route    GET /
router.get('/', ensureGuest, (req, res) => {
    res.render('signin');
});

// desc     show get name page
// route    POST /
// router.post('/start', (req, res) => {
//     const { name } = req.body;
//     // console.log('name ', name);
//     req.session.name = name;
//     res.render('main', {
//         name,
//     });
// });

// desc     show game page
// route    GET /main
router.get('/main', ensureAuth, (req, res) => {
    res.render('main');
    // console.log('req.user.name ', req.user.name); // gets name back
    // console.log('req.name ', req.name); // undefined
    // console.log('name ', res.locals.user); // get User {} back
});

module.exports = router;