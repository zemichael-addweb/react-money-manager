const express = require("express");
const rateLimiter = require('../middleware/ratelimiter');
const accountController = require('../controller/accountController')
const { isAuthenticated } = require("../middleware/jwtAuth");

const app = express();
app.use(rateLimiter);

// Register
app.post("/createAccount", isAuthenticated, accountController.createAccount);

module.exports = app;