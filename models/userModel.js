const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'please provide your name!'],
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    validate: {
      validator: function (value) {
        return validator.isEmail(value);
      },
      message: 'check your email',
    },
  },
  password: {
    type: String,
    required: [true, 'please enter a password!'],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'please confirm your password!'],
    select: false,
    validate: {
      validator: function (value) {
        return value === this.password;
      },
      message: 'your passwords does not match!',
    },
  },
  photo: {
    type: String,
  },
});

userSchema.pre('save', async function (next) {
  //en cas d update si j'ai pas modifier le password on sort
  // mais fait attention et verifie si ca marche avec findByIdAndUpdate
  if (!this.isModified('password')) next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  // n oublier pas next pour passer au next doc middleware if exist
  next();
});

module.exports = mongoose.model('User', userSchema);
