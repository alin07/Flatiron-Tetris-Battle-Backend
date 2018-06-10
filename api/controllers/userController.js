'use strict';
var mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Room = mongoose.model('Room');

exports.get_users = function(req, res) {
  User.find({}, function(err, users) {
    if (err) res.send(err);
    // const result = users.map(u => {
    //   u.toJSON()
    // })
    res.json(users);
  });
};

exports.get_users_by_room_id = function(req, res) {

  Room.findById(req.params.roomId, function(err, room) {
    if (err)
      res.send(err);
    User.find()
      .where('_id')
      .in(room.users)
      .exec(function(err, users){
        if (err) res.send(err);
        res.json(users);
      });

  });

}

exports.create_user = function(req, res) {
  if(req.body.username && req.body.password){
    const userInfo = {
      username: req.body.username,
      password: req.body.password
    }
    const new_user = new User(req.body);
    new_user.save(function(err, user) {
      if (err) res.send(err);
      res.json(user);
    });
  }
};
