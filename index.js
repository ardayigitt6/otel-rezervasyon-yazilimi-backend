const express = require('express');
const cors = require('cors');
require('dotenv').config();

const userController = require('./controllers/userController');
const roomController = require('./controllers/roomController');
const reservationController = require('./controllers/reservationController');
const authMiddleware = require('./middlewares/authMiddleware');

const app = express();
app.use(express.json());
app.use(cors());

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

app.get('/rooms', roomController.getAllRooms);
app.get('/rooms/:id', roomController.getRoomById);
app.post('/rooms', roomController.createRoom);
app.put('/rooms/:id', roomController.updateRoom);
app.delete('/rooms/:id', roomController.deleteRoom);

app.post('/reservations', authMiddleware, reservationController.createReservation);
app.get('/reservations', authMiddleware, reservationController.getAllReservations);
app.get('/reservations/:userId', authMiddleware, reservationController.getReservationsByUser);
app.put('/reservations/:id', authMiddleware, reservationController.updateReservation);
app.delete('/reservations/:id', authMiddleware, reservationController.deleteReservation);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server ${PORT} portunda çalışıyor ... `)
});