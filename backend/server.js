const express = require('express');
const dotenv = require('dotenv');
const userRouter = require('./routes/User');
const mongo = require('mongoose');
const candycrushRouter = require('./routes/candycrushRouter');
const typingRouter = require('./routes/typingspeedRouter');
const path = require('path');
const core = require('cors');

dotenv.config();
const app = express();

mongo
  .connect(
    'mongodb+srv://Fun_World:funworld123@cluster0.d6c0bqj.mongodb.net/Funworld?retryWrites=true&w=majority'
  )
  .then(() => {
    console.log('Connected to DB');
    app.listen(5000, () => console.log(`Funworld listening on port 5000!`));
  })
  .catch((e) => console.log(e));

app.use(express.json());
app.use(core());

app.use('/user', userRouter);
app.use('/candycrush', candycrushRouter);
app.use('/typingspeed', typingRouter);

// const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '../frontend/build')));
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});
