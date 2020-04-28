const router = require('express').Router()
const paypal = require('paypal-rest-sdk')

paypal.configure({
    'mode': 'sandbox',
    'client_id': process.env.CLIENT_ID,
    'client_secret': process.env.CLIENT_SECRET,
})

var transactions = [
    {
        "invoice_number": Math.random().toString(36).substr(2, 10),
        "item_list": {
            "items": [{
                "name": "item",
                "price": "1.00",
                "currency": "USD",
                "quantity": 2,
                "description": 'Promotion',
            }]
        },
        "amount": {
            "currency": "USD",
            "total": "2.00"
        },
        "description": "This is the payment description."
    }
]

var create_payment_json = {
    "intent": "sale",
    "payer": {
        "payment_method": "paypal"
    },
    "redirect_urls": {
        "return_url": "http://localhost:" + process.env.PORT + '/api/success',
        "cancel_url": "http://localhost:" + process.env.PORT + '/api/cancel',
    },
    "transactions": transactions
};

router.get('/api/payment', (req, res) => {
    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            console.log(error)
            res.redirect('/api/cancel')
        } else {
            var links = payment.links
            var counter = links.length
            while (counter--) {
                if (links[counter].method == 'REDIRECT') {
                    // res.setHeader('Access-Control-Allow-Origin', '*')
                    // res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
                    // res.header('Access-Control-Allow-Headers', 'Content-Type')
                    return res.status(201).redirect(links[counter].href)
                }
            }
        }
    });
})

router.get('/api/success', (req, res) => {
    var paymentId = req.query.paymentId;
    var payerId = { 'payer_id': req.query.PayerID };
    paypal.payment.execute(paymentId, payerId, function (error, payment) {
        if (error) {
            console.error(error);
        } else {
            if (payment.state == 'approved') {
                console.log(payment)
                res.status(200).send({ status: payment.payer.status });
            } else {
                res.status(503).send('payment not successful');
            }
        }
    });
})

router.get('/api/cancel', (req, res) => {
    res.status(200).send({ message: 'Payment Cancelled' })
})

module.exports = router

