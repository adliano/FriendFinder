// use fylesystem
// let friends = require("./app/data/friends");
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

require("./app/routing/apiRoutes")(app);

/**************************************
 *
 * GETs Routes
 *
 **************************************/
// home
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "./app/public/home.html"));
});
// survey
app.get("/survey", function(req, res) {
  res.sendFile(path.join(__dirname, "./app/public/survey.html"));
});
// // API Friends
// app.get("/api/friends", function(req, res) {
//   res.send(friends);
// });

/**************************************
 *
 * POSTs Routes
 *
 **************************************/
// app.post("/api/survey", function(req, res) {
//   // Call method findMath() to find Matched user
//   findMatch(req.body.score).then(user => {
//     // then send the matched user to client
//     res.json(user);
//     // and add it to friends array
//     friends.push(req.body);
//   });
// });

/**************************************
 *
 * SERVER LISTEN
 *
 **************************************/
app.listen(PORT, function() {
  console.log(`Server runnig on PORT ${PORT}`);
});
