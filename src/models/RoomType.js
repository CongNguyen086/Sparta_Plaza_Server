const mongoose = require('mongoose')

const Schema = mongoose.Schema
const RoomType = new Schema({
    room_type: { type: String, require: true, trim: true },
    rate: {
        type: Number,
        validate(value) {
            if (value < 0) {
                throw new Error('Rate must be a positive value')
            }
        },
    },
    description: { type: String, trim: true },
    quality_type: { type: String, trim: true },
    bed_description: { type: String, trim: true },
    view_type: { type: String, trim: true },
    adult_number: { type: Number },
    child_number: { type: Number },
    room_quantity: { type: Number, default: 0 },
    status: {
        type: String,
        trim: true,
        enum: ['Active', 'Inactive'],
    },
    image: [{ type: Buffer }],
})

mongoose.model('RoomType', RoomType)