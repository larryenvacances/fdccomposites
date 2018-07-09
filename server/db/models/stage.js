const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Define stageSchema
const stageSchema = new Schema({
  name: { type: String, unique: true }
})

// Create reference to User & export
const Stage = mongoose.model('Stage', stageSchema)
module.exports = Stage