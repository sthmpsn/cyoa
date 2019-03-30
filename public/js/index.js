$(document).ready(function() {
  //user login process
  $("#btnLogin").on("click", function(event) {
    event.preventDefault();
    console.log("You signed in");

    var username = $("#returning-user-name").val();
    var password = $("#returning-user-password").val();
    console.log("Form user:", username, password);
    var loginObject = { username: username, password: password };

    $.ajax({
      method: "POST",
      url: "/password",
      data: loginObject
    }).then(function(result) {
      if (result === true) {
        alert("hello");
        window.location.href = "/classroom";
      } else {
        alert(result);
      }
    });
  });

  //new user sign-up
  $("#btnSignUp").on("click", function(event) {
    event.preventDefault();
    console.log("You signed up for a new user");
    //define our new value variables
    var username = $("#new-user-name").val();
    var password = $("#new-user-password").val();
    var passwordVerify = $("#new-user-password-verify").val();

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
          $("#loginMsg").append("\r\n");
        });
        $("#loginModal").show();
      },
      success: function(data, textStatus, jqXHR) {
        //model shows new user added + username
        $("#loginMsg").append("Successfully added User: " + newUser.username);
        $("#loginModal").show();
        console.log("jqXHR Contents:\n");
        console.log(jqXHR);
      }
    }).then(function() {
      //log our new object
      console.log("Created New User: " + newUser.username);
      console.log("Password:", newUser.password);
    });

    // Clear the form when submitting
    $("#name").val("");
    $("#password").val("");
    $("#passwordCheck").val("");
  });

  // loginModal close button closure action
  $(document).on("click", "#loginModalClose", function() {
    $("#loginModal").hide();
    location.reload();
  });
});
