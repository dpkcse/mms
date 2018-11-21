var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var data = { 
    title: 'Register | Mr. Manager', 
    success: req.session.success, 
    error: req.session.error, 
    has_login: false, 
    errors: true 
  }
  res.render("register", data);
});

// @route GET /register
// @Desc Register form for user registration
// @Access Public
router.get('/test', function(req,res){
    res.send(JSON.stringify({msg:"success"}));
;});

module.exports = router;
