var express = require('express');
var bcrypt = require('bcryptjs');
var _ = require('lodash');
var router = express.Router();


/* GET login page. */
router.get('/', function (req, res, next) {
    if (req.session.login) {
        res.redirect('/dashboard');
    } else {
        var data = { 
            title: 'Login | Mr. Manager', 
            errors: false 
        }
        res.render('login', data);
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