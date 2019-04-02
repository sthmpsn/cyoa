//will use localstorage to get user, for now going to set user
$(document).ready(function () {
  if (localStorage.getItem("username") === "null") {
    alert("Please login");
    window.location.href = "/";
  }
  console.log(localStorage.getItem("username"));
  var user = localStorage.getItem("username");
  //based on the current user, we need to load in the users stats as our starting values for the game
  $.ajax({
    method: "GET",
    url: "/api/users/" + user
  }).then(function (result) {
    console.log(result);
    var question = result.currentQuestionId;
    var score = result.currentScore;
    var stress = result.currentStress;

    //make displays correct
    $("#stress-display").html(stress);
    $("#grade-display").html(score);

    console.log(question);

    function question1() {
      loseConditions();
      $('.currentQuestion').html('<h4 class="question">It&apos;s the first day of class. You&apos;re a little nervous. Some funny cat videos might help you relax.');
      $('.currentQuestion').append('<button id="youtube" class="answer btn" data-toggle="modal" data-target="#questionModal" data-backdrop="static" data-keyboard="false">');
      $('.currentQuestion').append('<br><button id="vsc" class="answer btn" data-toggle="modal" data-target="#questionModal"data-backdrop="static" data-keyboard="false">');
      $('.answer').click(function () {
        var userChoice = this.id;
        if (userChoice === 'youtube') {
          console.log("That cat was adorable");
          $(".questionMsg").html("That cat was adorable")
          $("#questionFlavor").html('<div style="width:100%;height:0;padding-bottom:100%;position:relative;"><iframe src="https://giphy.com/embed/ukgcHmvflVWjwE8eU5" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><a href="https://giphy.com/gifs/kitten-inspiration-cute-cat-ukgcHmvflVWjwE8eU5"></a>');
          score -= 5;
          stress -= 5;
        } else {
          console.log("Wow, that was a lot of information!")
          $(".questionMsg").html("Wow, that was a lot of information!")
          $("#questionFlavor").html('<div style="width:100%;height:0;padding-bottom:71%;position:relative;"><iframe src="https://giphy.com/embed/1NRcfqSvJxVnLumGV9" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><a href="https://giphy.com/gifs/punch-card-computer-1NRcfqSvJxVnLumGV9"></a>');
          score += 10;
          stress += 10;
        }
        $('#questionModalNext').click(function () {
          question++;
          saveScore();
          question2();
        });
      });
    }

    function question2() {
      loseConditions();
      $('.currentQuestion').html('<h4 class="question">A blizzard has descended on the land. Do you brave the elements or try to learn remotely?');
      $('.currentQuestion').append('<button id="A" class="answer btn" data-toggle="modal" data-target="#questionModal" data-backdrop="static" data-keyboard="false">It is just a little snow!');
      $('.currentQuestion').append('<br><button id="B" class="answer btn" data-toggle="modal" data-target="#questionModal" data-backdrop="static" data-keyboard="false">Better safe than sorry.');
      $('.currentQuestion').append('<br><button id="C" class="answer btn" data-toggle="modal" data-target="#questionModal" data-backdrop="static" data-keyboard="false">Do you want to build a snowman?');
      $('.answer').click(function () {
        var userChoice = this.id;
        console.log(userChoice);
        switch (userChoice) {
          case 'A':
            var outcome = Math.floor(Math.random() * 2);
            if (outcome === 0) {
              console.log("The snow was too deep. You didn't make it to class.");
              $(".questionMsg").html("The snow was too deep. You didn't make it to class.")
              $("#questionFlavor").html('<div style="width:100%;height:0;padding-bottom:54%;position:relative;"><iframe src="https://giphy.com/embed/xUOwGoV4fmBd0fiyGI" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><a href="https://giphy.com/gifs/groundhog-day-xUOwGoV4fmBd0fiyGI"></a>')
              score -= 5;
              stress += 15;
            } else {
              console.log("You made it");
              $(".questionMsg").html("Through sheer ingenuity, you made it to class.")
              $("#questionFlavor").html('<div style="width:100%;height:0;padding-bottom:56%;position:relative;"><iframe src="https://giphy.com/embed/Wib2MfNmcI6PK" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><a href="https://giphy.com/gifs/mic-jonas-blizzard-snowstorm-Wib2MfNmcI6PK"></a>')
              score += 15;
              stress -= 5;
            }
            break;
          case 'B':
            var outcome = Math.floor(Math.random() * 4);
            if (outcome === 0) {
              console.log("Your internet went out");
              $(".questionMsg").html("Just as class begins, your internet goes out.")
              $("#questionFlavor").html('<div style="width:100%;height:0;padding-bottom:52%;position:relative;"><iframe src="https://giphy.com/embed/yjos61Qgsy17q" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><a href="https://giphy.com/gifs/yjos61Qgsy17q"></a>');
              score -= 5;
              stress += 10;
            } else {
              console.log("You were able to learn");
              $(".questionMsg").html("You were able to connect remotely.")
              $("#questionFlavor").html('<div style="width:100%;height:0;padding-bottom:100%;position:relative;"><iframe src="https://giphy.com/embed/9JrkkDoJuU0FbdbUZU" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><a href="https://giphy.com/gifs/90s-drawing-welcome-9JrkkDoJuU0FbdbUZU"></a><');
              score += 5;
              stress -= 5;
            }
            break;
          case 'C':
            console.log("Nice snowman... man");
            $(".questionMsg").html("Nice snowman... man.")
            $("#questionFlavor").html('<div style="width:100%;height:0;padding-bottom:178%;position:relative;"><iframe src="https://giphy.com/embed/26Ff2l7ENOhVCJpLy" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><a href="https://giphy.com/gifs/afv-fail-snow-26Ff2l7ENOhVCJpLy"></a>');
            score -= 15;
            stress -= 15;
            break;
        }
        console.log(score);
        console.log(stress);
        $('#questionModalNext').click(function () {
          question++;
          saveScore();
          question3();
        });
      });

    }

    function question3() {
      loseConditions();
      $('.currentQuestion').html('<h4 class="question">First group project week! How do you handle it?');
      $('.currentQuestion').append('<button id="A" class="answer btn" data-toggle="modal" data-target="#questionModal" data-backdrop="static" data-keyboard="false">I&apos;ll do it all myself. I want it done right.');
      $('.currentQuestion').append('<br><button id="B" class="answer btn" data-toggle="modal" data-target="#questionModal" data-backdrop="static" data-keyboard="false">Divide the work evenly. Many hands make light work.');
      $('.currentQuestion').append('<br><button id="C" class="answer btn" data-toggle="modal" data-target="#questionModal" data-backdrop="static" data-keyboard="false">My group is pretty smart. They&apos;ve got this.');
      $('.answer').click(function () {
        var userChoice = this.id;
        console.log(userChoice);
        switch (userChoice) {
          case 'A':
            var outcome = Math.floor(Math.random() * 4);
            if (outcome === 0) {
              console.log("It was, surprisingly, a smashing success!");
              $(".questionMsg").html("It was, surprisingly, a smashing success!");
              $("#questionFlavor").html('<div style="width:100%;height:0;padding-bottom:56%;position:relative;"><iframe src="https://giphy.com/embed/QNFhOolVeCzPQ2Mx85" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><a href="https://giphy.com/gifs/checkmatedigital-code-coding-monkey-QNFhOolVeCzPQ2Mx85"></a>');
              score += 20;
              stress += 20;
            } else {
              console.log("It was an abject failure");
              $(".questionMsg").html("It was an abject failure.");
              $("#questionFlavor").html('<div style="width:100%;height:0;padding-bottom:75%;position:relative;"><iframe src="https://giphy.com/embed/3o7aCPZ3vE2ggCpWmI" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><a href="https://giphy.com/gifs/reaction-3o7aCPZ3vE2ggCpWmI"></a>');
              score -= 10;
              stress += 20;
            }
            break;
          case 'B':
            var outcome = Math.floor(Math.random() * 4);
            if (outcome === 0) {
              console.log("Try as you might, your app simply didn't work. Good effort.");
              $(".questionMsg").html("Try as you might, your app simply didn't work. Good effort.");
              $("#questionFlavor").html('<div style="width:100%;height:0;padding-bottom:100%;position:relative;"><iframe src="https://giphy.com/embed/uUlPgTGo3xE9oOWgaO" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><a href="https://giphy.com/gifs/uUlPgTGo3xE9oOWgaO"></a>');
              score += 5;
              stress += 10;
            } else {
              console.log("Your project was a success. Everyone contributed, dividing the work.");
              $(".questionMsg").html("Your project was a success. Everyone contributed, dividing the work.");
              $("#questionFlavor").html('<div style="width:100%;height:0;padding-bottom:73%;position:relative;"><iframe src="https://giphy.com/embed/dSetNZo2AJfptAk9hp" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><a href="https://giphy.com/gifs/office-teamwork-coworkers-dSetNZo2AJfptAk9hp"></a>');
              score += 10;
              stress += 5;
            }
            break;
          case 'C':
            var outcome = Math.floor(Math.random() * 4);
            if (outcome === 0) {
              console.log("Somehow you skated by and got an A despite contributing virutally nothing.");
              $(".questionMsg").html("Somehow you skated by and got an A despite contributing virtually nothing.");
              $("#questionFlavor").html('<div style="width:100%;height:0;padding-bottom:56%;position:relative;"><iframe src="https://giphy.com/embed/kHvVrjhX8LT7a" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><a href="https://giphy.com/gifs/office-space-kHvVrjhX8LT7a"></a>');
              score += 10;
              stress -= 15;
            } else {
              console.log("Your group caught on to your laziness and your name was left off of the final product.");
              $(".questionMsg").html("Your group caught on to your laziness and your name was left off of the final product.");
              $("#questionFlavor").html('<div style="width:100%;height:0;padding-bottom:75%;position:relative;"><iframe src="https://giphy.com/embed/fxBXWzY85vC2GJ9dAb" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><a href="https://giphy.com/gifs/looneytunes-cartoon-looney-tunes-classics-fxBXWzY85vC2GJ9dAb"></a>');
              score -= 20;
              stress -= 5;
            }
            break;
        }
        console.log(score);
        console.log(stress);
        $('#questionModalNext').click(function () {
          question++;
          saveScore();
          question4();
        })
      });

    }

    function question4() {
      loseConditions();
      $('.currentQuestion').html('<h4 class="question">You recieve a cold-call from a recruiter!');
      $('.currentQuestion').append('<button id="A" class="answer btn" data-toggle="modal" data-target="#questionModal" data-backdrop="static" data-keyboard="false">I call them back immediately and introduce myself.');
      $('.currentQuestion').append('<br><button id="B" class="answer btn" data-toggle="modal" data-target="#questionModal" data-backdrop="static" data-keyboard="false">I&apos;ll send an email. That should be good enough.');
      $('.currentQuestion').append('<br><button id="C" class="answer btn" data-toggle="modal" data-target="#questionModal" data-backdrop="static" data-keyboard="false">Ignore it. I&apos;m not ready.');
      $('.answer').click(function () {
        var userChoice = this.id;
        console.log(userChoice);
        switch (userChoice) {
          case 'A':
            console.log("They asked some difficult questions, but in the end you got your name out there.");
            $(".questionMsg").html("They asked some difficult questions, but in the end you got your name out there.");
            $("#questionFlavor").html('<div style="width:100%;height:0;padding-bottom:56%;position:relative;"><iframe src="https://giphy.com/embed/3o6ZsXFATUd8muVJqE" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><a href="https://giphy.com/gifs/southparkgifs-3o6ZsXFATUd8muVJqE"></a>');
            score += 10;
            stress += 10;
            break;
          case 'B':
            console.log("You recieve a form letter thanking you for your inquery.");
            $(".questionMsg").html("You recieve a form letter thanking you for your inquery.");
            $("#questionFlavor").html('<div style="width:100%;height:0;padding-bottom:75%;position:relative;"><iframe src="https://giphy.com/embed/3ofSBciYEAZTGOu0V2" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><a href="https://giphy.com/gifs/spongebob-season-4-spongebob-squarepants-3ofSBciYEAZTGOu0V2"></a>');
            score += 5;
            stress += 5;
            break;
          case 'C':
            console.log("Maybe next time");
            $(".questionMsg").html("Maybe next time");
            $("#questionFlavor").html('<div style="width:100%;height:0;padding-bottom:100%;position:relative;"><iframe src="https://giphy.com/embed/OrnuiAcxbqYX6" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><a href="https://giphy.com/gifs/reactiongifs-OrnuiAcxbqYX6"></a>');
            score -= 5;
            stress -= 5;
            break;
        }
        console.log(score);
        console.log(stress);
        $('#questionModalNext').click(function () {
          question++;
          saveScore();
          question5();
        });
      });
    }

    function question5() {
      loseConditions();
      console.log('fix the bug');
      question++;
      saveScore();
      question6();
    }

    function question6() {
      loseConditions();
      $('.currentQuestion').html('<h4 class="question">You have dysentery.');
      $('.currentQuestion').append('<button id="A" class="answer btn" data-toggle="modal" data-target="#questionModal" data-backdrop="static" data-keyboard="false">I&apos;ll go to the doctor, even though it means missing class');
      $('.currentQuestion').append('<br><button id="B" class="answer btn" data-toggle="modal" data-target="#questionModal" data-backdrop="static" data-keyboard="false">Tough it out and go to class. I can&apos;t miss a day');
      $('.currentQuestion').append('<br><button id="C" class="answer btn" data-toggle="modal" data-target="#questionModal" data-backdrop="static" data-keyboard="false">Ignore it and go for a journey somewhere in the pacific northwest');
      $('.answer').click(function () {
        var userChoice = this.id;
        console.log(userChoice);
        switch (userChoice) {
          case 'A':
            console.log("You only missed 1 class and you're right as rain");
            $(".questionMsg").html("You only missed 1 class and you're right as rain.");
            $("#questionFlavor").html('<div style="width:100%;height:0;padding-bottom:69%;position:relative;"><iframe src="https://giphy.com/embed/3o7TKKxsoUjRiUUeas" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><a href="https://giphy.com/gifs/hulu-parks-and-recreation-nbc-3o7TKKxsoUjRiUUeas"></a>');
            score -= 5;
            stress -= 10;
            console.log(score);
            console.log(stress);
            question++;
            saveScore();
            question7();
            break;
          case 'B':
            var outcome = Math.floor(Math.random() * 2);
            if (outcome === 0) {
              console.log("You over-exerted yourself and had to be hospitalized, missing 3 classes");
              $(".questionMsg").html("You over-exerted yourself and had to be hospitalized, missing 3 classes.");
              $("#questionFlavor").html('<div style="width:100%;height:0;padding-bottom:50%;position:relative;"><iframe src="https://giphy.com/embed/PADZOft6ursY" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><a href="https://giphy.com/gifs/funny-omfg-PADZOft6ursY"></a>');
              score -= 10;
              stress += 15;
              console.log(score);
              console.log(stress);
              $('#questionModalNext').click(function () {
                question++;
                saveScore();
                question7();
              });
            } else {
              console.log("You managed to stay hydrated and made it through class.");
              $(".questionMsg").html("You managed to stay hydrated and made it through class.");
              $("#questionFlavor").html('<div style="width:100%;height:0;padding-bottom:67%;position:relative;"><iframe src="https://giphy.com/embed/Djk9ilQA2jjOg" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><a href="https://giphy.com/gifs/Djk9ilQA2jjOg"></a>');
              score += 10;
              stress += 5;
              console.log(score);
              console.log(stress);
              $('#questionModalNext').click(function () {
                question++;
                saveScore();
                question7();
              })
            }
            break;
          case 'C':
            $(".questionMsg").html("You have died of dysentery.");
            $("#questionFlavor").html('<div style="width:100%;height:0;padding-bottom:75%;position:relative;"><iframe src="https://giphy.com/embed/3oz8xBKJFKAXB6JAm4" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><a href="https://giphy.com/gifs/oregon-wagon-trail-3oz8xBKJFKAXB6JAm4"></a><');
            console.log("You have died of dysentery");
            $('#questionModalNext').click(function () {
              score -= 100;
              stress += 100;
              finalscore();
            });
        }
      });
    }


    function question7() {
      loseConditions();
      $('.currentQuestion').html('<h4 class="question">It&apos;s spring break. How do you spend your free time?');
      $('.currentQuestion').append('<button id="A" class="answer btn" data-toggle="modal" data-target="#questionModal" data-backdrop="static" data-keyboard="false">Teach myself PHP and C# on the side!');
      $('.currentQuestion').append('<br><button id="B" class="answer btn" data-toggle="modal" data-target="#questionModal" data-backdrop="static" data-keyboard="false">Get caught up with class material and polish my portfolio.');
      $('.currentQuestion').append('<br><button id="C" class="answer btn" data-toggle="modal" data-target="#questionModal" data-backdrop="static" data-keyboard="false">Daytona Beach here I come!');
      $('.answer').click(function () {
        var userChoice = this.id;
        console.log(userChoice);
        switch (userChoice) {
          case 'A':
            console.log("You are a coding ninja.");
            $(".questionMsg").html("You are a coding ninja.");
            $("#questionFlavor").html('<div style="width:100%;height:0;padding-bottom:75%;position:relative;"><iframe src="https://giphy.com/embed/ukMiDlCmdv2og" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><a href="https://giphy.com/gifs/life-programmer-ukMiDlCmdv2og"></a>');
            score += 15;
            stress += 15;
            break;
          case 'B':
            console.log("Everything is looking pretty polished now.");
            $(".questionMsg").html("Everything is looking pretty polished now.");
            $("#questionFlavor").html('<div style="width:100%;height:0;padding-bottom:56%;position:relative;"><iframe src="https://giphy.com/embed/l2SpNQjFsQqH5kFva" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><a href="https://giphy.com/gifs/middle-school-movie-janitor-middle-school-movie-l2SpNQjFsQqH5kFva"></a>');
            score += 5;
            stress += 5;
            break;
          case 'C':
            console.log("Well that certainly was fun. You'll be picking sand out of your belly button for weeks.");
            $(".questionMsg").html("Well that certainly was fun. You'll be picking sand out of your belly button for weeks.");
            $("#questionFlavor").html('<div style="width:100%;height:0;padding-bottom:56%;position:relative;"><iframe src="https://giphy.com/embed/43ZlfLDPwxJLi" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><a href="https://giphy.com/gifs/fail-beach-lmao-43ZlfLDPwxJLi"></a>');
            score -= 10;
            stress -= 15;
            break;
        }
        console.log(score);
        console.log(stress);
        $('#questionModalNext').click(function () {
          question++;
          saveScore();
          question8();
        })
      });
    };

    function question8() {
      loseConditions();
      $('.currentQuestion').html('<h4 class="question">It&apos;s time for your final project!');
      $('.currentQuestion').append('<button id="A" class="answer btn" data-toggle="modal" data-target="#questionModal" data-backdrop="static" data-keyboard="false">This is my moment! I quit my job, send the kids to boarding school; this is my life now!');
      $('.currentQuestion').append('<br><button id="B" class="answer btn" data-toggle="modal" data-target="#questionModal" data-backdrop="static" data-keyboard="false">This is just another assignment. I got this.');
      $('.currentQuestion').append('<br><button id="C" class="answer btn" data-toggle="modal" data-target="#questionModal" data-backdrop="static" data-keyboard="false">I&apos;m burnt-out. I need a break.');
      $('.answer').click(function () {
        var userChoice = this.id;
        console.log(userChoice);
        switch (userChoice) {
          case 'A':
            console.log("You worked your butt off, but your final project is a masterpiece");
            $(".questionMsg").html("You worked your butt off, but your final project is a masterpiece.");
            $("#questionFlavor").html('<div style="width:100%;height:0;padding-bottom:76%;position:relative;"><iframe src="https://giphy.com/embed/xT5LMSleuVuCe24KLC" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><a href="https://giphy.com/gifs/season-7-the-simpsons-7x7-xT5LMSleuVuCe24KLC"></a>');
            score += 20;
            stress += 30;
            break;
          case 'B':
            console.log("Your final project functions and looks pretty good. Good work.");
            $(".questionMsg").html("Your final project functions and looks pretty good. Good work.");
            $("#questionFlavor").html('<div style="width:100%;height:0;padding-bottom:75%;position:relative;"><iframe src="https://giphy.com/embed/QRB6F0x3ptYHu" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><a href="https://giphy.com/gifs/day-work-home-QRB6F0x3ptYHu"></a>');
            score += 10;
            stress += 20;
            break;
          case 'C':
            console.log("You recieve a zero for this assignment, lowering your final grade.");
            $(".questionMsg").html("You recieve a zero for this assignment, lowering your final grade.");
            $("#questionFlavor").html('<div style="width:100%;height:0;padding-bottom:75%;position:relative;"><iframe src="https://giphy.com/embed/8EmeieJAGjvUI" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><a href="https://giphy.com/gifs/work-homer-simpson-8EmeieJAGjvUI"></a>');
            score -= 5;
            stress -= 5;
            break;
        }

        $('#questionModalNext').click(function () {
          loseConditions();
          question = 1;
          saveScore();
          finalscore();
        });
      });
    }



    function finalscore() {
      saveScoreFinal();
      window.location.href = "/scoreboard";
      alert("Your final score is " + score);
    }

    //this function will update the database with the score after each question, as well as the current question the user is on
    function saveScore() {
      //update the stress and grade
      $("#stress-display").html(stress);
      $("#grade-display").html(score);

      var data = {
        currentScore: score,
        currentStress: stress,
        currentQuestionId: question
      };
      console.log(data);
      $.ajax({
        method: "PUT",
        url: "/api/users/" + user,
        data: data
      }).then(function (result) {
        console.log(result);
      });
    }

    //this function will save the last score saved as the final score, and will reset the current scores
    function saveScoreFinal() {
      var data = {
        currentScore: 0,
        currentStress: 0,
        highScore: score,
        highStress: stress,
        currentQuestionId: 1
      };
      console.log(data);
      $.ajax({
        method: "PUT",
        url: "/api/high/users/" + user,
        data: data
      }).then(function (result) {
        console.log(result);
      });
    }

    function loseConditions() {
      if (score <= 0) {
        $(".questionMsg").html("You have flunked out of class")
        $("#questionFlavor").html('<div style="width:100%;height:0;padding-bottom:56%;position:relative;"><iframe src="https://giphy.com/embed/10h8CdMQUWoZ8Y" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><a href="https://giphy.com/gifs/someone-idea-lurker-10h8CdMQUWoZ8Y"></a>');
        $('#questionModalNext').click(function () {
          gameOver();
        });
      }
      if (stress >= 50) {
        $(".questionMsg").html("You have flunked out of class")
        $("#questionFlavor").html('<div style="width:100%;height:0;padding-bottom:56%;position:relative;"><iframe src="https://giphy.com/embed/69warOL5MBhyzjAMov" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><a href="https://giphy.com/gifs/reaction-69warOL5MBhyzjAMov"></a>');
        $('#questionModalNext').click(function () {
          gameOver();
        });
      }
    }

    function gameOver() {
      window.location.href = "/scoreboard";
      var data = {
        currentScore: 0,
        currentStress: 0,
        currentQuestionId: 1
      };
      console.log(data);
      $.ajax({
        method: "PUT",
        url: "/api/high/users/" + user,
        data: data
      }).then(function (result) {
        console.log(result);
      });
    }
    //our switch will determine where the player starts the game
    switch (question) {
      case 2:
        question2();
        break;
      case 3:
        question3();
        break;
      case 4:
        question4();
        break;
      case 5:
        question5();
        break;
      case 6:
        question6();
        break;
      case 7:
        question7();
        break;
      default:
        question1();
    }
  });
});
