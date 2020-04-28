const mongoose = require('mongoose');
const router = require('express').Router()
require('../models/RoomType')

let RoomType = mongoose.model('RoomType')

router.post('/api/roomtype', async(req, res) => {
    const roomType = new RoomType(req.body)
    try {
        await roomType.save()
        res.status(201).send(roomType)
    } catch (error) {
        res.status(400).send('Message error:', error)
    }
})

module.exports = router