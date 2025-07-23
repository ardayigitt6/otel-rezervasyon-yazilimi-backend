const db = require('../db');

const createUser = (user, callback) => {
    const sql = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
    db.query(sql, [user.name, user.email, user.password, user.role], function (err, result) {
        callback(err, result);
    });
};

const getAllUsers = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT id, name, email, role, created_at FROM users', (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

const getUserById = (id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT id, name, email, role, created_at FROM users WHERE id = ?', [id], (err, results) => {
            if (err) return reject(err);
            resolve(results[0]);
        });
    });
};

const createUserPromise = (user) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
        db.query(sql, [user.name, user.email, user.password, user.role], (err, result) => {
            if (err) return reject(err);
            resolve({ id: result.insertId, ...user });
        });
    });
};

const updateUser = (id, user) => {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE users SET name=?, email=?, password=?, role=? WHERE id=?';
        db.query(sql, [user.name, user.email, user.password, user.role, id], (err, result) => {
            if (err) return reject(err);
            resolve(result.affectedRows > 0);
        });
    });
};

const deleteUser = (id) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM users WHERE id=?', [id], (err, result) => {
            if (err) return reject(err);
            resolve(result.affectedRows > 0);
        });
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
    findUserByEmailAndPassword,
    getAllUsers,
    getUserById,
    createUserPromise,
    updateUser,
    deleteUser
};
