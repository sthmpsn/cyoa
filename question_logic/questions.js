var score = 5;
var stress = 5;

//Question 1

if ($('.youTube').on('click') = youTube) {
    load video;
    score -= 1;
    stress -= 1;
}
if ($('.VSC')) {
    load VRC;
    score += 1;
    stress += 1;
}

//Question 2

var userChoice = $('.answer').on('click').val().trim()
switch (userChoice) {
    case A:
        var outcome = Math.floor(Math.random());
        if (outcome = 0) {
            console.log("You didn't make it");
            score -= 1;
            stress += 1;
        } else {
            console.log("You made it");
            score += 1;
            stress -= 1;
        }
        break;
    case B:
        var outcome = Math.floor(Math.random() * 4);
        if (outcome = 0) {
            console.log("Your internet went out");
            score -= 1;
            stress += 1;
        } else {
            console.log("You were able to learn");
            score += 1;
            stress += 1;
        }
        break;
    case C:
        console.log("Nice snowman... man");
        score -= 1;
        score += 1;
        break;
}

//Question 3

var userChoice = $('.answer').on('click').val().trim()
switch (userChoice) {
    case A:
        var outcome = Math.floor(Math.random() * 4);
        if (outcome = 0) {
            console.log("It was a smashing success");
            score += 1;
            stress += 1;
        } else {
            console.log("It was an abject failure");
            score -= 1;
            stress += 1;
        }
        break;
    case B:
        var outcome = Math.floor(Math.random() * 10);
        if (outcome = 0) {
            console.log("Your Hiroku deployment was corrupted!");
            score -= 1;
            stress += 1;
        } else {
            console.log("You got an A");
            score += 1;
            stress += 0;
        }
        break;
    case C:
        console.log("Nice snowman... man");
        score -= 1;
        stress -= 1;
        break;
}