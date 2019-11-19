require("dotenv").config();
const express = require("express");
const routes = require("./routes");
const app = express();
const jwt = require("express-jwt");
const jwks = require("jwks-rsa");


// const session = require("express-session");

const db = require("./models");

const PORT = process.env.PORT || 3001;

const authConfig = {
  domain: "broad-truth-4721.auth0.com",
  audience: "dbdata"
};
// Define middleware here

// using JWKS from dev-o2xwghwo.auth0.com

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri:  `https://${authConfig.domain}/.well-known/jwks.json`
  }),
  audience: authConfig.audience,
  issuer: `https://${authConfig.domain}/`,
  algorithms: ['RS256']
});

app.use(jwtCheck);



app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
app.use(routes);


//Connect to MySQL Database
let syncOptions = { force: false };

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function () {
  app.listen(PORT, function () {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});