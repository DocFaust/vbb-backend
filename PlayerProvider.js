//jshint esversion:6
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

mongoose.connect(process.env.mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const playerSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  activityLevel: Number,
});

const Player = mongoose.model("Player", playerSchema);

PlayerProvider = function () {};

// Find all player
PlayerProvider.prototype.findAll = (callback) => {
  Player.find({}, function (err, posts) {
    callback(null, posts);
  });
};

// Create new Player
PlayerProvider.prototype.create = (firstName, lastName, email, callback) => {
  const player = new Player({
    firstName: firstName,
    lastName: lastName,
    email: email,
    activityLevel: 0,
  });

  player.save((err) => {
    if (err) {
      callback(err);
    } else {
      callback();
    }
  });
};

// Delete all players
PlayerProvider.prototype.deleteAll = (callback) => {
  Player.deleteMany((err) => {
    if (err) {
      callback(err);
    } else {
      callback();
    }
  });
};

//Find player by ID
PlayerProvider.prototype.findById = (id, callback) => {
  Player.findById(id, function (err, post) {
    if (!err) {
      callback(null, post);
    } else {
      callback(err, null);
    }
  });
};

// Replace 1 player
PlayerProvider.prototype.replace = (
  id,
  firstName,
  lastName,
  email,
  activityLevel,
  callback
) => {
  Player.update(
    { _id: id },
    {
      firstName: firstName,
      lastName: lastName,
      email: email,
      activityLevel: activityLevel,
    },
    { overwrite: true },
    (err) => {
      if (!err) {
        callback();
      } else {
        callback(err);
      }
    }
  );
};

// Update 1 player
PlayerProvider.prototype.update = (id, playerObject, callback) => {
  Player.update({ _id: id }, { $set: playerObject }, (err) => {
    if (!err) {
      callback();
    } else {
      callback(err);
    }
  });
};

// Delete 1 player
PlayerProvider.prototype.delete = (id, callback) => {
  Player.deleteOne({ _id: id }, (err) => {
    if (!err) {
      callback();
    } else {
      callback(err);
    }
  });
};

exports.PlayerProvider = PlayerProvider;
