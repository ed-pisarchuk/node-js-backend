const express = require('express')
const cookieParser = require('cookie-parser')
const logger = require('./loggers/httpLogger')
const auth = require('./middleware/auth')
const indexRouter = require('./routes/index')
const errorHandler = require('express-json-errors')
const app = express()

app.use(logger)
app.use(errorHandler())
app.use(express.json({limit: '100mb', extended: true}));
app.use(express.urlencoded({limit: '100mb', extended: true}));
app.use(cookieParser())
app.use(auth)
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})
app.use('/',  indexRouter)
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        err.code = 401
    }
    console.error(err)
    res.error(err)
})
app.use((req, res, next) => {
    res.error({
        code: 404,
        title: 'That resource was not found',
        description: 'I could not find the resource ' + req.url
    });
})
module.exports = app
