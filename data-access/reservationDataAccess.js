const db = require('../db')

exports.createReservation = (user_id, room_id, check_in_date, check_out_date) => {
    const sql = `
    INSERT INTO reservations (user_id,room_id,check_in_date,check_out_date,status)
    VALUES (?,?,?,?,'confirmed')
    `;
    return db.promise().execute(sql, [user_id, room_id, check_in_date, check_out_date]);
};

exports.getAllReservations = () => {
    const sql = `
    SELECT r.*, u.name AS user_name, rm.room_number
    FROM reservations r
    JOIN users u ON r.user_id = u.id
    JOIN rooms rm ON r.room_id = rm.id
    `;
    return db.promise().query(sql);
};

exports.getReservationsByUser = (userId) => {
    const sql = `
    SELECT r.*,rm.room_number
    FROM reservations r
    JOIN rooms rm ON r.room_id = rm.id
    WHERE r.user_id=?
    `;
    return db.promise().execute(sql, [userId]);
};

exports.getReservationByUserAndRoomId = (user_id,room_id,check_in_date,check_out_date) => {
    const sql = `
    SELECT * 
    FROM reservations r
    WHERE r.user_id=?
    AND r.room_id=?
    AND r.check_in_date=?
    AND r.check_out_date=?
    `;
    return db.promise().execute(sql, [user_id,room_id,check_in_date,check_out_date]);
};

exports.updateReservation = (id, check_in_date, check_out_date, status) => {
    const sql = `
    UPDATE reservations 
    SET check_in_date =?, check_out_date=?, status=?
    WHERE id = ?
    `;
    return db.promise().execute(sql, [check_in_date, check_out_date, status, id])
};

exports.deleteReservation = (id) => {
    const sql = `
    DELETE FROM reservations WHERE id=?
    `;
    return db.promise().execute(sql, [id]);
};

exports.getRoomIdByReservationId = (id) => {
    const sql = `
    SELECT room_id FROM reservations WHERE id  = ?
    `;
    return db.promise().execute(sql, [id]);
};

exports.updateRoomStatus = (roomId, status) => {
    const sql = `
    UPDATE rooms SET status = ? WHERE id = ?
    `;
    return db.promise().execute(sql, [status, roomId]);
};

exports.checkReservationConflict = (roomId, checkIn, checkOut) => {
    const sql = `
    SELECT * FROM reservations 
    WHERE room_id = ?
    AND check_out_date > ? 
    AND check_in_date < ?
    `;
    return db.promise().execute(sql, [roomId, checkIn, checkOut]);
};