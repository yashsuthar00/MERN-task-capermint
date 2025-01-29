const express  = require('express')
const router = express.Router()
const { getProfile, updateProfile } = require("../controllers/profileController")
const validateToken = require('../middleware/validateTokenHandler')

router.use(validateToken)
router.route("/:id").get(getProfile).put(updateProfile)

module.exports = router