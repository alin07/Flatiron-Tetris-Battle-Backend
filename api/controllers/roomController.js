'use strict';
var mongoose = require('mongoose'),
  Room = mongoose.model('Room');

exports.get_rooms = function(req, res) {
  Room.find({}, function(err, room) {
    if (err)
      res.send(err);
    res.json(room);
  });
};

exports.create_room = function(req, res) {
  var new_room = new Room(req.body);
  new_room.save(function(err, room) {
    if (err)
      res.send(err);
    res.json(room);
  });
};


exports.get_room = function(req, res) {
  Room.findById(req.params.roomId, function(err, room) {
    if (err)
      res.send(err);
    res.json(room);
  });
};


exports.leave_room = function(req, res) {
  Room.findOneAndUpdate({_id: req.params.roomId}, req.body, {new: true}, function(err, room) {
    if (err)
      res.send(err);
    res.json(room);
  });
};

exports.join_room = function(req, res) {
  Room.findOneAndUpdate({_id: req.body.roomId}, req.body, {new: true}, function(err, room) {
    if (err)
      res.send(err);
    res.json(room);
  });
};


exports.disband_room = function(req, res) {
  Room.remove({
    _id: req.params.roomId
  }, function(err, room) {
    if (err)
      res.send(err);
    res.json({ message: 'Room successfully deleted' });
  });
};
