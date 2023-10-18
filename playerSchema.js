const mongoose = require('mongoose');

const playerSchema = mongoose.Schema;

let player = new playerSchema({

  name: {
    type: String,
  },
  dob: {
    type: Date, 
  },
  nationality: {
    type: String,
  },
  height: {
    type: Number,
  },
  position: {
    type: String,
  },
  number: {
    type: Number,
  },
  goals: {
    type: Number,
  },
  injured: {
    type: Boolean,
  }
},
{ collection: 'players' });

module.exports = mongoose.model('players', player);