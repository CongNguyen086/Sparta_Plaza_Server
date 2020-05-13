const mongoose = require('mongoose')
const router = require('express').Router()
require('../../models/ManagementUser')

let ManagementUser = mongoose.model('ManagementUser')

module.exports = router