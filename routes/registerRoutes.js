var db = require("../models");
var bcrypt = require('bcryptjs');
var { check, validationResult } = require('express-validator/check');

module.exports = function (app) {
  //this post is to handle new user creation requests
  app.post("/api/user", [
    check("username", "Name is required").not().isEmpty()
      .custom(value => {
        return db.User.findOne({ where: { username: value } }).then(user => {
          if (user) {
            return Promise.reject("User already in use");
          }
        })
      }),
      check('username')
        .custom(value => !/\s/.test(value))
        .withMessage('No spaces are allowed in the username'),
    check("password", "Password cannot be empty").not().isEmpty(),
    check("password", "Password length must be at least 4 characters").isLength({ min: 4 }),
    check("passwordVerify","Please verify your password")
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Passwords do not match');
        } 
        else{
          return value;
        }
      })
  ], function (req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log("User Registration Requirements not met");
      return res.status(422).json({ errors: errors.array() });

    } else {
      bcrypt.hash(req.body.password, 10, function (err, hash) {
        db.User.create({
          username: req.body.username,
          password: hash
        })
          .then(function (dbUser) {
            console.log(req.body.username + " was submitted for creation");
            res.json({ id: dbUser.insertID });

          });
      });

    }
  });
}
