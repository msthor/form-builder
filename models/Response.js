const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
  formId: mongoose.Schema.Types.ObjectId,
  answers: Object,
}, { timestamps: true });

module.exports = mongoose.model('Response', responseSchema);
