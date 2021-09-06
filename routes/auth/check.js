const router = require('express').Router()
const baseRoute = require('../../base/BaseCrud')
const controller = require('../../controllers').auth.check
baseRoute.getBaseRoutes(router, controller)
module.exports = router