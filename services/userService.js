const { use } = require('react');
const userData = require('../data-access/userDataAccess');

const register = (user,callback) => {
    userData.findUserByEmail(user.email,(err,result) => {
        if (err) return callback(err);
        if (result.length > 0) return callback (null,null,"Bu email adresi ile kayıtlı zaten bir kullanıcı var.");
        userData.createUser(user,(err,result) => {
            if(err) return callback(err);
            callback(null,result);
        });
    });
};
const login = (email,password,callback) => {
    userData.findUserByEmailAndPassword(email,password,(err,result) => {
    if (err) return callback(err);
    if (result.length === 0) return callback (null,null,"Girilen email veya şifre yanlış.");
    callback(null,result[0]);
    });
};

module.exports={register,login};