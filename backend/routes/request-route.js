const path = require("path");

const express = require("express");

const requestController = require("../controller/request");

const router = express.Router();


router.post('/submit-request', requestController.getRequestFromUser)

module.exports = router;