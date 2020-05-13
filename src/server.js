const express = require('express')
require('./db/mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(require('./routers'))

const port = process.env.PORT || 4000

app.listen(port, () => {
    console.log('Server is running on port ' + port)
})