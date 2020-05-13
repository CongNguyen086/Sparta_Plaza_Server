const mongoose = require('mongoose')
const router = require('express').Router()
require('../../models/Member')

let Member = mongoose.model('Member')

module.exports = router