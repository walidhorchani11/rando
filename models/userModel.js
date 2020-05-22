const mongoose = require('mongoose');
const validator = require('validator');

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
  },
  photo: {
    type: String,
  },
});
// use hook pre on save pour verifier le passwordConfirm et le mettre to undefined

module.exports = mongoose.model('User', userSchema);
