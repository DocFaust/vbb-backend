//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const Player = require("../models");
const router = express.Router();

let PlayerProvider = require("../PlayerProvider").PlayerProvider;
let playerProvider = new PlayerProvider();

router
  .route("/")
  .get((req, res) => {
    playerProvider.findAll((err, foundPlayers) => {
      if (err) {
        res.send(err);
      } else {
        res.send(foundPlayers);
      }
    });
  })
  .post((req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    playerProvider.create(firstName, lastName, email, (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send("Ok");
      }
    });
  })
  .delete((req, res) => {
    playerProvider.deleteAll((err) => {
      if (err) {
        res.send(err);
      } else {
        res.send("Players deleted");
      }
    });
  });

module.exports = router;
