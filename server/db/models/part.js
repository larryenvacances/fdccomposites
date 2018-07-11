const mongoose = require('mongoose')
const Schema = mongoose.Schema

var childSchema = new Schema({
  stage: { type: String, unique: false },
  lastModifiedBy: { type: String, unique: false },
  lastModifiedDate: { type: Date, unique: false },
});

// Define partSchema
const partSchema = new Schema({
  serialNumber: { type: String, unique: false },
  model: { type: String, unique: false },
  fullName: { type: String, unique: true, dropDups: true },
  processStep: { type: String, unique: false },
  stage: { type: String, unique: false },
  lastModifiedBy: { type: String, unique: false },
  lastModifiedDate: { type: Date, unique: false },
  history: [
    childSchema
  ]
})

// Create reference to User & export
const Part = mongoose.model('Part', partSchema)
module.exports = Part