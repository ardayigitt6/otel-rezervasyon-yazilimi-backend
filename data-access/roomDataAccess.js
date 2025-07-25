const db = require('../db');

exports.getAllRooms = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT*FROM rooms', (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
};

exports.getRoomById = (id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT*FROM rooms WHERE id=? ', [id], (err, results) => {
            if (err) return reject(err);
            resolve(results[0]);
        });
    });
};

exports.createRoom = (roomData) => {
    return new Promise((resolve, reject) => {
        const { room_number, room_type_id, capacity, status } = roomData;
        db.query('INSERT INTO rooms (room_number,room_type_id,capacity,status) VALUES (?,?,?,?)',
            [room_number, room_type_id, capacity, status],
            (err, result) => {
                if (err) return reject(err);
                resolve({ id: result.insertId, ...roomData });
            });
    });
};

exports.updateRoom = (id, roomData) => {
    return new Promise((resolve, reject) => {
        const { room_number, room_type_id, capacity, status } = roomData;
        db.query('UPDATE rooms SET room_number=?, room_type_id=?,capacity=?,status=? WHERE id=?',
            [room_number, room_type_id, capacity, status, id],
            (err, result) => {
                if (err) return reject(err);
                resolve(result.affectedRows > 0);
            });
    });
};

exports.deleteRoom = (id) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM rooms WHERE id =?',
            [id],
            (err, result) => {
                if (err) return reject(err);
                resolve(result.affectedRows > 0);
            });
    });
};

exports.getAvailableRooms = (checkInDate, checkOutDate) => {
    const sql = `
        SELECT * FROM rooms
        WHERE status = 'available'
        AND id NOT IN (
            SELECT room_id FROM reservations
            WHERE check_in_date < ? AND check_out_date > ?
        )
    `;
    return db.promise().execute(sql, [checkOutDate, checkInDate]);
};
