const mongoose = require('mongoose');

const vocabSchema = mongoose.Schema({
  japanese: {type: String, required: true},
  korean: {type: String, required: true},
  english: {type: String, required: true},
  polish: {type: String, required: true}
})

module.exports = mongoose.model('Vocab', vocabSchema)
