const mongoose = require('mongoose')
const router = require('express').Router()
const nodemailer = require('nodemailer')
const hbs = require('nodemailer-express-handlebars')
require('../models/Booking')

let Booking = mongoose.model('Booking')

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'darcyembruso@gmail.com', // TODO: your gmail account 
        pass: 'darcy_embruso123' // TODO: your gmail password
    },
    tls: {
        rejectUnauthorized: false
    },
})

transporter.use('compile', hbs({
    viewEngine: {
        extName: '.handlebars',
        partialsDir: './src/email_templates/',
        layoutsDir: './src/email_templates/',
        defaultLayout: '',
    },
    viewPath: './src/email_templates/',
}))

let mailOptions = {
    from: 'Cong Nguyen', // TODO: email sender
    to: 'bethanycurly@gmail.com', // TODO: email receiver // 'son@lovin.vn'
    subject: 'Booking receipt from Sparta Plaza',
    text: 'Wooohooo it works!!',
    template: 'html',
    context: {
        name: 'Mr. Son'
    } // send extra values to template
};

transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
        return console.log('Error occurs', err);
    }
    return console.log('Email sent!!!');
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

// const email = new Email({
//     message: {
//         from: 'darcyembruso@gmail.com'
//     },
//     send: true,
//     transport: {
//         jsonTransport: true,
//         host: "localhost",
//         port: 587,
//         secure: false, // upgrade later with STARTTLS
//         auth: {
//             user: "darcyembruso@gmail.com",
//             pass: "darcy_embruso123"
//         }
//     }
// });