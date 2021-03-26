//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();

let SeasonProvider = require("../SeasonProvider").SeasonProvider;
let seasonProvider = new SeasonProvider();

router.route("/")
    .get((req, res) => {
    seasonProvider.findAll((err, foundSeasons) => {
      if (err) {
        res.send(err);
      } else {
        res.send(foundSeasons);
      }
    });
  })
  .post((req, res) => {
    const name = req.body.name;
    const dateFrom = req.body.dateFrom;
    const dateTo = req.body.dateTo;
    const price = req.body.price;

    seasonProvider.create(name, dateFrom, dateTo, price, (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send("Ok");
      }
    });
  })
  .delete((req, res) => {
    seasonProvider.deleteAll((err) => {
      if (err) {
        res.send(err);
      } else {
        res.send("Seasons deleted");
      }
    });
  });

module.exports = router