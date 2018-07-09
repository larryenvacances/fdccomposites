const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Define partSchema
const partSchema = new Schema({
  serialNumber: { type: String, unique: false },
  model: { type: String, unique: false },
  fullName: { type: String, unique: true, dropDups: true },
  processStep: { type: String, unique: false }
})

// Create reference to User & export
const Part = mongoose.model('Part', partSchema)
module.exports = Part