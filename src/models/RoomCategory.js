const mongoose = require('mongoose')
const validator = require('validator')

const Schema = mongoose.Schema
const RoomCategory = mongoose.model('RoomCategory', new Schema({
    type: { type: String, require: true, trim: true },
    rate: {
        type: Number,
        validate(value) {
            if (value < 0) {
                throw new Error('Rate must be a positive value')
            }
        },
    },
    description: { type: String, trim: true },
    quality_type: { type: String },
    bed_description: { type: String },
    view_type: { type: String },
    adult_number: { type: Number },
    child_number: { type: Number },
    room_quantity: { type: Number, default: 0 },
    status: { type: String, trim: true },
    image: [{ type: String }],
    current_promotion: { type: Schema.Types.ObjectId, ref: 'Promotion' },
}))

roomCategory.save().then(() => {
    console.log(roomCategory)
}).catch(error => {
    console.log('Error: ', error)
})