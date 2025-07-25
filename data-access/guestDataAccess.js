const db = require('../db');

const createGuest = (guest) => {
    const sql = `INSERT INTO guests (reservation_id,name,email,phone) VALUES (?,?,?,?)`;
    return db.promise().execute(sql, [guest.reservation_id, guest.name, guest.email, guest.phone])
};

const getAllGuests = () => {
    const sql = `SELECT*FROM guests`;
    return db.promise().query(sql);
};

const getGuestsByReservation = (reservationId) => {
    const sql = `SELECT*FROM guests WHERE reservation_id=?`;
    return db.promise().execute(sql, [reservationId]);
};

const updateGuest = (id, guest) => {
    const sql = `UPDATE guests SET name=?,email=?,phone=? WHERE id=?`;
    return db.promise().execute(sql, [guest.name, guest.email, guest.phone, id]);
};

const deleteGuest = (id) => {
    const sql = `DELETE FROM guests WHERE id=?`;
    return db.promise().execute(sql, [id]);
};

module.exports = {
    createGuest,
    getAllGuests,
    getGuestsByReservation,
    updateGuest,
    deleteGuest
}