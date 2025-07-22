const db = require('../db');

const createUser = (user, callback) => {
    const sql = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
    db.query(sql, [user.name, user.email, user.password, user.role], function (err, result) {
        callback(err, result);
    });
};

const findUserByEmail = (email, callback) => {
    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], function (err, results) {
        callback(err, results);
    });
};

const findUserByEmailAndPassword = (email, password, callback) => {
    const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
    db.query(sql, [email, password], function (err, results) {
        callback(err, results);
    });
};

module.exports = {
    createUser,
    findUserByEmail,
    findUserByEmailAndPassword
};
