const express = require('express');
const router = express.Router();
const apiController = require('../controller/apiController');

router.post("/login", apiController.login);
router.post("/register", apiController.register);
router.get("/search", apiController.searchTwitts);

module.exports = router;