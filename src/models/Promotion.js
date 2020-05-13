const mongoose = require('mongoose')

const Schema = mongoose.Schema
const Promotion = new Schema({
    description: { type: String, required: true },
    type: {
        type: String,
        required: true,
        enum: ['Discount','Voucher'],
    },
    discount: { type: Number },
    start_day: { type: Date },
    end_day: { type: Date },
    status: {
        type: String,
        enum: ['Active', 'Pending', 'Overdue']
    },
    room_type: { type: Schema.Types.ObjectId, ref: 'RoomType' }
})

mongoose.model('Promotion', Promotion)