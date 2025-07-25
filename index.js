const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const userController = require('./controllers/userController');
const roomController = require('./controllers/roomController');
const reservationController = require('./controllers/reservationController');
const guestController = require('./controllers/guestController');

const authMiddleware = require('./middlewares/authMiddleware');

app.get('/', (req, res) => {
    res.send('Otel Rezervasyonu Yazılımı Backendi çalışıyor.!');
});


app.post('/register', userController.register);
app.post('/login', userController.login);
app.get('/users', userController.getAllUsers);
app.get('/users/:id', userController.getUserById);
app.post('/users', userController.createUser);
app.put('/users/:id', userController.updateUser);
app.delete('/users/:id', userController.deleteUser);

app.get('/rooms/available', authMiddleware, roomController.getAvailableRooms);
app.get('/rooms', roomController.getAllRooms);
app.get('/rooms/:id', roomController.getRoomById);
app.post('/rooms', authMiddleware, roomController.createRoom);
app.put('/rooms/:id', authMiddleware, roomController.updateRoom);
app.delete('/rooms/:id', authMiddleware, roomController.deleteRoom);


app.post('/reservations', authMiddleware, reservationController.createReservation);
app.get('/reservations', authMiddleware, reservationController.getAllReservations);
app.get('/reservations/:userId', authMiddleware, reservationController.getReservationsByUser);
app.put('/reservations/:id', authMiddleware, reservationController.updateReservation);
app.delete('/reservations/:id', authMiddleware, reservationController.deleteReservation);

app.post('/guests', authMiddleware, guestController.createGuest);
app.get('/guests', authMiddleware, guestController.getAllGuests);
app.get('/guests/:reservationId', authMiddleware, guestController.getGuestsByReservation);
app.put('/guests/:id', authMiddleware, guestController.updateGuest);
app.delete('/guests/:id', authMiddleware, guestController.deleteGuest);


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server ${PORT} portunda çalışıyor ... `)
});

app.use((req, res) => {
  console.log("404 - Route bulunamadı:", req.originalUrl);
  res.status(404).json({ error: 'Route bulunamadı!' });
});
