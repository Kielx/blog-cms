const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const SALT_FACTOR = 10;

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    index: true,
  },
  password: { type: String },
  email: {
    type: String,
  },
  createdAt: { type: Date, default: Date.now },
  roles: [{ type: String }],
  isVerified: { type: Boolean, default: false },
  passwordResetToken: String,
  passwordResetExpires: Date,
});

UserSchema.pre("save", function (next) {
  var user = this;

  if (this.roles.length == 0) {
    this.roles.push("user");
  }

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  // generate a salt
  bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

module.exports = mongoose.model("User", UserSchema);
