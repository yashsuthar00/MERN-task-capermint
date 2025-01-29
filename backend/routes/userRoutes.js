const express = require('express');
const { registerUser, loginUser, currentUserProfile, updateCurrentUserProfile } = require('../controllers/userController');
const validateToken = require('../middleware/validateTokenHandler')

const router = express.Router();

router.post("/register", registerUser)

router.post("/login", loginUser)

router.get("/profile", validateToken, currentUserProfile)

router.put("/profile/:id", validateToken, updateCurrentUserProfile)

module.exports = router;