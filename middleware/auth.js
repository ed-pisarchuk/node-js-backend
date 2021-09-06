const jwt = require('express-jwt')
const jwtSecret = process.env.JWT_SECRET
const jwtAlgorithm = process.env.JWT_ALGORITHM

module.exports = jwt({secret: jwtSecret, algorithms: [jwtAlgorithm]}).unless({path: ['/auth/login','/auth/refresh','/auth/check']})