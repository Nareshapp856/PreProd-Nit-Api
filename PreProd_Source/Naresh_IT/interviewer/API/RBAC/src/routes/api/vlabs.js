const express = require("express");
const { insertstudents } = require("../../controllers/vlabsController");

const router = express.Router();

router.post("/insertstudents", insertstudents);

module.exports = router;
