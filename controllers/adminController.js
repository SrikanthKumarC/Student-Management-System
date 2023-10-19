const Admin = require("../models/admin");
const Task = require("../models/task");
const Student = require("../models/student");
const { VALID_STATUS } = require("../config/constants");

const createAdmin = async (req, res) => {
  const { email, password } = req.body;
  const existingAdmin = req.admin;
  if (existingAdmin) {
    return res.status(400).send(`Admin with email ${req.email} already exists`);
  }
  const admin = new Admin({ email, password });
  await admin.save();
  return res.send(`Admin with email: ${email} created`);
};

const createTask = async (req, res) => {
  const { task, studentId } = req.body;
  if (!task || !studentId) {
    return res.status(400).send("Please send all fields");
  }

  const { title, description, dueTime, status } = task;
  if (!title || !dueTime || !description) {
    return res
      .status(400)
      .json({ message: "some fields in task object are missing or invalid" });
  }
  // check if student with id exists
  try {
    const studentExists = await Student.findOne({ _id: studentId }).exec();
    if (!studentExists) {
      return res
        .status(404)
        .json({ message: `Student with id ${studentId} does not exist` });
    }
    if (status) {
      if (!VALID_STATUS.includes(status)) {
        return res.status(400).json({ message: "Invalid status field" });
      }
    }
    const taskObj = new Task({
      title,
      description,
      dueTime,
      status,
      assignedTo: studentId,
    });
    await taskObj.save();
    return res.json({ task: taskObj });
  } catch (e) {
    return res
      .status(400)
      .json({ message: "some fields in main body are missing or invalid" });
  }
};

const viewAllTasks = async (req, res) => {
  const tasks = await Task.find({});
  if (!tasks || tasks.length === 0) {
    return res.status(200).json({ message: "The task list is empty" });
  }
  try {
    return res.json(tasks);
  } catch (e) {
    return res.json({ message: e.message });
  }
};

const createStudent = async (req, res) => {
  const { name, department, studentEmail, studentPassword } = req.body;
  if (!studentPassword || !studentEmail || !name || !department) {
    return res.status(400).send("Missing fields in body");
  }

  // check if student with email exists
  const studentExists = await Student.findOne({ email: studentEmail }).exec();
  if (studentExists) {
    return res
      .status(400)
      .send(`Student with email ${studentEmail} already exists`);
  }
  try {
    const student = new Student({
      email: studentEmail,
      password: studentPassword,
      name,
      department,
    });
    await student.save();
    return res.json(student);
  } catch (e) {
    return res.status(400).send("Something went wrong!");
  }
};

module.exports = {
  createAdmin,
  createTask,
  createStudent,
  viewAllTasks,
};
