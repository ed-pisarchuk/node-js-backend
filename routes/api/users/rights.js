const router = require('express').Router()
const baseRoute = require('../../../base/BaseCrud')
const controller = require('../../../controllers').users.rights
baseRoute.getBaseRoutes(router, controller)
module.exports = router