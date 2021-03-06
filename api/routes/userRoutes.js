const userController = require('../controllers/userController')
const User = require('../models/userModel')

module.exports = function(app) {
  app.route('/api/v1/users')
    .get(userController.get_users);

  app.route('/api/v1/users/:roomId')
    .get(userController.get_users_by_room_id);

  app.route('/register').post(userController.create_user);
  app.route('/login').post(authenticateLogin);
};

function authenticateLogin(req, res, next) {
  console.log('login: ', req.body)
  if(req.body.username && req.body.password){
    User.authenticate(req.body.username, req.body.password, function(err, user){
      if(err || !user){
        const err = new Error('Invalid username/password');
        err.status = 401;
        return next(err);
      } else {
        return res.json(user);
      }
    })
  }
}
