var score = 5;
var stress = 5;

function question1() {
    $('.currentQuestion').html('<h4 class="question">It&apos;s the first day of class. You&apos;re a little nervous. Some funny cat videos might help you relax.');
    $('.currentQuestion').append('<button id="youtube" class="answer btn" data-toggle="modal" data-target="#questionModal">');
    $('.currentQuestion').append('<br><button id="vsc" class="answer btn">');
    $('button').click(function () {
        var userChoice = this.id;
        if (userChoice === 'youtube') {
            console.log("That cat was adorable");
            $(".questionMsg").html("That cat was adorable")
            score -= 1;
            stress -= 1;
        } else {
            console.log("Wow, that was a lot of information!")
            $(".questionMsg").html("Wow, that was a lot of information!")
            score += 1;
            stress += 1;
        }
        // $('#questionModal').show();
        $('#questionModalNext').click(function () {
            question2()
        })
    })
}

function question2() {
    // $('#questionModal').hide();
    $('.currentQuestion').html('<h4 class="question">A blizzard has descended on the land. Do you brave the elements or try to learn remotely?');
    $('.currentQuestion').append('<button id="A" class="answer btn">It is just a little snow!');
    $('.currentQuestion').append('<br><button id="B" class="answer btn">Better safe than sorry.');
    $('.currentQuestion').append('<br><button id="C" class="answer btn">Do you want to build a snowman?');
    $('button').click(function () {
        var userChoice = this.id;
        console.log(userChoice);
        switch (userChoice) {
            case 'A':
                var outcome = Math.floor(Math.random() * 2);
                if (outcome === 0) {
                    console.log("You didn't make it");
                    $(".questionMsg").html("You didn't make it.")
                    score -= 1;
                    stress += 1;
                } else {
                    console.log("You made it");
                    $(".questionMsg").html("You made it.")
                    score += 1;
                    stress -= 1;
                }
                break;
            case 'B':
                var outcome = Math.floor(Math.random() * 4);
                if (outcome === 0) {
                    console.log("Your internet went out");
                    $(".questionMsg").html("Your internet went out.")
                    score -= 1;
                    stress += 1;
                } else {
                    console.log("You were able to learn");
                    $(".questionMsg").html("You were able to connect remotely.")
                    score += 1;
                    stress += 1;
                }
                break;
            case 'C':
                console.log("Nice snowman... man");
                $(".questionMsg").html("Nice snowman... man.")
                score -= 1;
                stress -= 1;
                break;
        }
        $('#questionModal').show();
        console.log(score);
        console.log(stress);
        $('#questionModalNext').click(function () {
            question3()
        })
    });

}

function question3() {
    $('#questionModal').hide();
    $('.currentQuestion').html('<h4 class="question">First group project week! How do you handle it?');
    $('.currentQuestion').append('<button id="A" class="answer btn">I&apos;ll do it all myself. I want it done right.');
    $('.currentQuestion').append('<br><button id="B" class="answer btn">Divide the work evenly. Many hands make light work.');
    $('.currentQuestion').append('<br><button id="C" class="answer btn">My group is pretty smart. They&apos;ve got this.');
    $('button').click(function () {
        var userChoice = this.id;
        console.log(userChoice);
        switch (userChoice) {
            case 'A':
                var outcome = Math.floor(Math.random() * 4);
                if (outcome === 0) {
                    console.log("It was, surprisingly, a smashing success!");
                    $(".questionMsg").html("It was, surprisingly, a smashing success!");
                    score += 2;
                    stress += 2;
                } else {
                    console.log("It was an abject failure");
                    $(".questionMsg").html("It was an abject failure.");
                    score -= 2;
                    stress += 2;
                }
                break;
            case 'B':
                var outcome = Math.floor(Math.random() * 10);
                if (outcome === 0) {
                    console.log("Try as you might, your app simply didn't work. Good effort.");
                    $(".questionMsg").html("Try as you might, your app simply didn't work. Good effort.");
                    score -= 0;
                    stress += 1;
                } else {
                    console.log("Your project was a success. Everyone contributed, dividing the work.");
                    $(".questionMsg").html("Your project was a success. Everyone contributed, dividing the work.");
                    score += 1;
                    stress += 0;
                }
                break;
            case 'C':
                var outcome = Math.floor(Math.random() * 10);
                if (outcome === 0) {
                    console.log("Somehow you skated by and got an A despite contributing virutally nothing.");
                    $(".questionMsg").html("Somehow you skated by and got an A despite contributing virtually nothing.");
                    score += 2;
                    stress -= 1;
                } else {
                    console.log("Your group caught on to your laziness and your name was left off of the final product.");
                    $(".questionMsg").html("Your group caught on to your laziness and your name was left off of the final product.");
                    score -= 2;
                    stress += 0;
                }
                break;
        }
        $('#questionModal').show();
        console.log(score);
        console.log(stress);
        $('#questionModalNext').click(function () {
            question4()
        })
    });

}

function question4() {
    $('#questionModal').hide();
    $('.currentQuestion').html('<h4 class="question">You recieve a cold-call from a recruiter!');
    $('.currentQuestion').append('<button id="A" class="answer btn">I call them back immediately and introduce myself.');
    $('.currentQuestion').append('<br><button id="B" class="answer btn">I&apos;ll send an email. That should be good enough.');
    $('.currentQuestion').append('<br><button id="C" class="answer btn">Ignore it. I&apos;m not ready.');
    $('button').click(function () {
        var userChoice = this.id;
        console.log(userChoice);
        switch (userChoice) {
            case 'A':
                console.log("They asked some difficult questions, but in the end you got your name out there.");
                $(".questionMsg").html("They asked some difficult questions, but in the end you got your name out there.");
                score += 1;
                stress += 1;
                break;
            case 'B':
                console.log("You recieve a form letter thanking you for your inquery.");
                $(".questionMsg").html("You recieve a form letter thanking you for your inquery.");
                score += 0;
                stress += 0;
                break;
            case 'C':
                console.log("Maybe next time");
                $(".questionMsg").html("Maybe next time");
                score -= 1;
                stress -= 1;
                break;
        }
        $('#questionModal').show();
        console.log(score);
        console.log(stress);
        $('#questionModalNext').click(function () {
            question5()
        })
    });
};

function question5() {
    $('#questionModal').hide();
    console.log('fix the bug');
    question6();
};

function question6() {
    $('#questionModal').hide();
    $('.currentQuestion').html('<h4 class="question">You have dysentery.');
    $('.currentQuestion').append('<button id="A" class="answer btn">I&apos;ll go to the doctor, even though it means missing class');
    $('.currentQuestion').append('<br><button id="B" class="answer btn">Tough it out and go to class. I can&apos;t miss a day');
    $('.currentQuestion').append('<br><button id="C" class="answer btn">Ignore it and go for a journey somewhere in the pacific northwest');
    $('button').click(function () {
        var userChoice = this.id;
        console.log(userChoice);
        switch (userChoice) {
            case 'A':
                console.log("You only missed 1 class and you're right as rain");
                $(".questionMsg").html("You only missed 1 class and you're right as rain.");
                score -= 1;
                stress -= 1;
                console.log(score);
                console.log(stress);
                question7();
                break;
            case 'B':
                var outcome = Math.floor(Math.random() * 2);
                if (outcome === 0) {
                    console.log("You over-exerted yourself and had to be hospitalized, missing 3 classes");
                    $(".questionMsg").html("You over-exerted yourself and had to be hospitalized, missing 3 classes.");
                    score -= 2;
                    stress += 2;
                    console.log(score);
                    console.log(stress);
                    $('#questionModal').show();
                    $('#questionModalNext').click(function () {
                        question7()
                    })
                } else {
                    console.log("You managed to stay hydrated and made it through class.");
                    $(".questionMsg").html("You managed to stay hydrated and made it through class.");
                    score += 1;
                    stress += 0;
                    console.log(score);
                    console.log(stress);
                    $('#questionModal').show();
                    $('#questionModalNext').click(function () {
                        question7()
                    })
                }
                break;
            case 'C':
            $(".questionMsg").html("You have died of dysentery.");
                $('#questionModal').show();
                console.log("You have died of dysentery");
                score -= 100;
                stress += 100;
                finalscore();
        }
    });
};

function question7() {
    $('#questionModal').hide();
    $('.currentQuestion').html('<h4 class="question">It&apos;s spring break. How do you spend your free time?');
    $('.currentQuestion').append('<button id="A" class="answer btn">Teach myself PHP and C# on the side!');
    $('.currentQuestion').append('<br><button id="B" class="answer btn">Get caught up with class material and polish my portfolio.');
    $('.currentQuestion').append('<br><button id="C" class="answer btn">Daytona Beach here I come!');
    $('button').click(function () {
        var userChoice = this.id;
        console.log(userChoice);
        switch (userChoice) {
            case 'A':
                console.log("You are a coding ninja.");
                $(".questionMsg").html("You are a coding ninja.");
                score += 2;
                stress += 1;
                break;
            case 'B':
                console.log("Everything is looking pretty polished now.");
                $(".questionMsg").html("Everything is looking pretty polished now.");
                score += 1;
                stress += 0;
                break;
            case 'C':
                console.log("Well that certainly was fun. You'll be picking sand out of your belly button for weeks.");
                $(".questionMsg").html("Well that certainly was fun. You'll be picking sand out of your belly button for weeks.");
                score -= 0;
                stress -= 1;
                break;
        }
        $('#questionModal').show();
        console.log(score);
        console.log(stress);
        $('#questionModalNext').click(function () {
            question8()
        })
    });
};

function question8() {
    $('#questionModal').hide();
    $('.currentQuestion').html('<h4 class="question">It&apos;s time for your final project!');
    $('.currentQuestion').append('<button id="A" class="answer btn">This is my moment! I quit my job, send the kids to boarding school; this is my life now!');
    $('.currentQuestion').append('<br><button id="B" class="answer btn">This is just another assignment. I got this.');
    $('.currentQuestion').append('<br><button id="C" class="answer btn">I&apos;m burnt-out. I need a break.');
    $('button').click(function () {
        var userChoice = this.id;
        console.log(userChoice);
        switch (userChoice) {
            case 'A':
                console.log("You worked your butt off, but your final project is a masterpiece");
                $(".questionMsg").html("You worked your butt off, but your final project is a masterpiece.");
                score += 2;
                stress += 3;
                break;
            case 'B':
                console.log("Your final project functions and looks pretty good. Good work.");
                $(".questionMsg").html("Your final project functions and looks pretty good. Good work.");
                score += 1;
                stress += 2;
                break;
            case 'C':
                console.log("You recieve a zero for this assignment, lowering your final grade.");
                $(".questionMsg").html("You recieve a zero for this assignment, lowering your final grade.");
                score -= 1;
                stress -= 0;
                break;
        }
        $('#questionModal').show();
        console.log(score);
        console.log(stress);
        $('#questionModalNext').click(function () {
            finalscore()
        })
    });
};
function finalscore() {
    $('#questionModal').hide();
    window.location.href = "/scoreboard";
    alert("Your final score is " + score);
}

question1();