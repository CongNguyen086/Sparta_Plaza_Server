const mongoose = require('mongoose')

const Schema = mongoose.Schema
const Room = new Schema({
    room_number: {
        type: Number,
        validate(value) {
            if (value < 0) {
                throw new Error('Rate must be a positive value')
            }
        },
    },
    operation_status: { type: String },
    room_type: [{ type: Schema.Types.ObjectId, ref:'RoomType' }],
})

mongoose.model('Room', Room)