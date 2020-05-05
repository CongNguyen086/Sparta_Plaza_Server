const express = require('express')
require('./db/mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
app.use(cors())

// const roomTypeRouter = require('./routers/api/roomType')
// const bookingRouter = require('./routers/api/booking')
// const roomRouter = require('./routers/api/room')
// const paypalRouter = require('./routers/api/paypal')

app.use(bodyParser.json())
app.use(require('./routers'))
// app.use(roomTypeRouter)
// app.use(bookingRouter)
// app.use(roomRouter)
// app.use(paypalRouter)

const port = process.env.PORT || 4000

app.listen(port, () => {
    console.log('Server is running on port ' + port)
})