const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
require('./db/dbcon')
const routes = require('./routes/route')
const session = require('express-session')
const multer = require('multer')

const app = express()
dotenv.config({path:'config.env'})

// middlewares
app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin: ['http://localhost:3300', 'http://localhost:3600', 'https://ssfoodmart-admin.vercel.app', 'https://ssfoodmart-client.vercel.app'],
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS",
    credentials: true,
    optionsSuccessStatus: 200
}))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(session({
    secret: 'AS59S83gY6f0t1TVt1Y',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000*60*60*24*30
    }
}))
app.use(express.static('uploads'))
app.use('/', routes)

// env variables
const port = process.env.PORT || 5000
const host = process.env.HOST || 'localhost'


// ping
app.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}`);
})
