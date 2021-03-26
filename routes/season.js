//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();

let SeasonProvider = require("../SeasonProvider").SeasonProvider;
let seasonProvider = new SeasonProvider();

router
  .route("/:seasonId")
  .get((req, res) => {
    const id = req.params.seasonId;
    seasonProvider.findById(id, (err, foundSeason) => {
      if (err) {
        res.send(err);
      } else {
        res.send(foundSeason);
      }
    });
  })
  .put((req, res) => {
    const id = req.params.seasonId;
    const name = req.body.name;
    const dateFrom = req.body.dateFrom;
    const dateTo = req.body.dateTo;
    const price = req.body.price;

    seasonProvider.replace(
      id,
      name,
      dateFrom,
      dateTo,
      price,
      (err) => {
        if (!err) {
          res.send("Updated Successfully");
        } else {
          res.send(err);
        }
      }
    );
  })
  .patch((req, res) => {
    const id = req.params.seasonId;
    seasonProvider.update(id, req.body, (err) => {
      if (!err) {
        res.send("Updated Successfully");
      } else {
        res.send(err);
      }
    });
  })
  .delete((req, res) => {
    const id = req.params.seasonId;
    seasonProvider.delete(id, (err)=>{
      if(err){
        res.send(err);
      } else {
        res.send("Deleted successfully");
      }
    });
  });
module.exports = router;
