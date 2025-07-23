const roomDataAccess = require('../data-access/roomDataAccess');

exports.getAllRooms = () => roomDataAccess.getAllRooms();
exports.getRoomById = (id) => roomDataAccess.getRoomById(id);
exports.createRoom = (roomData) => roomDataAccess.createRoom(roomData);
exports.updateRoom = (id, roomData) => roomDataAccess.updateRoom(id, roomData);
exports.deleteRoom = (id) => roomDataAccess.deleteRoom(id);