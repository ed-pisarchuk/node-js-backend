const logger = require('morgan')
module.exports = logger(function (tokens, req, res) {
    return JSON.stringify({
        date: new Date().toISOString(),
        token: req.user,
        method: tokens.method(req, res),
        url: tokens.url(req, res),
        status: tokens.status(req, res),
        "content-length": tokens.res(req, res, 'content-length'),
        "response-time": (tokens['response-time'](req, res) + 'ms')
    })
})