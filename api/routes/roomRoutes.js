
module.exports = function(app) {
  const room = require('../controllers/roomController')

  app.route('/api/v1/rooms')
    .get(room.get_rooms)
    .put(room.join_room)
    .post(room.create_room);

  app.route('/api/v1/rooms/:roomId')
    .get(room.get_room)
    .put(room.leave_room)
    .delete(room.disband_room)
};
