const userData = require('../data-access/userDataAccess');

exports.register = (user, callback) => {
    userData.findUserByEmail(user.email, (err, result) => {
        if (err) return callback(err);
        if (result.length > 0) return callback(null, null, "Bu email adresi ile kayıtlı zaten bir kullanıcı var.");
        userData.createUser(user, (err, result) => {
            if (err) return callback(err);
            callback(null, result);
        });
    });
};

exports.login = (email, password, callback) => {
    userData.findUserByEmailAndPassword(email, password, (err, result) => {
        if (err) return callback(err);
        if (result.length === 0) return callback(null, null, "Girilen email veya şifre yanlış.");
        callback(null, result[0]);
    });
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
