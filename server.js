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
 * @param {Array} usrScore
 * @returns Promise
 *
 * This Method will compares users scores and find the closest match
 */
function findMatch(usrScore) {
  // Return a Promise
  return new Promise((resolve, reject) => {
    // Max possible score will be 40
    let _matchedUser = { score: 40 };
    //
    // Clear console for better debug
    console.clear();
    // Loop throught friends array to calculate results
    friends.forEach(function(item, usrIndex) {
      let _results = 0;

      //console.log(item.score);
      // Loop through score array
      item.score.forEach(function(item, index) {
        // Get Sum of Diferrence between current user score and saved user score
        _results = _results + Math.abs(item - usrScore[index]);
      });
      // Check if score its close to current user and get its index
      if (_matchedUser.score > _results) {
        _matchedUser.score = _results;
        _matchedUser.index = usrIndex;
      }
    });
    // Pass the Mathed user
    resolve(friends[_matchedUser.index]);
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
  // Call method findMath() to find Matched user
  findMatch(req.body.score).then(user => {
    // then send the matched user to client
    res.json(user);
    // and add it to friends array
    friends.push(req.body);
  });
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
