const mongoose = require('mongoose');

const fieldSchema = new mongoose.Schema({
  label: String,
  type: String,
  options: [String],
});

const formSchema = new mongoose.Schema({
  title: String,
  description: String,
  fields: [fieldSchema],
}, { timestamps: true });

module.exports = mongoose.model('Form', formSchema);
