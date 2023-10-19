const Admin = require("../models/admin");
const bcrypt = require("bcrypt");

const adminMiddleware = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.body)
  if (!email || !password) {
    console.log(email, password)
    return res.status(400).send("Please enter all fields");
  }
  const adminExists = await Admin.findOne({ email }).exec();
  req.admin = adminExists;
  next();
};
const verifyAdmin = async (req, res, next) => {
  const admin = req.admin;
  if (!admin) {
    return res.status(400).send("Admin does not exist");
  }
  const { password } = req.body;
  const match = await bcrypt.compare(password, admin.password);
  if (!match) {
    return res.status(401).send("Unauthorized!");
  }
  next();
};
module.exports = { adminMiddleware, verifyAdmin };
