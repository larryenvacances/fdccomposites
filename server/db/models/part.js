const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Define partSchema
const partSchema = new Schema({
  serialNumber: { type: String, unique: false },
  model: { type: String, unique: false },
  fullName: { type: String, unique: true, dropDups: true },
  processStep: { type: String, unique: false },
  stage: { type: String, unique: false },
  lastModifiedBy: { type: String, unique: false },
  lastModifiedDate: { type: Date, unique: false },
  isRework: { type: Boolean, unique: false, default: false },
  history: [
    {
      stage: { type: String, unique: false },
      isRework: { type: Boolean, unique: false, default: false },
      lastModifiedBy: { type: String, unique: false },
      lastModifiedDate: { type: Date, unique: false },
    }
  ]
})

// Create reference to User & export
const Part = mongoose.model('Part', partSchema)
module.exports = Part