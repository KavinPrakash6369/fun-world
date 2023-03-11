const candycrushRouter = require('express').Router();
const Candycrush = require('../models/Candycrush');

candycrushRouter.put('/addscore/:id', async (req, res) => {
  try {
    const user = await Candycrush.findOne({ userId: req.params.id });
    const score = req.body.score;
    if (user) {
      user.gamecount = user.gamecount + 1;
      user.totalscore = user.totalscore + score;
      user.highscore = score > user.highscore ? score : user.highscore;
      const updateUser = await user.save();
      if (updateUser) {
        res.send({
          name: req.body.name,
          userId: user.userId,
          gamecount: user.gamecount,
          totalscore: user.totalscore,
          highscore: user.highscore,
        });
        return;
      }
    } else {
      const user = new Candycrush({
        name: req.body.name,
        userId: req.params.id,
        gamecount: 1,
        totalscore: score,
        highscore: score,
      });
      await user.save();
      res.send({
        name: req.body.name,
        userId: user.userId,
        gamecount: user.gamecount,
        totalscore: user.totalscore,
        highscore: user.highscore,
      });
      return;
    }
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

candycrushRouter.get('/:id', async (req, res) => {
  try {
    const user = await Candycrush.findOne({ userId: req.params.id });
    if (user) {
      res.send(user);
      return;
    }
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

module.exports = candycrushRouter;
