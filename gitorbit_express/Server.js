var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
const fetch = require("isomorphic-fetch");
require("dotenv").config({ path: "./env/tokens.env" });

const clientId = process.env.ACCESS_TOKEN;
const clientSecret = process.env.SECRET_TOKEN;

var app = express();

app.use(cors());
app.use(bodyParser.json());

app.listen(4000, function () {
  console.log("GitOrbit Express server is running on port 4000");
});

app.get("/getAccessToken", async function (req, res) {
  console.log(req.query.code);

  const params =
    "?client_id=" +
    clientId +
    "&client_secret=" +
    clientSecret +
    "&code=" +
    req.query.code;

  await fetch("https://github.com/login/oauth/access_token" + params, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);

      res.json(data);
    });
});

app.get("/getUserData", async function (req, res) {
  req.get("Authorization");

  await fetch("https://api.github.com/user", {
    method: "GET",
    headers: {
      Authorization: req.get("Authorization"),
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);

      res.json(data);
    });
});
