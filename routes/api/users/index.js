const router = require('express').Router()
const getModules = require('../../../base/getModules')

getModules(__dirname, (moduleName, moduleBody) => {
    router.use('/' + moduleName, moduleBody)
})

const baseRoute = require('../../../base/BaseCrud')
const controller = require('../../../controllers').users.user
baseRoute.getBaseRoutes(router, controller)
module.exports = router