var db = require("../models");
const bcrypt = require('bcryptjs');
var { check, validationResult } = require('express-validator/check');

module.exports = function (app) {
  // Get all examples
  app.get("/api/users", function (req, res) {
    db.User.findAll({}).then(function (result) {
      res.json(result);
    });
  });

  //this post route is for checking passwords entered in the login
  app.post("/password", function (req, res) {
    db.User.findAll({}).then(function (result) {
      var currentUser;
      var userExists = false;

      for (var i = 0; i < result.length; i++) {
        if (result[i].username === req.body.username) {
          //user is in the database, so set userExists to true
          currentUser = result[i];
          userExists = true;
        }
      }
      //if user exists, check for password
      if (userExists) {
        bcrypt.compare(req.body.password, currentUser.password, function (error, find) {
          //send boolean to user with whether password is true or not
          if (find) {
            res.send("User logged in");
          } else {
            //send boolean to user with whether password is true or not
            res.send("Incorrect password");
          }
        });
      } else {
        res.send("Incorrect username")
      }
    })
  });

  //this post is to handle new user creation requests
  
  
  app.post("/api/user",  [
    check("username", 'Name is required')
      .not().isEmpty()
      .custom(value => {
        return db.User.findOne({where: {username: value}}).then(user => {
          if(user) {
            return Promise.reject('User already in use');
          }
        })
      }),
    check("password", 'Password is required').not().isEmpty(),
    check("passwordVerify", 'Invalid Password\n Must be at least 4 characters long')
        .isLength({min: 4})
        .custom((value, {req, loc, path}) => {
            if (value !== req.body.password){
                throw new Error('Passwords do not match');
            }else {
                return value;
            }
        })
    ], function(req, res){
      const errors = validationResult(req);
      
      if(!errors.isEmpty()){
          console.log("ERRORS EXIST");
          return res.status(422).json({errors: errors.array() });
          
      }else{
          bcrypt.genSalt(10, function(err, salt) {
              bcrypt.hash(req.body.username, salt, function(err, hash) {
                  db.User.create({
                      username: req.body.username,
                      password: hash
                  })
                  .then(function(dbUser){
                      console.log(req.body.username + " was submitted for creation\n Hashed PW: " +hash);
                      res.json({id: dbUser.insertID});
                      
                  });
              });
          });
      }
    });

    
}
