const roomService = require('../services/roomService');

exports.getAllRooms = async (req, res) => {
    try {
        const rooms = await roomService.getAllRooms();
        res.json(rooms);
    } catch (error) {
        res.status(500).json({ error: 'Oda listelenirken hata oluştu!' });
    }
};

exports.getRoomById = async (req, res) => {
    try {
        const room = await roomService.getRoomById(req.params.id);
        if (!room) return res.status(404).json({ error: 'Oda bulunmadı! ' });
        res.json(room);
    } catch (error) {
        res.status(500).json({ error: 'Oda görüntülenirken/getirilirken hata oluştu!' });
    }
};

exports.createRoom = async (req, res) => {
    try {
        const room = await roomService.createRoom(req.body);
        res.status(201).json(room);
    } catch (error) {
        res.status(500).json({ error: 'Oda eklenirken hata oluştu!' });
    }
};

exports.updateRoom = async (req, res) => {
    try {
        const updated = await roomService.updateRoom(req.params.id, req.body);
        if (!updated) return res.status(404).json({ error: 'Oda bulunamadı!' });
        res.json({ message: 'Oda başarıyla güncellendi.' });
    } catch (error) {
        res.status(500).json({ error: 'Oda güncellenirken hata oluştu!' })
    }
};

exports.deleteRoom = async (req, res) => {
    try {
        const deleted = await roomService.deleteRoom(req.params.id);
        if (!deleted) return res.status(404).json({ error: 'Oda bulunamadı!' });
        res.json({ message: 'Oda başarıyla silindi.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Oda silinirken hata oluştu.' });
    }
};

exports.getAvailableRooms = async (req, res) => {
    const { check_in_date, check_out_date } = req.query;

    if (!check_in_date || !check_out_date) {

        return res.status(400).json({ error: 'check_in_date ve check_out_date zorunludur.' });
    }

    try {
        const rooms = await roomService.getAvailableRooms(check_in_date, check_out_date);


        if (!rooms || rooms.length === 0) {
            return res.status(404).json({ error: 'Oda bulunmadı!' });
        }

        res.json(rooms);
    } catch (err) {
        res.status(500).json({ error: 'Müsait odalar alınamadı.', details: err.message });
    }
};
