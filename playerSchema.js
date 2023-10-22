const mongoose = require('mongoose');
//otetaan Mongoose käyttöön
const playerSchema = mongoose.Schema;

let player = new playerSchema({

  name: {
    type: String,
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
// Export model
module.exports = mongoose.model('players', player);
