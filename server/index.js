//npm isntall express 필요
const express = require('express');
const app = express();
const port = 5500;
const bodyParser = require('body-parser');
const { User } = require('./models/UserModel');
const cookieParser = require('cookie-parser');
const { auth } = require('./middleware/auth');

const config = require('./config/key');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(cookieParser());

//npm install mongoose 필요
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
mongoose.connect(config.mongoURI).then(() => {
  console.log('mongoDB connected..');
});

app.get('/', (req, res) => {
  res.send('바뀌어라 야;;');
});

//회원가입 - 이메일 중복 안되게 설정함, 검토해서 비밀번호 암호화
app.post('/register', (req, res) => {
  //몽구스로 만든 모델 불러오기
  const user = new User(req.body);
  //불러온 모델을 사용하여 데이터베이스에 저장
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err: err });
    return res.status(200).json({ success: true });
  });
});

app.post('/login', (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: '이메일에 해당하는 유저가 없습니다.',
      });
    }
    user.comparePassword(req.body.password.toString(), (err, isMatch) => {
      if (!isMatch) {
        return res.json({
          loginSuccess: false,
          message: '비밀번호가 틀렸습니다.',
        });
      }

      user.generateToken((err, user) => {
        if (err) {
          return res.status(400).send(err);
        }
        console.log('로그인 성공');
        res.cookie('auth', user.token).status(200).json({
          loginSuccess: true,
          userId: user._id,
        });
      });
    });
  });
});

app.get('/auth', auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    ifAuth: true,
    email: req.user.email,
    name: req.user.name,
    role: req.user.role,
    image: req.user.image,
  });
});

app.get('/logout', auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: '' }, (err, user) => {
    if (err) {
      console.log('findOneAndUpdate에서 에러', err);
      return res.json({ logoutSuccess: false, err });
    }
    return res.status(200).send({
      logoutSuccess: true,
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
