var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.session.login) {
    var res_data = {
      url:'hayven',
      title: "Dashboard",
      success: req.session.success,
      error: req.session.error,
      user_id: req.session.user_id,
      user_fullname: req.session.user_fullname,
      user_email: req.session.user_email,
      user_img: req.session.user_img,
      highlight: highlight,
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
