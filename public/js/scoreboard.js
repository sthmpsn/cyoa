$(document).ready(function() {
  console.log("Scoreboard JS Loaded");
  // GET a request to the /scoreboard route and return the list of users in rank of highest to lowest score
  // Limit to top 10 users
  $.ajax({
    method: "GET",
    url: "/api/scoreboard"
  }).then(function(result) {
    console.log("GET Scoreboard users running");
    result.forEach(function(user) {
      console.log(user.username);
      console.log(user.score);
      console.log(user.stress);
    });
  });
});
