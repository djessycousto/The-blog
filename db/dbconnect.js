const mongoose = require("mongoose");

const dbConnect = async (uri) => {
  return mongoose.connect(uri, console.log("DB connected"));
};

module.exports = dbConnect;
