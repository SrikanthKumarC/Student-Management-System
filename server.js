require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const connectDB = require("./config/dbConfig");
const PORT = process.env.PORT || 3500;
app.use(express.json());

connectDB();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/admin", require("./routes/admin"));
app.use('/student', require('./routes/student'));
mongoose.connection.once("open", () => {
  console.log("MongoDB Connected");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
