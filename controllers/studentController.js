const Task = require("../models/task");
const { VALID_STATUS } = require("../config/constants");

const viewTasks = async (req, res) => {
  const studentExists = req.student;
  const tasks = await Task.find({ assignedTo: studentExists._id }).exec();
  if (!tasks || tasks.length === 0) {
    return res.status(204).json({ message: "No tasks found" });
  }
  return res.json({ tasks });
};

const changeTaskStatus = async (req, res) => {
  const { taskId, status } = req.body;
  if (!taskId || !status) {
    return res.status(400).json({ message: "Missing fields" });
  }
  // check if status is valid
  if (!VALID_STATUS.includes(status)) {
    return res.status(400).json({ message: "Invalid status field" });
  }
  // find taks with taskId
  try {
    const taskExists = await Task.findOne({ _id: taskId }).exec();
    if (!taskExists) {
      return res.status(404).json({ message: "Task does not exist" });
    }
    taskExists.status = status;
    await taskExists.save();
    return res.json({ task: taskExists });
  } catch {
    return res.status(400).json({ message: "Invalid taskId" });
  }
};

module.exports = {
  viewTasks,
  changeTaskStatus,
};
