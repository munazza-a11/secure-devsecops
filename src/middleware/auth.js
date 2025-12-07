const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    const token = req.headers["authorization"];
    if (!token) return res.status(401).json({ error: "Missing token" });

    try {
        // Removes 'Bearer ' prefix and verifies token
        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET || "supersecretkey");
        req.user = decoded;
        next();
    } catch (e) {
        return res.status(403).json({ error: "Invalid or expired token" });
    }
};
