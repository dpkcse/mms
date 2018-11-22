var express = require('express');
var moment = require('moment');
var _ = require('lodash');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.session.login) {
    var res_data = {
      title: "Dashboard | Mr. Manager",
      success: req.session.success,
      user_id: req.session.user_id,
      user_name: req.session.user_name,
      user_email: req.session.user_email,
      user_avater: req.session.user_avater,
      user_phone: req.session.user_phone,
      user_type: req.session.user_type,
      moment: moment,
      _:_,
      has_login: true,
    };
    res.render("index", res_data);
  } else {
    res.redirect('/login');
  }
  
});

module.exports = router;
