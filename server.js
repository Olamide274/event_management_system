const express = require('express')
const errorHandler = require('./middleware/errorHandler')
const connectDB = require('./config/dbConnection')


const app = express()
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5002


connectDB()

app.use(express.json())
app.use('/api/events', require('./Routes/eventRoute'))
app.use('/api/users', require('./Routes/userRoute'))
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})