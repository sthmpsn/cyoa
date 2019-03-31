// DEPENDENCIES
var path = require("path");

// ROUTES
module.exports = function(app) {
  // index route loads index.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  // classroom route loads classroom.html
  app.get("/classroom", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/classroom.html"));
  });

  // scoreboard route loads scoreboard.html
  app.get("/scoreboard", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/scoreboard.html"));
  });
};
