const express = require("express");
const router = express.Router();
const { adminMiddleware, verifyAdmin } = require("../middleware/validateAdmin");

const {
  createAdmin,
  createTask,
  createStudent,
  viewAllTasks,
} = require("../controllers/adminController");

router.use(adminMiddleware);
router.post("/createAdmin", createAdmin);

router.use(verifyAdmin);
router.post("/createTask", createTask);
router.post("/viewAllTasks", viewAllTasks);
router.post("/createStudent", createStudent);

module.exports = router;
