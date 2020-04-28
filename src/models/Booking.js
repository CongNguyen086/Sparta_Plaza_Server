const mongoose = require('mongoose')
const validator = require('validator')

const Schema = mongoose.Schema
const Booking = new Schema({
    checkin_date: { type: Date, required: true, default: Date.now },
    checkout_date: { type: Date, required: true, default: Date.now },
    total_adult_number: { type: Number },
    total_child_number: { type: Number },
    tax: { type: Number },
    total: { type: Number },
    status: {
        type: String,
        enum: ['Paid', 'Cancelled', 'Pending', 'Arranged'],
    },
    payment_method: {
        type: String,
        enum: ['PayPal', 'Cash']
    },
    booking_details: [{
        info: { type: Schema.Types.ObjectId, ref: 'Room' },
        discount: { type: Number },
        extra_charge: { type: Number },
        subtotal: { type: Number },
    }],
    guest: {
        member_id: { type: Schema.Types.ObjectId },
        fullname: { type: String, trim: true },
        email: {
            type: String,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error('Email is invalid')
                }
            }
        },
        phone: {
            type: String,
            minlength: 9,
            maxlength: 11,
            validate(value) {
                if (!validator.isNumeric(value, { no_symbols: true })) {
                    throw new Error('Phone must contain only numbers')
                }
            }
        },
        address: { type: String },
    }
})

mongoose.model('Booking', Booking)