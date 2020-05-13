const mongoose = require('mongoose')

const Schema = mongoose.Schema
const Service = new Schema({
    code: { type: String, trim: true },
    description: { type: String },
    value: { type: Number },
})

mongoose.model('Service', Service)