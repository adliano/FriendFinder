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
 * SERVER LISTEN
 *
 */
app.listen(PORT, function() {
  console.log(`Server runnig on PORT ${PORT}`);
});
