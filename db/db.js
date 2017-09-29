const mongoose = require('mongoose');
const dbURI = require('../env/mongodb.config.js');
const easy = require('./words/easy.json');
const medium = require('./words/medium.json');
const hard = require('./words/hard.json');
const spicy = require('./words/spicy.json');

const options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }, 
                  replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };

const mongodbURI = process.env.dbURI || dbURI;
mongoose.connect(mongodbURI, {
  useMongoClient: true,
  promiseLibrary: global.Promise
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
