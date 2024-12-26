const express = require("express");

const {
  performActions,
  getStudents,
  getActionStatus,
} = require("../../controllers/studentController");
const {
  updateUser,
  addUser,
  getUsers,
} = require("../../controllers/userController");

const router = express.Router();

router.get("/students-list", getStudents);

router.post("/student-action", performActions);

router.get("/student-action-status/:id", getActionStatus);

router.get("/users", getUsers);

router.post("/user", addUser);

router.patch("/user", updateUser);

module.exports = router;
