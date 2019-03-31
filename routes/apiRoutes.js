var db = require("../models");

module.exports = function(app) {
  // Get all user info
  app.get("/api/users", function(req, res) {
    db.User.findAll({}).then(function(result) {
      res.json(result);
    });
  });

  app.get("/api/scoreboard", function(req, res) {
    db.User.findAll({
      order: [["score", "DESC"], ["stress", "ASC"]],
      limit: 10
    }).then(function(result) {
      res.json(result);
    });
  });
};
