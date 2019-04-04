//will use localstorage to get user, for now going to set user
$(document).ready(function () {
  if (localStorage.getItem("username") === 'null' || localStorage.getItem("username" === null)) {
    alert("Please login");
    window.location.href = "/";
  }
  console.log(localStorage.getItem("username"));
  var user = localStorage.getItem("username");
  var userName = (user.charAt(0).toUpperCase() + user.slice(1));
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
    $("#user-name").html(userName); 

    // STRESS GAUGE
    var opts = {
      lines: 12, // The number of lines to draw
      angle: 0, // The length of each line
      lineWidth: 0.4, // The line thickness
      pointer: {
        length: 0.59, // The radius of the inner circle
        strokeWidth: 0.035, // The rotation offset
        color: '#cfcfcf' // Fill color
      },
      limitMax: 'false',   // If true, the pointer will not go past the end of the gauge
      generateGradient: true,
      staticZones: [
          {strokeStyle: "#30B32D", min: -50, max: -1}, // Green
          {strokeStyle: "#FFDD00", min: -1, max: 30}, // Yellow
          {strokeStyle: "#F03E3E", min: 30, max: 50}  // Red
      ],
    };
    var target = document.getElementById('canvas-preview'); // your canvas element
    var gauge = new Gauge(target).setOptions(opts); // create sexy gauge!
    gauge.maxValue = 50; // set max gauge value
    gauge.setMinValue(-10);
    gauge.animationSpeed = 32; // set animation speed (32 is default value)
    gauge.set(stress); // set actual value


    console.log(question);

    // necessary for modal fade to function and protect impropper input (clicking outside of the modal, hitting a button on the keyboard, etc)
    var modalFadeButton = 'class="answer btn" data-toggle="modal" data-target="#questionModal" data-backdrop="static" data-keyboard="false">'

    // necessary for giphy links to be responsive
    var gliphyEmbed = ' width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><a href=';

    console.log(modalFadeButton);

    function question1() {
      loseConditions();
      $('.currentQuestion').html('<h4 class="question">It&apos;s the first day of class. You&apos;re a little nervous. Some funny cat videos might help you relax.');
      $('.currentQuestion').append('<button id="youtube"' + modalFadeButton + '</button>  Relax on YouTube');
      $('.currentQuestion').append('<br><button id="vsc"' + modalFadeButton + '</button>  Pay attention to class');
      $('.answer').click(function () {
        var userChoice = this.id;
        if (userChoice === 'youtube') {
          console.log("That cat was adorable");
          $(".questionMsg").html("That cat was adorable")
          $("#questionFlavor").html('<div style="width:100%;height:0;padding-bottom:100%;position:relative;"><iframe src="https://giphy.com/embed/ukgcHmvflVWjwE8eU5"' + gliphyEmbed + '"https://giphy.com/gifs/kitten-inspiration-cute-cat-ukgcHmvflVWjwE8eU5"></a>');
          score = score -= 5;
          stress = stress -= 5;
          $("#grade").val(score);
          gauge.set(stress);
        } else {
          console.log("Wow, that was a lot of information!")
          $(".questionMsg").html("Wow, that was a lot of information!")
          $("#questionFlavor").html('<div style="width:100%;height:0;padding-bottom:71%;position:relative;"><iframe src="https://giphy.com/embed/1NRcfqSvJxVnLumGV9"' + gliphyEmbed + '"https://giphy.com/gifs/punch-card-computer-1NRcfqSvJxVnLumGV9"></a>');
          score = score += 10;
          stress = stress += 10;
          $("#grade").val(score);
          gauge.set(stress);
        }
        question++;
      });
      $('#questionModalNext').click(function () {
        saveScore();
        findQuestion();
      });
    }

    function question2() {
      loseConditions();
      $('.currentQuestion').html('<h4 class="question">A blizzard has descended on the land. Do you brave the elements or try to learn remotely?');
      $('.currentQuestion').append('<button id="A"' + modalFadeButton + 'It is just a little snow!');
      $('.currentQuestion').append('<br><button id="B"' + modalFadeButton + 'Better safe than sorry.');
      $('.currentQuestion').append('<br><button id="C"' + modalFadeButton + 'Do you want to build a snowman?');
      $('.answer').click(function () {
        var userChoice = this.id;
        console.log(userChoice);
        switch (userChoice) {
          case 'A':
            var outcome = Math.floor(Math.random() * 2);
            if (outcome === 0) {
              console.log("The snow was too deep. You didn't make it to class.");
              $(".questionMsg").html("The snow was too deep. You didn't make it to class.")
              $("#questionFlavor").html('<div style="width:100%;height:0;padding-bottom:54%;position:relative;"><iframe src="https://giphy.com/embed/xUOwGoV4fmBd0fiyGI"' + gliphyEmbed + '"https://giphy.com/gifs/groundhog-day-xUOwGoV4fmBd0fiyGI"></a>')
              score = score -= 5;
              stress = stress += 15;
              $("#grade").val(score);
              gauge.set(stress);
            } else {
              console.log("You made it");
              $(".questionMsg").html("Through sheer ingenuity, you made it to class.")
              $("#questionFlavor").html('<div style="width:100%;height:0;padding-bottom:56%;position:relative;"><iframe src="https://giphy.com/embed/Wib2MfNmcI6PK"' + gliphyEmbed + '"https://giphy.com/gifs/mic-jonas-blizzard-snowstorm-Wib2MfNmcI6PK"></a>')
              score = score += 15;
              stress = stress -= 5;
              $("#grade").val(score);
              gauge.set(stress);
            }
            break;
          case 'B':
            var outcome = Math.floor(Math.random() * 4);
            if (outcome === 0) {
              console.log("Your internet went out");
              $(".questionMsg").html("Just as class begins, your internet goes out.")
              $("#questionFlavor").html('<div style="width:100%;height:0;padding-bottom:52%;position:relative;"><iframe src="https://giphy.com/embed/yjos61Qgsy17q"' + gliphyEmbed + '"https://giphy.com/gifs/yjos61Qgsy17q"></a>');
              score = score -= 5;
              stress = stress += 10;
              $("#grade").val(score);
              gauge.set(stress);
            } else {
              console.log("You were able to learn");
              $(".questionMsg").html("You were able to connect remotely.")
              $("#questionFlavor").html('<div style="width:100%;height:0;padding-bottom:100%;position:relative;"><iframe src="https://giphy.com/embed/9JrkkDoJuU0FbdbUZU"' + gliphyEmbed + '"https://giphy.com/gifs/90s-drawing-welcome-9JrkkDoJuU0FbdbUZU"></a><');
              score = score += 5;
              stress = stress -= 5;
              $("#grade").val(score);
              gauge.set(stress);
            }
            break;
          case 'C':
            console.log("Nice snowman... man");
            $(".questionMsg").html("Nice snowman... man.")
            $("#questionFlavor").html('<div style="width:100%;height:0;padding-bottom:178%;position:relative;"><iframe src="https://giphy.com/embed/26Ff2l7ENOhVCJpLy"' + gliphyEmbed + '"https://giphy.com/gifs/afv-fail-snow-26Ff2l7ENOhVCJpLy"></a>');
            score = score -= 15;
            stress = stress -= 15;
            $("#grade").val(score);
            gauge.set(stress);
            break;
        }
        question++;
      });
      $('#questionModalNext').click(function () {
        saveScore();
        findQuestion();
      });
    }

    function question3() {
      loseConditions();
      $('.currentQuestion').html('<h4 class="question">First group project week! How do you handle it?');
      $('.currentQuestion').append('<button id="A"' + modalFadeButton + 'I&apos;ll do it all myself. I want it done right.');
      $('.currentQuestion').append('<br><button id="B"' + modalFadeButton + 'Divide the work evenly. Many hands make light work.');
      $('.currentQuestion').append('<br><button id="C"' + modalFadeButton + 'My group is pretty smart. They&apos;ve got this.');
      $('.answer').click(function () {
        var userChoice = this.id;
        console.log(userChoice);
        switch (userChoice) {
          case 'A':
            var outcome = Math.floor(Math.random() * 4);
            if (outcome === 0) {
              console.log("It was, surprisingly, a smashing success!");
              $(".questionMsg").html("It was, surprisingly, a smashing success!");
              $("#questionFlavor").html('<div style="width:100%;height:0;padding-bottom:56%;position:relative;"><iframe src="https://giphy.com/embed/QNFhOolVeCzPQ2Mx85"' + gliphyEmbed + '"https://giphy.com/gifs/checkmatedigital-code-coding-monkey-QNFhOolVeCzPQ2Mx85"></a>');
              score = score += 20;
              stress = stress += 20;
              $("#grade").val(score);
              gauge.set(stress);
            } else {
              console.log("It was an abject failure");
              $(".questionMsg").html("It was an abject failure.");
              $("#questionFlavor").html('<div style="width:100%;height:0;padding-bottom:75%;position:relative;"><iframe src="https://giphy.com/embed/3o7aCPZ3vE2ggCpWmI"' + gliphyEmbed + '"https://giphy.com/gifs/reaction-3o7aCPZ3vE2ggCpWmI"></a>');
              score = score -= 10;
              stress = stress += 20;
              $("#grade").val(score);
              gauge.set(stress);
            }
            break;
          case 'B':
            var outcome = Math.floor(Math.random() * 4);
            if (outcome === 0) {
              console.log("Try as you might, your app simply didn't work. Good effort.");
              $(".questionMsg").html("Try as you might, your app simply didn't work. Good effort.");
              $("#questionFlavor").html('<div style="width:100%;height:0;padding-bottom:100%;position:relative;"><iframe src="https://giphy.com/embed/uUlPgTGo3xE9oOWgaO"' + gliphyEmbed + '"https://giphy.com/gifs/uUlPgTGo3xE9oOWgaO"></a>');
              score = score += 5;
              stress = stress += 10;
              $("#grade").val(score);
              gauge.set(stress);
            } else {
              console.log("Your project was a success. Everyone contributed, dividing the work.");
              $(".questionMsg").html("Your project was a success. Everyone contributed, dividing the work.");
              $("#questionFlavor").html('<div style="width:100%;height:0;padding-bottom:73%;position:relative;"><iframe src="https://giphy.com/embed/dSetNZo2AJfptAk9hp"' + gliphyEmbed + '"https://giphy.com/gifs/office-teamwork-coworkers-dSetNZo2AJfptAk9hp"></a>');
              score = score += 10;
              stress = stress += 5;
              $("#grade").val(score);
              gauge.set(stress);
            }
            break;
          case 'C':
            var outcome = Math.floor(Math.random() * 4);
            if (outcome === 0) {
              console.log("Somehow you skated by and got an A despite contributing virutally nothing.");
              $(".questionMsg").html("Somehow you skated by and got an A despite contributing virtually nothing.");
              $("#questionFlavor").html('<div style="width:100%;height:0;padding-bottom:56%;position:relative;"><iframe src="https://giphy.com/embed/kHvVrjhX8LT7a"' + gliphyEmbed + '"https://giphy.com/gifs/office-space-kHvVrjhX8LT7a"></a>');
              score = score += 10;
              stress = stress -= 15;
              $("#grade").val(score);
              gauge.set(stress);
            } else {
              console.log("Your group caught on to your laziness and your name was left off of the final product.");
              $(".questionMsg").html("Your group caught on to your laziness and your name was left off of the final product.");
              $("#questionFlavor").html('<div style="width:100%;height:0;padding-bottom:75%;position:relative;"><iframe src="https://giphy.com/embed/fxBXWzY85vC2GJ9dAb"' + gliphyEmbed + '"https://giphy.com/gifs/looneytunes-cartoon-looney-tunes-classics-fxBXWzY85vC2GJ9dAb"></a>');
              score = score -= 20;
              stress = stress -= 5;
              $("#grade").val(score);
              gauge.set(stress);
            }
            break;
        }
        question++;
      });
      $('#questionModalNext').click(function () {
        saveScore();
        findQuestion();
      });
    }

    function question4() {
      loseConditions();
      $('.currentQuestion').html('<h4 class="question">You recieve a cold-call from a recruiter!');
      $('.currentQuestion').append('<button id="A"' + modalFadeButton + 'I call them back immediately and introduce myself.');
      $('.currentQuestion').append('<br><button id="B"' + modalFadeButton + 'I&apos;ll send an email. That should be good enough.');
      $('.currentQuestion').append('<br><button id="C"' + modalFadeButton + 'Ignore it. I&apos;m not ready.');
      $('.answer').click(function () {
        var userChoice = this.id;
        console.log(userChoice);
        switch (userChoice) {
          case 'A':
            console.log("They asked some difficult questions, but in the end you got your name out there.");
            $(".questionMsg").html("They asked some difficult questions, but in the end you got your name out there.");
            $("#questionFlavor").html('<div style="width:100%;height:0;padding-bottom:56%;position:relative;"><iframe src="https://giphy.com/embed/3o6ZsXFATUd8muVJqE"' + gliphyEmbed + '"https://giphy.com/gifs/southparkgifs-3o6ZsXFATUd8muVJqE"></a>');
            score = score += 10;
            stress = stress += 10;
            $("#grade").val(score);
            gauge.set(stress);
            break;
          case 'B':
            console.log("You recieve a form letter thanking you for your inquery.");
            $(".questionMsg").html("You recieve a form letter thanking you for your inquery.");
            $("#questionFlavor").html('<div style="width:100%;height:0;padding-bottom:75%;position:relative;"><iframe src="https://giphy.com/embed/3ofSBciYEAZTGOu0V2"' + gliphyEmbed + '"https://giphy.com/gifs/spongebob-season-4-spongebob-squarepants-3ofSBciYEAZTGOu0V2"></a>');
            score = score += 5;
            stress = stress += 5;
            $("#grade").val(score);
            gauge.set(stress);
            break;
          case 'C':
            console.log("Maybe next time");
            $(".questionMsg").html("Maybe next time");
            $("#questionFlavor").html('<div style="width:100%;height:0;padding-bottom:100%;position:relative;"><iframe src="https://giphy.com/embed/OrnuiAcxbqYX6"' + gliphyEmbed + '"https://giphy.com/gifs/reactiongifs-OrnuiAcxbqYX6"></a>');
            score = score -= 5;
            stress = stress -= 5;
            $("#grade").val(score);
            gauge.set(stress);
            break;
        }
        question++;
      });
      $('#questionModalNext').click(function () {
        saveScore();
        findQuestion();
      });
    }

    function question5() {
      loseConditions();
      $('.currentQuestion').html('<h4 class="question">Find the bug.');
      $('.currentQuestion').append('<img src="images/debug.png" align="middle" usemap="#image-map">');
      $('.currentQuestion').append('<map name="image-map"><area id="meta" alt="Bug?" coords="70,54,250,77" shape="rect"><area id="no-end" alt="Bug?" coords="341,186,381,211" shape="rect"><area id="span" alt="Bug?" coords="102,207,175,230" shape="rect"><area id="source" alt="Bug?" coords="139,285,365,309" shape="rect"><area id="img" alt="Bug?" coords="449,279,498,311" shape="rect"></map>');
      $('#img').click(function () {
        $('#questionModal').modal("show");
        $(".questionMsg").html("You found the bug!");
        $('#questionFlavor').html('<div style="width:100%;height:0;padding-bottom:89%;position:relative;"><iframe src="https://giphy.com/embed/PS7d4tm1Hq6Sk" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/chris-farley-funny-comedy-PS7d4tm1Hq6Sk"></a>');
        score = score += 10;
        stress = stress -= 5;
        $("#grade").val(score);
        gauge.set(stress);
        question++;
      });
      $('#meta').click(function() {
        $('#questionModal').modal("show");
        $(".questionMsg").html("WRONG!");
        $("#questionFlavor").html('<div style="width:100%;height:0;padding-bottom:56%;position:relative;"><iframe src="https://giphy.com/embed/l4pLY0zySvluEvr0c"' + gliphyEmbed + '"https://giphy.com/gifs/hells-kitchen-kitchen-hellskitchen-l4pLY0zySvluEvr0c"></a>');
        score = score -= 5;
        stress = stress -= 5;
        $("#grade").val(score);
        gauge.set(stress);
        question++;
      });
      $('#no-end').click(function() {
        $('#questionModal').modal("show");
        $(".questionMsg").html("WRONG!");
        $("#questionFlavor").html('<div style="width:100%;height:0;padding-bottom:56%;position:relative;"><iframe src="https://giphy.com/embed/l4pLY0zySvluEvr0c"' + gliphyEmbed + '"https://giphy.com/gifs/hells-kitchen-kitchen-hellskitchen-l4pLY0zySvluEvr0c"></a>');
        score = score -= 5;
        stress = stress -= 5;
        $("#grade").val(score);
        gauge.set(stress);
        question++;
      });
      $('#span').click(function() {
        $('#questionModal').modal("show");
        $(".questionMsg").html("WRONG!");
        $("#questionFlavor").html('<div style="width:100%;height:0;padding-bottom:56%;position:relative;"><iframe src="https://giphy.com/embed/l4pLY0zySvluEvr0c"' + gliphyEmbed + '"https://giphy.com/gifs/hells-kitchen-kitchen-hellskitchen-l4pLY0zySvluEvr0c"></a>');
        score = score -= 5;
        stress = stress -= 5;
        $("#grade").val(score);
        gauge.set(stress);
        question++;
      });
      $('#source').click(function() {
        $('#questionModal').modal("show");
        $(".questionMsg").html("WRONG!");
        $("#questionFlavor").html('<div style="width:100%;height:0;padding-bottom:56%;position:relative;"><iframe src="https://giphy.com/embed/l4pLY0zySvluEvr0c"' + gliphyEmbed + '"https://giphy.com/gifs/hells-kitchen-kitchen-hellskitchen-l4pLY0zySvluEvr0c"></a>');
        score = score -= 5;
        stress = stress -= 5;
        $("#grade").val(score);
        gauge.set(stress);
        question++;
      });
      $('#questionModalNext').click(function () {
        saveScore();
        findQuestion();
      });
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
            $("#questionFlavor").html('<div style="width:100%;height:0;padding-bottom:69%;position:relative;"><iframe src="https://giphy.com/embed/3o7TKKxsoUjRiUUeas"' + gliphyEmbed + '"https://giphy.com/gifs/hulu-parks-and-recreation-nbc-3o7TKKxsoUjRiUUeas"></a>');
            score = score -= 5;
            stress = stress -= 10;
            $("#grade").val(score);
            gauge.set(stress);
            console.log(score);
            console.log(stress);
            $('#questionModalNext').click(function () {
              saveScore();
              findQuestion();
            })
            break;
          case 'B':
            var outcome = Math.floor(Math.random() * 2);
            if (outcome === 0) {
              console.log("You over-exerted yourself and had to be hospitalized, missing 3 classes");
              $(".questionMsg").html("You over-exerted yourself and had to be hospitalized, missing 3 classes.");
              $("#questionFlavor").html('<div style="width:100%;height:0;padding-bottom:50%;position:relative;"><iframe src="https://giphy.com/embed/PADZOft6ursY"' + gliphyEmbed + '"https://giphy.com/gifs/funny-omfg-PADZOft6ursY"></a>');
              score = score -= 10;
              stress = stress += 15;
              $("#grade").val(score);
              gauge.set(stress);
              console.log(score);
              console.log(stress);
              $('#questionModalNext').click(function () {
                saveScore();
                findQuestion();
              });
            } else {
              console.log("You managed to stay hydrated and made it through class.");
              $(".questionMsg").html("You managed to stay hydrated and made it through class.");
              $("#questionFlavor").html('<div style="width:100%;height:0;padding-bottom:67%;position:relative;"><iframe src="https://giphy.com/embed/Djk9ilQA2jjOg"' + gliphyEmbed + '"https://giphy.com/gifs/Djk9ilQA2jjOg"></a>');
              score = score += 10;
              stress = stress += 5;
              $("#grade").val(score);
              gauge.set(stress);
              console.log(score);
              console.log(stress);
              $('#questionModalNext').click(function () {
                saveScore();
                findQuestion();
              });
            }
            break;
          case 'C':
            $(".questionMsg").html("You have died of dysentery.");
            $("#questionFlavor").html('<div style="width:100%;height:0;padding-bottom:75%;position:relative;"><iframe src="https://giphy.com/embed/3oz8xBKJFKAXB6JAm4"' + gliphyEmbed + '"https://giphy.com/gifs/oregon-wagon-trail-3oz8xBKJFKAXB6JAm4"></a><');
            console.log("You have died of dysentery");
            score = score = -1;
            stress = stress = -1;
            $("#grade").val(score);
            gauge.set(stress);
            $('#questionModalNext').click(function () {
              finalscore();
            });
        }
        question++;
      });
    }

    function question7() {
      loseConditions();
      $('.currentQuestion').html('<h4 class="question">It&apos;s spring break. How do you spend your free time?');
      $('.currentQuestion').append('<button id="A"' + modalFadeButton + 'Teach myself PHP and C# on the side!');
      $('.currentQuestion').append('<br><button id="B"' + modalFadeButton + 'Get caught up with class material and polish my portfolio.');
      $('.currentQuestion').append('<br><button id="C"' + modalFadeButton + 'Daytona Beach here I come!');
      $('.answer').click(function () {
        var userChoice = this.id;
        console.log(userChoice);
        switch (userChoice) {
          case 'A':
            console.log("You are a coding ninja.");
            $(".questionMsg").html("You are a coding ninja.");
            $("#questionFlavor").html('<div style="width:100%;height:0;padding-bottom:75%;position:relative;"><iframe src="https://giphy.com/embed/ukMiDlCmdv2og"' + gliphyEmbed + '"https://giphy.com/gifs/life-programmer-ukMiDlCmdv2og"></a>');
            score = score += 15;
            stress = stress += 15;
            $("#grade").val(score);
            gauge.set(stress);
            break;
          case 'B':
            console.log("Everything is looking pretty polished now.");
            $(".questionMsg").html("Everything is looking pretty polished now.");
            $("#questionFlavor").html('<div style="width:100%;height:0;padding-bottom:56%;position:relative;"><iframe src="https://giphy.com/embed/l2SpNQjFsQqH5kFva"' + gliphyEmbed + '"https://giphy.com/gifs/middle-school-movie-janitor-middle-school-movie-l2SpNQjFsQqH5kFva"></a>');
            score = score += 5;
            stress = stress += 5;
            $("#grade").val(score);
            gauge.set(stress);
            break;
          case 'C':
            console.log("Well that certainly was fun. You'll be picking sand out of your belly button for weeks.");
            $(".questionMsg").html("Well that certainly was fun. You'll be picking sand out of your belly button for weeks.");
            $("#questionFlavor").html('<div style="width:100%;height:0;padding-bottom:56%;position:relative;"><iframe src="https://giphy.com/embed/43ZlfLDPwxJLi"' + gliphyEmbed + '"https://giphy.com/gifs/fail-beach-lmao-43ZlfLDPwxJLi"></a>');
            score = score -= 10;
            stress = stress -= 15;
            $("#grade").val(score);
            gauge.set(stress);
            break;
        }
        question++;
      });
      $('#questionModalNext').click(function () {
        saveScore();
        question8();
      });
    }

    function question8() {
      loseConditions();
      $('.currentQuestion').html('<h4 class="question">It&apos;s time for your final project!');
      $('.currentQuestion').append('<button id="A"' + modalFadeButton + 'This is my moment! I quit my job, send the kids to boarding school; this is my life now!');
      $('.currentQuestion').append('<br><button id="B"' + modalFadeButton + 'This is just another assignment. I got this.');
      $('.currentQuestion').append('<br><button id="C"' + modalFadeButton + 'I&apos;m burnt-out. I need a break.');
      $('.answer').click(function () {
        var userChoice = this.id;
        console.log(userChoice);
        switch (userChoice) {
          case 'A':
            console.log("You worked your butt off, but your final project is a masterpiece");
            $(".questionMsg").html("You worked your butt off, but your final project is a masterpiece.");
            $("#questionFlavor").html('<div style="width:100%;height:0;padding-bottom:76%;position:relative;"><iframe src="https://giphy.com/embed/xT5LMSleuVuCe24KLC"' + gliphyEmbed + '"https://giphy.com/gifs/season-7-the-simpsons-7x7-xT5LMSleuVuCe24KLC"></a>');
            score = score += 20;
            stress = stress += 20;
            $("#grade").val(score);
            gauge.set(stress);
            break;
          case 'B':
            console.log("Your final project functions and looks pretty good. Good work.");
            $(".questionMsg").html("Your final project functions and looks pretty good. Good work.");
            $("#questionFlavor").html('<div style="width:100%;height:0;padding-bottom:75%;position:relative;"><iframe src="https://giphy.com/embed/QRB6F0x3ptYHu"' + gliphyEmbed + '"https://giphy.com/gifs/day-work-home-QRB6F0x3ptYHu"></a>');
            score = score += 10;
            stress = stress += 10;
            $("#grade").val(score);
            gauge.set(stress);
            break;
          case 'C':
            console.log("You recieve a zero for this assignment, lowering your final grade.");
            $(".questionMsg").html("You recieve a zero for this assignment, lowering your final grade.");
            $("#questionFlavor").html('<div style="width:100%;height:0;padding-bottom:75%;position:relative;"><iframe src="https://giphy.com/embed/8EmeieJAGjvUI"' + gliphyEmbed + '"https://giphy.com/gifs/work-homer-simpson-8EmeieJAGjvUI"></a>');
            score = score -= 5;
            stress = stress -= 5;
            $("#grade").val(score);
            gauge.set(stress);
            break;
        }
        question++;
      });
      $('#questionModalNext').click(function () {
        saveScore();
        finalscore();
      });
    }

    function finalscore() {
      // saveScoreFinal();
      window.location.href = "/scoreboard";
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

    function loseConditions() {
      if (score <= 0 || stress >= 50) {
        window.location.href = "/scoreboard";
      }
    }
    //switch will determine where the player starts the game
    function findQuestion() {
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
    }
    findQuestion();
  });
});
