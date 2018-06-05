'use strict';
var mongoose = require('mongoose'),
  User = mongoose.model('User');

exports.get_users = function(req, res) {
  User.find({}, function(err, user) {
    if (err) res.send(err);
    res.json(user);
  });
};

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
