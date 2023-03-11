const userRouter = require('express').Router();
const User = require('../models/Usermodel');
const Typing = require('../models/Typing');
const Candycrush = require('../models/Candycrush');
const Sudoku = require('../models/Sudoku');
const generateToken = require('../Utils.js');

userRouter.post('/signup', async (req, res) => {
  console.log('inside signup backend');
  try {
    const name = req.body.name;
    const password = req.body.password;
    const email = req.body.email;
    const temp = await User.findOne({ email: email });
    if (temp) {
      res.status(404).send('User already exists');
    } else {
      const newUser = new User({
        name: name,
        password: password,
        email: email,
      });
      const user = await newUser.save();
      const users = await User.findOne({ email: email });
      res.status(200).send({
        user: users,
        message: 'Account created successfully',
      });
    }
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

userRouter.post('/signin', async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({ email: email });
    if (user) {
      if (user.password == password) {
        res.status(200).send({ user: user });
      } else {
        res.status(400).send('Wrong password');
      }
    } else {
      res.status(404).send('user not found');
    }
  } catch (e) {
    res.status(500).send('Internal Server Error');
  }
});

userRouter.get('/', async (req, res) => {
  try {
    const typegameDetail = await Typing.find();
    const candycrushgameDetail = await Candycrush.find();
    const sudokugameDetail = await Sudoku.find();
    res.status(200).send({
      typing: typegameDetail,
      candycrush: candycrushgameDetail,
      sudoku: sudokugameDetail,
    });
  } catch (e) {
    res.status(500).send('Internal Server Error');
  }
});

module.exports = userRouter;
