
module.exports = function(app) {
  const room = require('../controllers/roomController')

  app.route('/rooms')
    .get(room.get_rooms)
    .put(room.join_room)
    .post(room.create_room);

  app.route('/rooms/:roomId')
    .get(room.get_room)
    .put(room.leave_room)
    .delete(room.disband_room)
};
