const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const config = require('../config/dev');

const userSchema = new Schema({
  title: String, // String is shorthand for {type: String}
  name: String,
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: String,
  author: String,
  body: String,
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: String,
  tokenExp: Number,
  comments: [{ body: String, date: Date }],
  signUpDate: { type: Date, default: Date.now },
  //   hidden: Boolean,
  //   meta: {
  //     votes: Number,
  //     favs:  Number
  //   }
});

userSchema.pre('save', function (next) {
  //this는 위에 우리가 작성한 스키마를 말함
  var user = this;
  if (user.isModified('password')) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function (plainPassword, cb) {
  bcrypt.compare(plainPassword, this.password, (err, isMatch) => {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

userSchema.methods.generateToken = function (cb) {
  var user = this;
  //jsonwebtoken을 이용해서 token생성
  var token = jwt.sign(user._id.toHexString(), config.secretKey);
  user.token = token;
  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

userSchema.statics.findByToken = function (token, cb) {
  var user = this;
  jwt.verify(token, config.secretKey, function (err, decoded) {
    if (err) {
      console.log('verify에러', err);
      return cb(err);
    }
    user.findOne({ _id: decoded, token: token }, function (err, user) {
      if (err) {
        console.log('findOne에러', err);
        return cb(err);
      }
      cb(null, user);
    });
  });
};

const User = mongoose.model('change', userSchema);

module.exports = { User };
