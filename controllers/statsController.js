const db = require('../db');

exports.getStats = async (req, res) => {
    try {
        const [totalRooms] = await db.promise().query("SELECT COUNT(*) as total FROM rooms");
        const [availableRooms] = await db.promise().query("SELECT COUNT(*) as available FROM rooms WHERE status = 'available'");
        const [occupiedRooms] = await db.promise().query("SELECT COUNT(*) as occupied FROM rooms WHERE status = 'occupied'");

        const [totalReservations] = await db.promise().query("SELECT COUNT(*) as total FROM reservations");

        const [customerCount] = await db.promise().query("SELECT COUNT(*) as customers FROM users WHERE role = 'customer'");
        const [employeeCount] = await db.promise().query("SELECT COUNT(*) as employees FROM users WHERE role = 'employee'");

        res.json({
            rooms: {
                total: totalRooms[0].total,
                available: availableRooms[0].available,
                occupied: occupiedRooms[0].occupied
            },
            reservations: {
                total: totalReservations[0].total
            },
            users: {
                customers: customerCount[0].customers,
                employees: employeeCount[0].employees
            }
        });
    } catch (err) {
        res.status(500).json({ error: "İstatistikler alınamadı.", details: err.message });
    }
};
