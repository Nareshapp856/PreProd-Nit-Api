const express = require("express");

const router = express.Router();

const apiRouter = require("./api");
const authRoutrer = require("./auth");

router.use("/api", apiRouter);

router.use("/auth", authRoutrer);

module.exports = {facultycurriculumrbac:router};
