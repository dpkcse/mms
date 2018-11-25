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
router.post('/entry', (req, res) => {
    const { errors, isValid } = validateFixedCostInput(req.body);

    // Check Validation
    if (!isValid) {
        var data = {
            title: 'Fixed Cost | Mr. Manager',
            data: errors
        }
        res.render("fixedCost", data);
    } else {
        FixedCost.findOne({ month_year: moment().format('MM_Y') }).then(user => {
            if (user) {
                errors.msg = 'This month already added';
                var data = {
                    title: 'Fixed Cost | Mr. Manager',
                    data: errors
                }
                res.render("fixedCost", data);
            } else {
                const newFixedCost = new FixedCost({
                    home_rent: req.body.home_rent,
                    maid_bill: req.body.maid_bill,
                    internet_bill: req.body.internet_bill,
                    cable_bill: req.body.cable_bill,
                    dust_bill: dust_bill,
                    newspaper_bill: req.body.newspaper_bill,
                    gas_bill: req.body.gas_bill,
                    water_bill: req.body.water_bill,
                    service_charge: req.body.service_charge,
                    note: req.body.note,
                    month_year: req.body.month_year,
                    entry_by: req.session.user_id
                });

                newFixedCost
                .save()
                .then(response => {
                    var data = {
                        title: 'Fixed Cost | Mr. Manager',
                        has_login: false,
                        data: response
                    }
                    res.render("fixedCost", data);
                })
                .catch(err => console.log(err));
            }
        });
    }


});


module.exports = router;
