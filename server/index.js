const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const connectDB = require('./config/DB.js')

const app = express()
const productRoutes = require('./routes/productRoutes')

dotenv.config()

app.use(cors())
app.use(bodyParser.json())
connectDB()

app.use('/api/products', productRoutes)

const PORT = 5000 || process.env.PORT

app.listen(PORT, console.log(`App listen on port ${PORT}`))
