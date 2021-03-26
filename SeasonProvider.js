const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

mongoose.connect(process.env.mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const seasonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dateFrom: { type: Date, required: true },
  dateTo: { type: Date, required: true },
  price: { type: Number, required: true },
});

const Season = mongoose.model("Season", seasonSchema);

SeasonProvider = function () {};

// Find all Seasons
SeasonProvider.prototype.findAll = (callback) => {
  Season.find({}, function (err, posts) {
    callback(null, posts);
  });
};

// Create new Season
SeasonProvider.prototype.create = (name, dateFrom, dateTo, price, callback) => {
  const season = new Season({
    name: name,
    dateFrom: dateFrom,
    dateTo: dateTo,
    price: price,
  });

  season.save((err) => {
    if (err) {
      callback(err);
    } else {
      callback();
    }
  });
};

// Delete all seasons
SeasonProvider.prototype.deleteAll = (callback) => {
  Season.deleteMany((err) => {
    if (err) {
      callback(err);
    } else {
      callback();
    }
  });
};

//Find season by ID
SeasonProvider.prototype.findById = (id, callback) => {
  Season.findById(id, function (err, post) {
    if (!err) {
      callback(null, post);
    } else {
      callback(err, null);
    }
  });
};

// Replace 1 season
SeasonProvider.prototype.replace = (
  id,
  name,
  dateFrom,
  dateTo,
  price,
  callback
) => {
  Season.update(
    { _id: id },
    {
      name: name,
      dateFrom: dateFrom,
      dateTo: dateTo,
      price: price,
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

// Update 1 season
SeasonProvider.prototype.update = (id, seasonObject, callback) => {
  Season.update({ _id: id }, { $set: seasonObject }, (err) => {
    if (!err) {
      callback();
    } else {
      callback(err);
    }
  });
};

// Delete 1 season
SeasonProvider.prototype.delete = (id, callback) => {
  Season.deleteOne({ _id: id }, (err) => {
    if (!err) {
      callback();
    } else {
      callback(err);
    }
  });
};

exports.SeasonProvider = SeasonProvider;
