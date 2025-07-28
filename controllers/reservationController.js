const reservationService = require('../services/reservationService');
const reservationData = require('../data-access/reservationDataAccess');

exports.createReservation = async (req, res) => {
    const { user_id, room_id, check_in_date, check_out_date } = req.body;
    try {
        await reservationService.createReservation(user_id, room_id, check_in_date, check_out_date);
        res.status(201).json({ message: 'Rezervasyon oluşturuldu.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAllReservations = async (req, res) => {
    try {
        const reservations = await reservationService.getAllReservations();
        res.json(reservations);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getReservationsByUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const reservation = await reservationService.getReservationsByUser(userId);
        res.json(reservation);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateReservation = async (req, res) => {
    const { id } = req.params;
    const { check_in_date, check_out_date, status } = req.body;
    try {
        await reservationService.updateReservation(id, check_in_date, check_out_date, status);
        res.json({ message: 'Rezervasyon güncellendi.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteReservation = async (req, res) => {
    const { id } = req.params;
    try {
        await reservationService.deleteReservation(id);
        res.json({ message: 'Rezervasyon silindi.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.checkOutReservation = async (req, res) => {
    const { id } = req.params;

    try {
        const [[reservation]] = await reservationData.getRoomIdByReservationId(id);

        if (!reservation) {
            return res.status(404).json({ error: 'Rezervasyon bulunamadı!' });
        }

        await reservationData.updateRoomStatus(reservation.room_id, 'available');

        res.json({ message: 'Check-out işlemi başarıyla tamamlandı. Oda artık available.' });
    } catch (err) {
        res.status(500).json({ error: 'Check-out işlemi başarısız.', details: err.message });
    }
};
