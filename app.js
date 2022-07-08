const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv/config')

//middleware
app.use(bodyParser())
app.use(cors())

//import routes
const employeeRoutes = require('./routes/employee')
const userRoutes = require('./routes/auth')

//routes
app.use('/api/employee', employeeRoutes)
app.use('/api/user', userRoutes)

//connection to db
mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

let db = mongoose.connection

db.on('error', console.error.bind(console, 'Database connect Error'))
db.once('open', () => {
    console.log('Database connected')
})

//Listen Port
app.listen(process.env.PORT, () => {
    console.log(`Server running in ${process.env.PORT}`)
})