//npm isntall express 필요
const express = require('express');
const app = express();
const port = 5500;
const bodyParser = require("body-parser");
const { User } = require("./models/UserModel");

const config = require('./config/key');

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

//npm install mongoose 필요
const mongoose = require('mongoose');
mongoose.set('strictQuery',true);
mongoose.connect(config.mongoURI)
.then(()=>{console.log("mongoDB connected..");});

app.get('/', (req, res) => {
  res.send('바뀌어라 야;;')
});


app.post('/register', (req, res) => {
  const user = new User(req.body);
  user.save((err, userInfo) => {
    if(err) return res.json({success: false, err: err});
    return res.status(200).json({success: true});
  })
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})