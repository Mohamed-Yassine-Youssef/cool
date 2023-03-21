const mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
const userModel = mongoose.Schema(
  {
    name: { type: "String", required: true },
    email: { type: "String", unique: true, required: true },
    password: { type: "String", required: true },

    pic: {
      type: "String",
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
      required: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isRestorer: {
      type: Boolean,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    activationCode: String,
  },
  { timestaps: true }
);

userModel.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userModel.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userModel);
module.exports = User;