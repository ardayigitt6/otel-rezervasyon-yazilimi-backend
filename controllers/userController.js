const userService = require('../services/userService');
const userValidation = require('../validations/userValidation');

exports.register = (req, res) => {
    const error = userValidation.validateRegister(req.body);
    if (error) return res.status(400).json({ error });
    userService.register(req.body, (err, result, msg) => {
        if (err) return res.status(500).json({ error: "Veritabanı hatası." });
        if (msg) return res.status(400).json({ error: msg });
        res.json({ message: "Kayıt başarılı!" });
    });
};

exports.login = (req, res) => {
    const error = userValidation.validateLogin(req.body);
    if (error) return res.status(400).json({ error });
    userService.login(req.body.email, req.body.password, (err, user, msg) => {
        if (err) return res.status(500).json({ error: "Veritabanı hatası." });
        if (msg) return res.status(400).json({ error: msg });
        res.json({ message: "Giriş başarılı.", user });
    });
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Kullanıcılar listelenirken hata oluştu!' });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);
        if (!user) return res.status(404).json({ error: 'Kullanıcı bulunamadı' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Kullanıcı getirilirken hata oluştu!' });
    }
};

exports.createUser = async (req, res) => {
    try {
        const user = await userService.createUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Kullanıcı eklenirken hata oluştu!' });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const updated = await userService.updateUser(req.params.id, req.body);
        if (!updated) return res.status(404).json({ error: 'Kullanıcı bulunamadı' });
        res.json({ message: 'Kullanıcı başarıyla güncellendi.' });
    } catch (error) {
        res.status(500).json({ error: 'Kullanıcı güncellenirken hata oluştu!' });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const deleted = await userService.deleteUser(req.params.id);
        if (!deleted) return res.status(404).json({ error: 'Kullanıcı bulunamadı' });
        res.json({ message: 'Kullanıcı başarıyla silindi.' });
    } catch (error) {
        res.status(500).json({ error: 'Kullanıcı silinirken hata oluştu!' });
    }
};
