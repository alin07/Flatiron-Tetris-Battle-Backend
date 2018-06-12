'use strict';
var mongoose = require('mongoose'),
  Room = mongoose.model('Room'),
  User = mongoose.model('User');

exports.get_rooms = function(req, res) {
  Room.find({}, function(err, room) {
    if (err)
      res.send(err);
    res.json(room);
  });
};

exports.create_room = function(req, res) {
  const new_room = new Room({
    name: req.body.name,
    users: [req.body.users],
    host: mongoose.Types.ObjectId(req.body.host)
  });

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
  Room.findOneAndUpdate({ _id: req.params.roomId },
    { $pull: {users: req.body.userId} },
    { new: true },
    function(err, room) {
      if (err)
        res.send(err);
      res.json(room);
    }
  );
};

exports.join_room = function(req, res) {
  debugger;
  Room.findOneAndUpdate({ _id: req.body.roomId,  "users._id": { $ne: req.body.userId } },
     { $addToSet: { "users": req.body.userId } },
     { new: true },
     function(err, room) {
       debugger;
      if (err)
        res.send(err);
      res.json(room);
    }
  );
};


exports.disband_room = function(req, res) {
  Room.remove({
    _id: req.params.roomId
  }, function(err, resp) {
    if (err)
      res.send(err);
    res.json(req.params.roomId);
  });
};
