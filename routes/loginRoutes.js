var db = require("../models");
const bcrypt = require('bcryptjs');

module.exports = function (app) {
    //this post route is for checking passwords entered in the login
    app.post("/password", function (req, res) {
        db.User.findAll({}).then(function (result) {
            var currentUser;
            var userExists = false;

            //loop through db to see if entered username matches
            for (var i = 0; i < result.length; i++) {
                if (result[i].username === req.body.username) {
                    //user is in the database, so set userExists to true
                    currentUser = result[i];
                    userExists = true;
                }
            }
            //if user exists, check for password
            if (userExists) {
                console.log(req.body.password, currentUser.password);
                bcrypt.compare(req.body.password, currentUser.password).then(function(find) {
                    if (find) {
                        res.send("User logged in");
                    } else {
                        //send boolean to user with whether password is true or not
                        res.send("Incorrect password");
                    }
                });
            } else {
                res.send("Incorrect username")
            }
        })
    });
}
