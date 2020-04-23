const path = require('path')
const express = require('express')

const publicDirPath = path.join(__dirname, '../public')
const app = express()

app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.send('Home')
})

app.get('/room', (req, res) => {
    if(!req.query.search) return res.send('Error')
    res.send({
        product: []
    })
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})