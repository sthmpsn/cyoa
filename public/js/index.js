$(document).ready(function () {

    //user login process
    $("#btnLogin").on("click", function (event) {
        event.preventDefault();
        console.log("You signed in")

        var username = $("#returning-user-email").val();
        var password = $("#returning-user-password").val();
        console.log("Form user:", username, password);
        var loginObject = { username: username, password: password }

        $.ajax({
            method: "POST",
            url: "/password",
            data: loginObject
        }).then(function (result) {
            alert(result);
        })
    })

    //new user sign-up
    $("#btnSignUp").on("click", function (event) {
        event.preventDefault();
        console.log("You signed up for a new user")
        //define our new value variables
        var username = $("#new-user-email").val();
        var password = $("#new-user-password").val();

        var newUser = {
            username: username,
            password: password,
        };

        $.ajax({
            method: "POST",
            url: "/api/user",
            data: newUser
        }).then(function (result) {
            alert(result);
        })
    })
});