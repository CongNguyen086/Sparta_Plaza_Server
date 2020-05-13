const mongoose = require('mongoose')
const validator = require('validator')

const Schema = mongoose.Schema
const Review = new Schema({
    content: { type: String, required: true },
    star: { type: Number },
    member: { type: Schema.Types.ObjectId, ref: 'Member' }
})

mongoose.model('Review', Review)