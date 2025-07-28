module.exports = (requiredRole) => {
    return (req, res, next) => {
        console.log("Kullanıcı rolü:", req.user?.role);

        if (!req.user || req.user.role !== requiredRole) {
            return res.status(403).json({ error: 'Bu işlemi yapmaya yetkiniz yok.' });
        }
        next();
    };
};
