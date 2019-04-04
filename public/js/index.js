$(document).ready(function() {
  localStorage.setItem("username", "null");
  //user login process
  $("#btnLogin").on("click", function(event) {
    event.preventDefault();
    console.log("You signed in");

    var username = $("#returning-user-name").val().trim().toLowerCase();
    var password = $("#returning-user-password").val();
    console.log("Form user:", username, password);
    var loginObject = { username: username, password: password };
    localStorage.setItem("username", username);

    $.ajax({
      method: "POST",
      url: "/password",
      data: loginObject
    }).then(function(result) {
      if (result === true) {
        window.location.href = "/classroom";
      } else {
        $("#loginMsg").append(result);
        $("#loginModal").show();
        $("#returning-user-password").val("");
      }
    });
  });

  //new user sign-up
  $("#btnSignUp").on("click", function(event) {
    event.preventDefault();
    console.log("You signed up for a new user");
    //define our new value variables
    var username = $("#new-user-name").val().trim().toLowerCase();
    var password = $("#new-user-password").val();
    var passwordVerify = $("#new-user-password-verify").val();
    localStorage.setItem("username", username);

    var newUser = {
      username: username,
      password: password,
      passwordVerify: passwordVerify
    };

    $.ajax({
      method: "POST",
      url: "/api/user",
      data: newUser,
      dataType: "json",
      error: function(jqXHR, textStatus, errorThrown) {
        console.log("jqXHR Contents:\n");
        console.log(jqXHR);
        console.log("textStatus: ");
        console.log(textStatus);
        console.log("errorThrown: ");
        console.log(errorThrown);
        var loginErrors = jqXHR.responseJSON.errors;
        loginErrors.forEach(function(error) {
          $("#loginMsg").append(error.msg);
          $("#loginMsg").append("\n");
        });
        $("#loginModal").show();
      },
      success: function(data, textStatus, jqXHR) {
        //model shows new user added + username
        console.log("jqXHR Contents:\n");
        console.log(jqXHR);
      }
    }).then(function() {
      //log our new object
      console.log("Created New User: " + newUser.username);
      console.log("Password:", newUser.password);
      window.location.href = "/classroom";
    });

    // Clear the form when submitting
    $("#new-user-name").val("");
    $("#new-user-password").val("");
    $("#new-user-password-verify").val("");
  });

  // loginModal close button closure action
  $(document).on("click", "#loginModalClose", function() {
    $("#loginModal").hide();
    $("#loginMsg").empty();
  });
});
