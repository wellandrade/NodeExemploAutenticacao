var passport = require('passport');
var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
    res.render('login', { title: 'Login', message: null });
});

router.get('/login', function (req, res) {
    if (req.query.fail)
        res.render('login', { title: 'Login', message: 'Usuario e/ou senha incorreto ', error: true });
    else if (req.query.reset) 
        res.render('login', { title: 'Login', message: 'A sua nova senha chegara no seu email em breve', error: false });
    else 
        res.render('login', { title: 'Login', message: null });
});

router.post('/login', 
    passport.authenticate('local', { successRedirect: '/index', failureRedirect: '/login?fail=true' })  
);

router.post('/logoff', (req, res, next) => {
    req.logOut();
    res.redirect('/login');
});

module.exports = router;
