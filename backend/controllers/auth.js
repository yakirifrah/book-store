const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../models/User');
// const crypto = require('crypto');

const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  // Remove password from output
  user.password = undefined;
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

module.exports = {
  signup: catchAsync(async (req, res, next) => {
    const { userName, password, role } = req.body;
    const user = await User.findOne({ userName }).select('+password');
    if (
      user &&
      user.userName === userName &&
      (await user.correctPassword(password, user.password)) &&
      (await user.havePermission(role, user.role)) === 0
    ) {
      return next(new AppError('The user already exists', 403));
    }
    const newUser = await User.create({
      userName: userName,
      password: password,
      role: role,
    });
    createSendToken(newUser, 201, res);
  }),

  login: catchAsync(async (req, res, next) => {
    const { userName, password, role } = req.body;
    if (!userName || !password) {
      return next(new AppError('Please provide username and password!', 400));
    }

    const user = await User.findOne({ userName }).select('+password');
    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError('Incorrect username or password', 401));
    }
    if ((await user.havePermission(role, user.role)) !== 0) {
      return next(
        new AppError('You are not permission to login to this area!', 403)
      );
    }

    const token = signToken(user._id);

    res.status(200).json({
      status: 'success',
      user_id: user._id,
      token,
    });
  }),

  protected: catchAsync(async (req, res, next) => {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
      return next(new AppError('You are not login in to get access.', 401));
    }
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const freshUser = await User.findById(decoded.id);
    if (!freshUser) {
      return next(
        new AppError(
          'The user not belong to this token does not logger exists ',
          401
        )
      );
    }
    req.user = freshUser;
    next();
  }),
  restrictTo: (role) => {
    return (req, res, next) => {
      if (!role === req.user.role) {
        return next(
          new AppError(
            'You do not have permission to perform this action.',
            403
          )
        );
      }
      next();
    };
  },
};
