const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Define partSchema
const partSchema = new Schema({
  serialNumber: { type: String, unique: false },
  partModelName: { type: String, unique: false }
})

// Create reference to User & export
const Part = mongoose.model('Part', partSchema)
module.exports = Part