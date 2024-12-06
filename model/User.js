const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Name is requested(FDB)"],
    min: [3, "Name must have at least 3 character(FDB)"],
    Trim: true,
  },

  email: {
    type: String,
    require: [true, "Email is requested(FDB)"],
    Trim: true,
    unique: true,
    // validate:{
    //   validator:validator.isEmail,
    //   message: "Please enter a valid Email(FDB) "
    // }
  },

  password: {
    type: String,
    require: [true, "Email is requested(FDB)"],
    Trim: true,
    min: [6, "Password must have at least 6 hexadecimal character (FDB)"],
  },

  userImage: {
    type: String,
    default: "/uploads/placeholder.jpg", // no default
  },

  aboutTheUser: {
    type: String,
    trim: true,
    min: [20, "must have at least 20 character (FDB)"],
    max: [500, "must have no more than 500 character (FDB)"],
  },

  role: {
    type: String,
    enum: ["Admin", "User"],
    default: "User",
  },
});

// Setup a hashing passwords
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
  next();
});

// Setup a compare password

// UserSchema.methods.comparePassword = async function (userPass) {
//   const isMatch = await bcryptjs.compare(userPass, this.password);
//   return isMatch;
// };

UserSchema.methods.comparePassword = async function (userPass) {
  console.log(typeof userPass, userPass);
  if (typeof userPass !== "string" || typeof this.password !== "string") {
    throw new Error("Password comparison failed due to invalid arguments");
  }
  return await bcryptjs.compare(userPass, this.password);
};
module.exports = mongoose.model("User", UserSchema);

// UserSchema.methods.comparePassword = async function (inputPassword) {
//   const isMatch = await bcrypt.compare(inputPassword, this.password);
//   return isMatch;
// };

// UserSchema.pre("save", async function (next) {
//   console.log(this.modifiedPaths());
//   console.log(this.isModified("userImage"));
//   if (!this.isModified("password")) return;
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt); // this refer to the document
//   next();
// });
