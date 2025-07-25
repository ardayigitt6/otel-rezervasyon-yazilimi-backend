const guestData = require('../data-access/guestDataAccess');

const createGuest = async (guest) => {
    return await guestData.createGuest(guest);
};

const getAllGuests = async () => {
    return await guestData.getAllGuests();
};

const getGuestsByReservation = async (reservationId) => {
    return await guestData.getGuestsByReservation(reservationId);
};

const updateGuest = async (id, guest) => {
    return await guestData.updateGuest(id, guest);
};

const deleteGuest = async (id) => {
    return await guestData.deleteGuest(id);
};

module.exports = {
    createGuest,
    getAllGuests,
    getGuestsByReservation,
    updateGuest,
    deleteGuest
};