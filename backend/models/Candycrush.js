const mongoose = require('mongoose');

const CandyCrushschema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    gamecount: {
      type: Number,
      required: true,
      default: 0,
    },
    totalscore: {
      type: Number,
      required: true,
      default: 0,
    },
    highscore: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Candycrush', CandyCrushschema);
