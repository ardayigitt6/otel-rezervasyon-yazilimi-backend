const guestService = require('../services/guestService');

const createGuest = async (req, res) => {
    try {
        const [result] = await guestService.createGuest(req.body);
        res.status(201).json({ message: 'Misafir başarıyla sisteme eklendi.', id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: 'Misafir sisteme eklenemedi!', details: err.message });
    }
};

const getAllGuests = async (req, res) => {
    try {
        const [guests] = await guestService.getAllGuests();
        res.json(guests);
    } catch (err) {
        res.status(500).json({ error: 'Misafirler alınamadı!', details: err.message });
    }
};

const getGuestsByReservation = async (req, res) => {
    try {
        const [guests] = await guestService.getGuestsByReservation(req.params.reservationId);
        res.json(guests);
    } catch (err) {
        res.status(500).json({ error: 'Misafirler getirilemedi/gösterilemedi', details: err.message });
    }
};

const updateGuest = async (req, res) => {
    try {
        await guestService.updateGuest(req.params.id, req.body);
        res.json({ message: 'Misafir güncellendi.' });
    } catch (err) {
        res.status(500).json({ error: 'Güncelleme başarısız!', details: err.message });
    }
};

const deleteGuest = async (req, res) => {
    try {
        await guestService.deleteGuest(req.params.id);
        res.json({ message: 'Misafir silindi.' });
    } catch (err) {
        res.status(500).json({ error: 'Silme işlemi başarısız!', details: err.message });
    }
};

module.exports = {
    createGuest,
    getAllGuests,
    getGuestsByReservation,
    updateGuest,
    deleteGuest
};