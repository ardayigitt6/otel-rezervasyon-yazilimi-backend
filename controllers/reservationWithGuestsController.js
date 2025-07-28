const reservationService = require('../services/reservationService');
const guestService = require('../services/guestService');

exports.createReservationWithGuests = async (req, res) => {
    const { user_id, room_id, check_in_date, check_out_date, guests } = req.body;

    if (!user_id || !room_id || !check_in_date || !check_out_date || !Array.isArray(guests)) {
        return res.status(400).json({ error: 'Tüm alanlar zorunludur ve guests bir dizi olmalı.' });
    }

    try {
        const reservationId = await reservationService.createReservation(user_id, room_id, check_in_date, check_out_date);

        for (const guest of guests) {
            await guestService.createGuest({
                reservation_id: reservationId,
                name: guest.name,
                email: guest.email,
                phone: guest.phone
            });
        }

        res.status(201).json({
            message: 'Rezervasyon ve misafirler başarıyla oluşturuldu.',
            reservation_id: reservationId
        });
    } catch (err) {
        res.status(500).json({
            error: err.message || 'Rezervasyonla birlikte misafir eklenemedi.'
        });
    }
};
