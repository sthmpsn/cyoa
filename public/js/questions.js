//will use localstorage to get user, for now going to set user
$(document).ready(function () {
  var user = "user01";

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
    // $('.startButton').on('click', function () {
    //     question1();
    //     score = 5;
    //     stress = 5;
    // });

    function question1() {
      //add the question text and options
      $(".currentQuestion").html(
        "<h4 class=\"question\">It&apos;s the first day of class. You&apos;re a little nervous. Some funny cat videos might help you relax."
      );
      $(".currentQuestion").append("<button id=\"youtube\" class=\"answer btn\">");
      $(".currentQuestion").append("<br><button id=\"vsc\" class=\"answer btn\">");
      $("button").click(function () {
        //user makes a selection
        var userChoice = this.id;

        //choice options
        if (userChoice === "youtube") {
          console.log("That cat was adorable");
          score -= 1;
          stress -= 1;
        } else {
          console.log("Wow, that was a lot of information!");
          score += 1;
          stress += 1;
        }
        question++;
        saveScore();
        console.log(score);
        console.log(stress);
        question2();
      });
    }

    function question2() {
      
      $(".currentQuestion").html(
        "<h4 class=\"question\">A blizzard has descended on the land. Do you brave the elements or try to learn remotely?"
      );
      $(".currentQuestion").append(
        "<button id=\"A\" class=\"answer btn\">It is just a little snow!"
      );
      $(".currentQuestion").append(
        "<br><button id=\"B\" class=\"answer btn\">Better safe than sorry."
      );
      $(".currentQuestion").append(
        "<br><button id=\"C\" class=\"answer btn\">Do you want to build a snowman?"
      );
      $("button").click(function () {
        var userChoice = this.id;
        console.log(userChoice);
        switch (userChoice) {
          case "A":
            var outcome = Math.floor(Math.random() * 2);
            if (outcome === 0) {
              console.log("You didn't make it");
              score -= 1;
              stress += 1;
            } else {
              console.log("You made it");
              score += 1;
              stress -= 1;
            }
            break;
          case "B":
            var outcome = Math.floor(Math.random() * 4);
            if (outcome === 0) {
              console.log("Your internet went out");
              score -= 1;
              stress += 1;
            } else {
              console.log("You were able to learn");
              score += 1;
              stress += 1;
            }
            break;
          case "C":
            console.log("Nice snowman... man");
            score -= 1;
            stress -= 1;
            break;
        }
        console.log(score);
        console.log(stress);
        question++;
        saveScore();
        question3();
      });
    }

    function question3() {
      $(".currentQuestion").html(
        "<h4 class=\"question\">First group project week! How do you handle it?"
      );
      $(".currentQuestion").append(
        "<button id=\"A\" class=\"answer btn\">I&apos;ll do it all myself. I want it done right."
      );
      $(".currentQuestion").append(
        "<br><button id=\"B\" class=\"answer btn\">Divide the work evenly. Many hands make light work."
      );
      $(".currentQuestion").append(
        "<br><button id=\"C\" class=\"answer btn\">My group is pretty smart. They&apos;ve got this."
      );
      $("button").click(function () {
        var userChoice = this.id;
        console.log(userChoice);
        switch (userChoice) {
          case "A":
            var outcome = Math.floor(Math.random() * 4);
            if (outcome === 0) {
              console.log("It was, surprisingly, a smashing success!");
              score += 2;
              stress += 2;
            } else {
              console.log("It was an abject failure");
              score -= 2;
              stress += 2;
            }
            break;
          case "B":
            var outcome = Math.floor(Math.random() * 10);
            if (outcome === 0) {
              console.log(
                "Try as you might, your app simply didn't work. Good effort."
              );
              score -= 0;
              stress += 1;
            } else {
              console.log(
                "Your project was a success. Everyone contributed, dividing the work."
              );
              score += 1;
              stress += 0;
            }
            break;
          case "C":
            var outcome = Math.floor(Math.random() * 10);
            if (outcome === 0) {
              console.log(
                "Somehow you skated by and got an A despite contributing virutally nothing."
              );
              score += 2;
              stress -= 1;
            } else {
              console.log(
                "Your group caught on to your laziness and your name was left off of the final product."
              );
              score -= 2;
              stress += 0;
            }
            break;
        }
        console.log(score);
        console.log(stress);
        question++;
        saveScore();
        question4();
      });
    }

    function question4() {
      $(".currentQuestion").html(
        "<h4 class=\"question\">You recieve a cold-call from a recruiter!"
      );
      $(".currentQuestion").append(
        "<button id=\"A\" class=\"answer btn\">I call them back immediately and introduce myself."
      );
      $(".currentQuestion").append(
        "<br><button id=\"B\" class=\"answer btn\">I&apos;ll send an email. That should be good enough."
      );
      $(".currentQuestion").append(
        "<br><button id=\"C\" class=\"answer btn\">Ignore it. I&apos;m not ready."
      );
      $("button").click(function () {
        var userChoice = this.id;
        console.log(userChoice);
        switch (userChoice) {
          case "A":
            console.log(
              "They asked some difficult questions, but in the end you got your name out there."
            );
            score += 1;
            stress += 1;
            break;
          case "B":
            console.log(
              "You recieve a form letter thanking you for your inquery."
            );
            score += 0;
            stress += 0;
            break;
          case "C":
            console.log("Maybe next time");
            score -= 1;
            stress -= 1;
            break;
        }
        console.log(score);
        console.log(stress);
        question++;
        saveScore();
        question5();
      });
    }

    function question5() {
      console.log("fix the bug");
      question++;
      saveScore();
      question6();
    }

    function question6() {
      $(".currentQuestion").html("<h4 class=\"question\">You have dysentery.");
      $(".currentQuestion").append(
        "<button id=\"A\" class=\"answer btn\">I&apos;ll go to the doctor, even though it means missing class"
      );
      $(".currentQuestion").append(
        "<br><button id=\"B\" class=\"answer btn\">Tough it out and go to class. I can&apos;t miss a day"
      );
      $(".currentQuestion").append(
        "<br><button id=\"C\" class=\"answer btn\">Ignore it and go for a journey somewhere in the pacific northwest"
      );
      $("button").click(function () {
        var userChoice = this.id;
        console.log(userChoice);
        switch (userChoice) {
          case "A":
            console.log("You only missed 1 class and you're right as rain");
            score -= 1;
            stress -= 1;
            console.log(score);
            console.log(stress);
            question++;
            saveScore();
            question7();
            break;
          case "B":
            var outcome = Math.floor(Math.random() * 2);
            if (outcome === 0) {
              console.log(
                "You over-exerted yourself and had to be hospitalized, missing 3 classes"
              );
              score -= 2;
              stress += 2;
              console.log(score);
              console.log(stress);
              question++;
              saveScore();
              question7();
            } else {
              console.log(
                "You managed to stay hydrated and made it through class."
              );
              score += 1;
              stress += 0;
              console.log(score);
              console.log(stress);
              question++;
              saveScore();
              question7();
            }
            break;
          case "C":
            console.log("You have died of dysentery");
            score -= 100;
            stress += 100;
            finalscore();
        }
      });
    }

    function question7() {
      $(".currentQuestion").html(
        "<h4 class=\"question\">It&apos;s spring break. How do you spend your free time?"
      );
      $(".currentQuestion").append(
        "<button id=\"A\" class=\"answer btn\">Teach myself PHP and C# on the side!"
      );
      $(".currentQuestion").append(
        "<br><button id=\"B\" class=\"answer btn\">Get caught up with class material and polish my portfolio."
      );
      $(".currentQuestion").append(
        "<br><button id=\"C\" class=\"answer btn\">Daytona Beach here I come!"
      );
      $("button").click(function () {
        var userChoice = this.id;
        console.log(userChoice);
        switch (userChoice) {
          case "A":
            console.log("You are a coding ninja.");
            score += 2;
            stress += 1;
            break;
          case "B":
            console.log("Everything is looking pretty polished now.");
            score += 1;
            stress += 0;
            break;
          case "C":
            console.log(
              "Well that certainly was fun. You'll be picking sand out of your belly button for weeks."
            );
            score -= 0;
            stress -= 1;
            break;
        }
        console.log(score);
        console.log(stress);
        question++;
        saveScore();
        question8();
      });
    }

    function question8() {
      $(".currentQuestion").html(
        "<h4 class=\"question\">It&apos;s time for your final project!"
      );
      $(".currentQuestion").append(
        "<button id=\"A\" class=\"answer btn\">This is my moment! I quit my job, send the kids to boarding school; this is my life now!"
      );
      $(".currentQuestion").append(
        "<br><button id=\"B\" class=\"answer btn\">This is just another assignment. I got this."
      );
      $(".currentQuestion").append(
        "<br><button id=\"C\" class=\"answer btn\">I&apos;m burnt-out. I need a break."
      );
      $("button").click(function () {
        var userChoice = this.id;
        console.log(userChoice);
        switch (userChoice) {
          case "A":
            console.log(
              "You worked your butt off, but your final project is a masterpiece"
            );
            score += 2;
            stress += 3;
            break;
          case "B":
            console.log(
              "Your final project functions and looks pretty good. Good work."
            );
            score += 1;
            stress += 2;
            break;
          case "C":
            console.log(
              "You recieve a zero for this assignment, lowering your final grade."
            );
            score -= 1;
            stress -= 0;
            break;
        }
        console.log(score);
        console.log(stress);
        finalscore();
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
        finalScore: score,
        finalStress: stress,
        currentQuestionId: 1
      };
      console.log(data);
      $.ajax({
        method: "PUT",
        url: "/api/final/users/" + user,
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
