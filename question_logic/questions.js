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
        stress += 1;
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

//Question 4

var userChoice = $('.answer').on('click').val().trim()
switch (userChoice) {
    case A:
        console.log("You had a lovely chat with Mark who said he'll keep you in mind");
        score += 1;
        stress += 1;
        break;
    case B:
        console.log("You recieved a form letter saying thank you for your communique");
        score -= 0;
        stress += 0;
        break;
    case C:
        console.log("Better get to work on that Linked-In");
        score -= 1;
        stress -= 1;
        break;
}

//Question 5

//FIX THE BUG

//Question 6

var userChoice = $('.answer').on('click').val().trim()
switch (userChoice) {
    case A:
        console.log("You went to the doctor, you missed 1 class");
        score -= 1;
        stress -= 1;
        break;
    case B:
        var outcome = Math.floor(Math.random());
        if (outcome = 0) {
            console.log("You toughed it out. You stayed hydrated");
            score += 1;
            stress += 1;
            break;
        } else {
            console.log("You pushed too hard. You missed 3 classes");
            score -=2;
            stress +=2;
        }
    case C:
        console.log("Better get to work on that Linked-In");
        score -= 1;
        stress -= 1;
        break;
}