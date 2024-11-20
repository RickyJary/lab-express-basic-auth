// models/User.model.js
const { Schema, model } = require('mongoose');
const bcrypt = require("bcrypt");

const EMAIL_PATTERN =   /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;


const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: [true, 'Username is required.'],
      unique: true
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [EMAIL_PATTERN, "Email is invalid"]
    },
    passwordHash: {
      type: String,
      required: [true, 'Password is required.']
    }
  },
  {
    timestamps: true
  }
);

userSchema.pre("save", function (next) {
  const user = this;
  if (user.isModified("passwordHash")) {
    bcrypt.hash(user.passwordHash, 10)
    .then((hash) => {
      user.passwordHash = hash;
      next();
    })
  } else {
    next()
  }
});

UserSchema.methods.checkPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
