const express = require('express');
const { registerUser, loginUser, currentUser } = require('../controllers/userController');

const router = express.Router();

router.post("/register", registerUser)

router.post("/login", loginUser)

module.exports = router;