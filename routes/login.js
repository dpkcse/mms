var express = require('express');
var bcrypt = require('bcryptjs');
var _ = require('lodash');
var router = express.Router();


/* GET login page. */
router.get('/', function (req, res, next) {
    if (req.session.login) {
        res.redirect('/dashboard');
    } else {
        res.render('login', { title: 'Login | NEC', bodyClass: 'centered-form', success: req.session.success, error: req.session.error, has_login: false });
    }
});

/* Signout. */
router.get('/signout', function (req, res, next) {
    if(req.session.login){
        req.session.destroy();
        res.redirect('/');
    }
});

module.exports = router;