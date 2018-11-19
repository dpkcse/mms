var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
//Load user model
const User = require('../models/User');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/entry', (req,res) =>{
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
  })
});

module.exports = router;
