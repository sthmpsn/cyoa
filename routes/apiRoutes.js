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
}
