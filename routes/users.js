var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
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
router.post('/register', (req,res) =>{
  User.findOne({email:req.body.email})
    .then(user =>{
      if(user){
        return res.status('400').json({email:"Email already exists"});
      }else{
        const newUser = new User({
          name:req.body.name,
          email:req.body.email,
          phone:req.body.phone,
          password:req.body.password
        });

        bcrypt.genSalt(10, (err, salt)=>{
          if(err) throw err;
          bcrypt.hash(newUser.password, salt, (err,has)=>{
            if(err) console.log(555,err);
            newUser.password = hash;
            newUser.save()
              .then(user=> res.json(user))
              .catch(err => console.log(5,err));
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
      return res.status(400).json(errors);
    }
    
    const email = req.body.email;
    const password = req.body.password;
    // Find user by email
    User.findOne({ email }).then(user => {
      // Check for user
      if (!user) {
        errors.email = 'User not found';
        return res.status(404).json(errors);
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
