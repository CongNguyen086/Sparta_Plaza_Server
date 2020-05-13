const mongoose = require('mongoose')
const router = require('express').Router()
require('../../models/Review')

let Review = mongoose.model('Review')

module.exports = router