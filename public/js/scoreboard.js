$(document).ready(function () {
  var rank = 0;

  var user = localStorage.getItem("username");

  // Get the RANK, NAME, and SCORE elements by their ID
  var $sbRankDiv = $("#scoreboard-rank");
  var $sbNameDiv = $("#scoreboard-name");
  var $sbScoreDiv = $("#scoreboard-score");

  // necessary for giphy links to be responsive
  var gliphyEmbed = ' width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><a href=';

  function saveScoreFinal() {
    //get user's current highscore for comparison
    $.ajax({
      method: "GET",
      url: "/api/users/" + user
    }).then(function (result) {
      score = result.currentScore;
      stress = result.currentStress;
      highestScore = result.highScore;
      highestStress = result.highStress;
      console.log(result);
      //change modal text/image based on if the user passed, failed, or stressed out
      if (score <= 0 && score !== -1) {
        $('#questionModal').modal('show');
        $(".questionMsg").html("You have flunked out of class.")
        $("#questionFlavor").html('<div style="width:100%;height:0;padding-bottom:56%;position:relative;"><iframe src="https://giphy.com/embed/10h8CdMQUWoZ8Y"' + gliphyEmbed + '"https://giphy.com/gifs/someone-idea-lurker-10h8CdMQUWoZ8Y"></a>');
      } else if (stress >= 50 && score !== -1) {
        $('#questionModal').modal('show');
        $(".questionMsg").html("You cracked under the pressure!")
        $("#questionFlavor").html('<div style="width:100%;height:0;padding-bottom:56%;position:relative;"><iframe src="https://giphy.com/embed/69warOL5MBhyzjAMov"' + gliphyEmbed + '"https://giphy.com/gifs/reaction-69warOL5MBhyzjAMov"></a>');
      } else if (score !== -1) {
        $('#questionModal').modal('show');
        $(".questionMsg").html("You did it! You have graduated from the bootcamp!")
        $("#questionFlavor").html('<div style="width:100%;height:0;padding-bottom:114%;position:relative;"><iframe src="https://giphy.com/embed/3oEduUGL2JaSK7oS76"' + gliphyEmbed + '"https://giphy.com/gifs/jimmy-fallon-graduation-dwane-johnson-3oEduUGL2JaSK7oS76"></a>');
      } else {
        $('#questionModal').modal('show');
        $(".questionMsg").html("You have shuffled off this mortal coil. I hope that trip was worth it.")
        $("#questionFlavor").html('<div style="width:100%;height:0;padding-bottom:75%;position:relative;"><iframe src="https://giphy.com/embed/xTiTnMjBxzRzgs7wMo"' + gliphyEmbed + '"https://giphy.com/gifs/dead-river-pinnochio-xTiTnMjBxzRzgs7wMo"></a>');
      }
      //only update highscore on db if new score is higher than previous highscore
      if (score > highestScore && score !== -1 && stress < 50) {
        var data = {
          currentScore: 20,
          currentStress: 20,
          highScore: score,
          highStress: stress,
          currentQuestionId: 1
        };
        $.ajax({
          method: "PUT",
          url: "/api/high/users/" + user,
          data: data
        }).then(function () {
          updatedScoreboard();
        });
      } else {
        var data = {
          currentScore: 20,
          currentStress: 20,
          highScore: highestScore,
          highStress: highestStress,
          currentQuestionId: 1
        };
        $.ajax({
          method: "PUT",
          url: "/api/high/users/" + user,
          data: data
        }).then(function () {
          updatedScoreboard();
        });
      }
    });
  }
  //display scoreboard by highscore (top 10)
  function updatedScoreboard() {
    $.ajax({
      method: "GET",
      url: "/api/scoreboard"
    }).then(function (result) {
      result.forEach(function (user) {
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
  }

  $('#reset-button').on('click', function () {
    window.location.href = "/classroom";
  });

  $('#changeUser-button').on('click', function () {
    window.location.href = "/";
  });

  saveScoreFinal();
});
