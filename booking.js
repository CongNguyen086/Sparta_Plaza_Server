const mongoose = require('mongoose');
const router = require('express').Router()
const path = require('path')
const nodemailer = require('nodemailer')
const EmailTemplate = require('email-templates')
const Promise = require('bluebird')
require('../models/Booking')

let Booking = mongoose.model('Booking')

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'umcsystem@gmail.com',
        pass: 'Comp1640',
    },
})

users = [{
    name: 'Bethany',
    email: 'bethanycurly@gmail.com'
}]

function loadTemplate(templateName, users) {
    let email = new EmailTemplate();
    return Promise.all(users.map((user) => {
        return new Promise((resolve, reject) => {
            email.render(path.join(__dirname, 'src', templateName), (err, result) => {
                if (err) reject(err);
                else resolve({
                    email: result,
                    user,
                });
            });
        });
    }));
}

loadTemplate('email_templates', users).then((results) => {
    return Promise.all(results.map((result) => {
        transporter.sendMail({
            to: result.context.email,
            from: 'Sparta Plaza',
            subject: result.email.subject,
            html: result.email.html,
            text: result.email.text,
        });
    }));
}).then(() => {
    console.log('Yay!');
});

router.post('/api/booking', async(req, res) => {
    try {
        const booking = new Booking(req.body)
        await booking.save()
        res.status(201).send(booking)
    } catch (error) {
        res.status(400).send('Message error:', error)
    }
})

router.get('/api/sendemail', (req, res) => {
    email
        .send({
            template: path.join(__dirname, 'src', 'email_templates'),
            message: {
                to: 'bethanycurly@gmail.com'
            },
            locals: {
                name: 'Bethany'
            }
        })
        .then(console.log)
        .catch(console.error);
})

module.exports = router