var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
var moment = require('moment');
var _ = require('lodash');

// Load Input Validation
const validateFixedCostInput = require('../validation/fixedCost');

//Load user model
const FixedCost = require('../models/FixedCost');

/* GET fixed cost page listing. */
router.get('/', function (req, res, next) {
    console.log(req.session);
    if (req.session.login) {
        var res_data = {
            title: "Fixed Cost | Mr. Manager",
            success: req.session.success,
            user_id: req.session.user_id,
            user_name: req.session.user_name,
            user_email: req.session.user_email,
            user_avater: req.session.user_avater,
            user_phone: req.session.user_phone,
            user_type: req.session.user_type,
            moment: moment,
            _: _,
            has_login: true,
        };
        res.render("fixedCost", res_data);
    } else {
        res.redirect('/login');
    }

});

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => {
    const { errors, isValid } = validateFixedCostInput(req.body);

    // Check Validation
    if (!isValid) {
        var data = {
            title: 'Register | Mr. Manager',
            data: errors
        }
        res.render("register", data);
    } else {
        User.findOne({ email: req.body.email }).then(user => {
            if (user) {
                errors.email = 'Email already exists';
                var data = {
                    title: 'Register | Mr. Manager',
                    data: errors
                }
                res.render("register", data);
            } else {
                const avatar = gravatar.url(req.body.email, {
                    s: '200', // Size
                    r: 'pg', // Rating
                    d: 'mm' // Default
                });

                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    phone: req.body.phone,
                    type: req.body.type,
                    avatar: avatar,
                    password: req.body.password
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser
                            .save()
                            .then(user => {
                                var data = {
                                    title: 'Register | Mr. Manager',
                                    has_login: false,
                                    data: user
                                }
                                res.render("register", data);
                            })
                            .catch(err => console.log(err));
                    });
                });
            }
        });
    }


});


module.exports = router;
