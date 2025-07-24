const reservationData = require('../data-access/reservationDataAccess');

exports.createReservation = async (user_id, room_id, check_in_date, check_out_date) => {
    await reservationData.createReservation(user_id, room_id, check_in_date, check_out_date);
    await reservationData.updateRoomStatus(room_id, 'occupied');
};

exports.getAllReservations = async () => {
    const [rows] = await reservationData.getAllReservations();
    return rows;
};

exports.getReservationsByUser = async (userId) => {
    const [rows] = await reservationData.getReservationsByUser(userId);
    return rows;
};

exports.updateReservation = async (id, check_in_date, check_out_date, status) => {
    const [result] = await reservationData.updateReservation(id, check_in_date, check_out_date, status);
    return result;
};

exports.deleteReservation = async (id) => {
    const [[reservation]] = await reservationData.getRoomIdByReservationId(id);
    if (!reservation) throw new Error('Rezervasyon bulunamadı!');
    await reservationData.deleteReservation(id);
    await reservationData.updateRoomStatus(reservation.room_id, 'available');
};