const mongoose = require('mongoose')
const validator = require('validator')

const Schema = mongoose.Schema
const Member = new Schema({
    fullname: { type: String, required: true, trim: true },
    email: {
        type: String,
        required: true,
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
    password: {
        type: String,
        required: true,
        minlength: 3,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain key word "password"')
            }
        }
    }
})

mongoose.model('Member', Member)