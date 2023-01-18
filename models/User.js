import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  title:  String, // String is shorthand for {type: String}
  name: String,
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: String,
  author: String,
  body:   String,
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

const User = mongoose.model('Blog', userSchema);

module.exports = {User};