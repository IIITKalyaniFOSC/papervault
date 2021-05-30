const fs = require("fs");

exports.getRequestFromUser = (req, res, next) => {
  const email = req.body.email;
  const request = req.body.txtAreaInput;

  console.log(email);
  console.log(request);

  // We append the request as a file for now maybe we can add a database later

  fs.appendFile("user-request.txt", email + "  " + request  + "\n", (err) => {
    console.log(err);
  });

  res.redirect("/request.html");
};
