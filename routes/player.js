//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();

let PlayerProvider = require("../PlayerProvider").PlayerProvider;
let playerProvider = new PlayerProvider();

router
  .route("/:playerId")
  .get((req, res) => {
    const id = req.params.playerId;
    playerProvider.findById(id, (err, foundPlayer) => {
      if (err) {
        res.send(err);
      } else {
        res.send(foundPlayer);
      }
    });
  })
  .put((req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const activityLevel = req.body.activityLevel;
    const id = req.params.playerId;

    playerProvider.replace(
      id,
      firstName,
      lastName,
      email,
      activityLevel,
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
    const id = req.params.playerId;
    playerProvider.update(id, req.body, (err) => {
      if (!err) {
        res.send("Updated Successfully");
      } else {
        res.send(err);
      }
    });
  })
  .delete((req, res) => {
    const id = req.params.playerId;
    playerProvider.delete(id, (err)=>{
      if(err){
        res.send(err);
      } else {
        res.send("Deleted successfully");
      }
    });
  });
module.exports = router;
