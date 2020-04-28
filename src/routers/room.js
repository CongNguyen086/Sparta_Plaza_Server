const mongoose = require('mongoose');
const router = require('express').Router()
require('../models/Room')

let Room = mongoose.model('Room')

router.post('/api/room', async(req, res) => {
    const room = new Room(req.body)
    try {
        await room.save()
        res.status(201).send(room)
    } catch (error) {
        res.status(400).send('Message error:', error)
    }
})

module.exports = router