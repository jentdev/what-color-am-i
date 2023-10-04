module.exports = {
    ensureAuth: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        }
        else {
            res.redirect('/');
        }
    },
    // if logged in and go to landing page
    // redirect to /main
    ensureGuest: (req, res, next) => {
        if (req.isAuthenticated()) {
            res.redirect('/main');
        }
        else {
            return next();
        }
    },
}