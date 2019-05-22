// use fylesystem
// let fs = require("fs");
let friends = require("./app/data/friends");
// instanciate express
const express = require("express");
let app = express();
// init path nodejs module
const path = require("path");
// Default PORT used by listener for routing
const PORT = process.env.PORT || 3000;

// Midlayers to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/**
 *
 * GETs Routes
 *
 */
// home
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "./app/public/home.html"));
});
// survey
app.get("/survey", function(req, res) {
  res.sendFile(path.join(__dirname, "./app/public/survey.html"));
});

/**
 *
 * POSTs Routes
 *
 */
app.post("/api/survey", function(req, res) {
  console.log(req.body);
  //   fs.appendFile(
  //     path.join(__dirname, "./app/data/friends.js"),
  friends.push(JSON.stringify(req.body, null, 4));
  //     err => {
  //       if (err) throw err;

  res.json({ ok: true });
  //     }
  //   );
});

/**
 *
 * SERVER LISTEN
 *
 */
app.listen(PORT, function() {
  console.log(`Server runnig on PORT ${PORT}`);

  console.log(friends);
});
