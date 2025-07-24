const userData = require('../data-access/userDataAccess');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.register = async (user, callback) => {
    try {
        const [existing] = await userData.findUserByEmailPromise(user.email);

        if (existing.length > 0) {
            return callback(null, null, "Bu email adresi ile kayıtlı zaten bir kullanıcı var.");
        }

        user.password = await bcrypt.hash(user.password, 10);
        const result = await userData.createUserPromise(user);

        callback(null, result);
    } catch (err) {
        console.error("Kayıt sırasında hata:", err);
        callback(err);
    }
};


exports.login = async (email, password, callback) => {
    try {
        const [result] = await userData.findUserByEmailPromise(email);
        const user = result[0];

        if (!user) return callback(null, null, "Email yanlış.");

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return callback(null, null, "Şifre yanlış.");

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        callback(null, token, null);
    } catch (err) {
        console.error("Login sırasında hata:", err);
        callback(err);
    }
};


exports.getAllUsers = () => {
    return userData.getAllUsers();
};

exports.getUserById = (id) => {
    return userData.getUserById(id);
};

exports.createUser = (userDataObj) => {
    return userData.createUserPromise(userDataObj);
};

exports.updateUser = (id, userDataObj) => {
    return userData.updateUser(id, userDataObj);
};

exports.deleteUser = (id) => {
    return userData.deleteUser(id);
};
