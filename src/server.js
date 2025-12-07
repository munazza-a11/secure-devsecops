const express = require("express");
const app = express();
const authController = require("./auth/auth.controller");

app.use(express.json());

// Mount the Auth Routes
app.use("/api/auth", authController);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Secure Server running on port ${PORT}`));
