const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Define partSchema
const partModelSchema = new Schema({
	name: { type: String, unique: false }
})

// Create reference to User & export
const PartModel = mongoose.model('PartModel', partModelSchema)
module.exports = PartModel