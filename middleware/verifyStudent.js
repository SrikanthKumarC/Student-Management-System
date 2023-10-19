const bcrypt = require("bcrypt");
const Student = require("../models/student");

const studentMiddleware = async (req, res, next) => {
  const { studentEmail, studentPassword } = req.body;
  if (!studentEmail || !studentPassword) {
    return res.status(400).json({ message: "Please enter all fields" });
  }
  //find student with email
  const studentExists = await Student.findOne({ email: studentEmail }).exec();
  if (!studentExists) {
    return res.status(404).json({ message: "Student does not exist" });
  }
  const match = await bcrypt.compare(studentPassword, studentExists.password);
  if (!match) {
    return res.status(401).json({ message: "Unauthorized!" });
  }
  req.student = studentExists;
  next();
};

module.exports = studentMiddleware;
