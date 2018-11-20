var express = require('express');
var bcrypt = require('bcryptjs');
var _ = require('lodash');
var router = express.Router();


/* GET login page. */
router.get('/', function (req, res, next) {
    if (req.session.login) {
        res.redirect('/index');
    } else {
        res.render('login', { title: 'Login | NEC', bodyClass: 'centered-form', success: req.session.success, error: req.session.error, has_login: false });
    }
});

module.exports = router;