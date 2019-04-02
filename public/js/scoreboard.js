$(document).ready(function() {
  console.log("Scoreboard JS Loaded");
  var rank = 0;

  // Get the RANK, NAME, and SCORE elements by their ID
  var $sbRankDiv = $("#scoreboard-rank");
  var $sbNameDiv = $("#scoreboard-name");
  var $sbScoreDiv = $("#scoreboard-score");

  // GET a request to the /scoreboard route and return the list of users in rank of highest to lowest score
  // Limit to top 10 users
  $.ajax({
    method: "GET",
    url: "/api/scoreboard"
  }).then(function(result) {
    console.log("GET Scoreboard users running");

    result.forEach(function(user) {
      ++rank;
      console.log("Rank: " + rank);
      console.log(user.username);
      console.log(user.highScore);
      console.log(user.highStress);

      var rankEl = $("<p class='h3 my-4'>" + rank + "</p>");
      var nameEl = $("<p class='h3 my-4'>" + (user.username.charAt(0).toUpperCase() + user.username.slice(1)) + "</p>");
      var scoreEl = $("<p class='h3 my-4'>" + user.highScore + "</p>");

      if (rank === 1) {
        rankEl.addClass("gold");
        nameEl.addClass("gold");
        scoreEl.addClass("gold");
      } else if (rank === 2) {
        rankEl.addClass("silver");
        nameEl.addClass("silver");
        scoreEl.addClass("silver");
      } else if (rank === 3) {
        rankEl.addClass("bronze");
        nameEl.addClass("bronze");
        scoreEl.addClass("bronze");
      }

      $sbRankDiv.append(rankEl);
      $sbNameDiv.append(nameEl);
      $sbScoreDiv.append(scoreEl);
    });
  });
});
