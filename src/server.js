require('dotenv').config()

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const router = require('./routes')
const app = express()

const PORT = process.env.PORT || 3000
const DB_URL = process.env.MONGO_DB

mongoose.connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true})

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use('/v1', router)

app.listen(PORT, () => {
    console.log(`Server running ${PORT}`);
})