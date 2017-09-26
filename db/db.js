const mongoose = require('mongoose');
const mongoDB = 'mongodb://127.0.0.1:27017/test';

const easy = require('./words/easy.json');
const medium = require('./words/medium.json');
const hard = require('./words/hard.json');
const spicy = require('./words/spicy.json');

console.log(easy);

mongoose.connect(mongoDB, { 
  useMongoClient: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  // we're connected!
  console.log('mongodb connected');
});

const Schema = mongoose.Schema;
const words = new Schema({
  word: String,
  difficulty: String
});

const pictionary = mongoose.model('pictionary', words);

pictionary.insertMany(easy);
pictionary.insertMany(medium);
pictionary.insertMany(hard);
pictionary.insertMany(spicy);

module.exports = db;
