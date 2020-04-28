const express = require('express')
require('./db/mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
app.use(cors())

const roomTypeRouter = require('./routers/roomType')
const bookingRouter = require('./routers/booking')
const roomRouter = require('./routers/room')
const paypalRouter = require('./routers/paypal')

app.use(bodyParser.json())
app.use(roomTypeRouter)
app.use(bookingRouter)
app.use(roomRouter)
app.use(paypalRouter)

const port = process.env.PORT || 4000

app.listen(port, () => {
    console.log('Server is running on port ' + port)
})