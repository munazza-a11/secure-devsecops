const router = require("express").Router();
const { validateRegister, validateLogin } = require("./validation");

// Mock Auth Service for demonstration (since full DB isn't set up yet)
const authService = {
    login: (req, res) => res.json({ message: "Login successful", token: "mock-jwt-token" }),
    register: (req, res) => res.json({ message: "User registered successfully" })
};

// Define Routes
router.post("/login", validateLogin, authService.login);
router.post("/register", validateRegister, authService.register);

module.exports = router;
