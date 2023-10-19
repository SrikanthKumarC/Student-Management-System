const express = require("express");
const router = express.Router();
const verifyStudent = require("../middleware/verifyStudent");
const {
  viewTasks,
  changeTaskStatus,
} = require("../controllers/studentController");

router.use(verifyStudent);

router.post("/viewTasks", viewTasks);
router.post("/changeTaskStatus", changeTaskStatus);

module.exports = router;
