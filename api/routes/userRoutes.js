const userController = require('../controllers/userController')
const User = require('../models/userModel')

module.exports = function(app) {
  app.route('/users')
    .get(userController.get_users)
    .post(userController.create_user);

  app.route('/login').post(authenticateLogin);
  app.route('/register').post(userController.create_user);
};

function authenticateLogin(req, res, next) {
  if(req.body.username && req.body.password){
    User.authenticate(req.body.username, req.body.password, function(err, user){
      if(err || !user){
        const err = new Error('Invalid email/password');
        err.status = 401;
        return next(err);
      } else {
        return res.json(user);
      }
    })
  } else {
    const err = new Error('All fields required')
    err.status = 400;
  }
}
