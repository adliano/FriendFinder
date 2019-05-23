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
 * Method findMatch()
 * @param {JSON} currentUsrObj
 * @returns Promise
 *
 * This Method will compares users scores and find the closest match
 */
function findMatch(currentUsrObj) {
  // Get Array with score ofcurrent user
  let _currentUsrScores = currentUsrObj.score;
  // Return a Promise
  return new Promise((resolve, reject) => {
    //
    // Clear console for better debug
    console.clear();
    // Loop throught friends array to calculate results
    friends.forEach(function(item) {
      let _results = [];
      //console.log(item.score);
      item.score.forEach(function(item, index) {
        _results.push(Math.abs(item - _currentUsrScores[index]));
      });
      console.log(_results.reduce((a, b) => parseInt(a) + parseInt(b)));
    });
    //
    resolve("user matched");
  });
}

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
  findMatch(req.body)
    .then(user => {
      console.log(`inside then and user = ${user}`);
    })
    .then(() => friends.push(req.body));

  //////////
  res.json({ ok: true });
  //console.log(friends);
});

/**
 *
 * SERVER LISTEN
 *
 */
app.listen(PORT, function() {
  console.log(`Server runnig on PORT ${PORT}`);
});

//
/** Notes
 * fruits.forEach(function(item, index, array) {
  console.log(item, index);
});
 */
