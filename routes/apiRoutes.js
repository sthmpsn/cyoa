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
      order: [["highScore", "DESC"], ["highStress", "ASC"]],
      limit: 10
    }).then(function(result) {
      res.json(result);
    });
  });

  app.get("/api/users/:username", function(req, res) {
    db.User.findOne({
      where: {
        username: req.params.username
      }
    }).then(function(result) {
      res.json(result);
    });
  });

  app.put("/api/users/:username", function(req, res) {
    db.User.update(
      {
        currentScore: req.body.currentScore,
        currentStress: req.body.currentStress,
        currentQuestionId: req.body.currentQuestionId
      },
      {
        where: {
          username: req.params.username
        }
      }
    ).then(function(result) {
      res.json(result);
    });
  });

  app.put("/api/high/users/:username", function(req, res) {
    db.User.update(
      {
        currentScore: req.body.currentScore,
        currentStress: req.body.currentStress,
        highScore: req.body.highScore,
        highStress: req.body.highStress,
        currentQuestionId: req.body.currentQuestionId
      },
      {
        where: {
          username: req.params.username
        }
      }
    ).then(function(result) {
      res.json(result);
    });
  });
};
