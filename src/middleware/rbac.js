module.exports = (roles) => {
    return (req, res, next) => {
        // Check if the user's role is in the allowed list
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ error: "Forbidden: Insufficient Permissions" });
        }
        next();
    };
};
