const mongoose = require('mongoose')
const router = require('express').Router()
require('../../models/Promotion')

let Promotion = mongoose.model('Promotion')

module.exports = router