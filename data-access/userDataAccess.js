const db = require('../db');

const createUser = (user, callback) => {
    const sql = 'INSERT INTO users (name,email,password,role) VALUES (?,?,?,?)';
    db.query(sql, [user.name, user.email, user.password, user.role], callback);
};

const findUserByEmail = (email, callback) => {
    const sql = 'SELECT*FROM users WHERE email =?';
    db.query(sql, [email], callback);
};

const findUserByEmailAndPassword = (email, password, callback) => {
    const sql = 'SELECT*FROM users WHERE email=? AND password =?';
    db.query(sql, [email], [password], callback);
};

module.exports = { createUser, findUserByEmail, findUserByEmailAndPassword };