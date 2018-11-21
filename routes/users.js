var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const _ = require('lodash');

// Load Input Validation
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

//Load user model
const User = require('../models/User');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    res.render("register", errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = 'Email already exists';
      res.render("register", errors);
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: '200', // Size
        r: 'pg', // Rating
        d: 'mm' // Default
      });

      const newUser = new User({
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        type:req.body.type,
        password:req.body.password
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
                success: req.session.success, 
                error: req.session.error, 
                has_login: false, 
                errors: false 
              }
              res.render("register", data);
            })
            .catch(err => console.log(err));
        });
      });
    }
  });
});


// @route   GET api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post('/login', (req, res) => {
  
  if (req.session.login) {
    res.redirect('/dashboard');
  } else {
    
    const { errors, isValid } = validateLoginInput(req.body);

    // Check Validation
    if (!isValid) {
      var data = { 
        title: 'Login | Mr. Manager', 
        success: req.session.success, 
        error: req.session.error, 
        has_login: false, 
        errors: errors 
      }
      res.render("login", data);
    }
    
    const email = req.body.email;
    const password = req.body.password;
    // Find user by email
    User.findOne({ email }).then(user => {
      // Check for user
      if (!user) {
        errors.email = 'User not found';
        var data = { 
          title: 'Login | Mr. Manager', 
          success: req.session.success, 
          error: req.session.error, 
          has_login: false, 
          errors: errors 
        }
        res.render("login", data);
      }

      // Check Password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          req.session.success = true;
          req.session.login = true;
          req.session.user_id =user._id;
          req.session.user_fullname = user.name;
          req.session.user_email = user.email;
          res.redirect('/dashboard');
        } else {
          errors.password = 'Password incorrect';
          req.session.success = false;
          req.session.error = [{ errors }];
          res.redirect('/login');
        }
      });
    });
  }

});

module.exports = router;
