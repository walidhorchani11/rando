const jwt = require('jsonwebtoken');

const User = require('../models/userModel');

exports.signup = async (req, res, next) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });
    // generation token
    const token = jwt.sign(
      { id: newUser._id },
      'hello_my_secret_key_for_generation_token',
      { expiresIn: 3600000 }
    );

    res.status(201).json({
      status: 'success',
      data: {
        user: newUser,
        token,
      },
      test: 'hello walid',
    });
  } catch (err) {
    next(err);
  }
};
