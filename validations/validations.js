const validateRegister = (body) => {
    if (!body.name || !body.email || !body.password || !body.role ) {
        return "Tüm alanlar zorunludur.";
    }
    return null;
};

const validateLogin = (body) => {
    if (!body.email || !body.password) {
        return "Email ve şifre zorunldur.";
    }
    return null;
};

module.exports = {validateRegister,validateLogin};