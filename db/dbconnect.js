const mongoose = require("mongoose");

// Database connection function
const dbConnect = async (uri) => {
  try {
    await mongoose.connect(uri);
    console.log("DB connected");
  } catch (error) {
    console.error("DB connection failed:", error);
  }
};

//Function to wipe the database
// const wipeDatabase = async () => {
//   try {
//     await mongoose.connection.dropDatabase();
//     console.log("Database has been wiped");
//   } catch (error) {
//     console.error("Error wiping database:", error);
//   }
// };

// Set an interval to wipe the database every hour (60 * 60 * 1000 ms)
// setInterval(() => {
//   wipeDatabase(); // Call the wipe function
//   console.log("Database wipe started...");
// }, 60 * 60 * 1000); // Every hour

console.log("Wiped interval started");

module.exports = dbConnect;
