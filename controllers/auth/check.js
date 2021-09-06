const BaseController = require('../../base/BaseController')
const Service = require('../../services').auth.check
if (!Service) {
    throw new Error('Service auth.check is not defined')
}
const controller = new BaseController()

controller.index = function (req, res, next) {
    let token
    if (req.headers && req.headers.authorization) {
        token = req.headers.authorization.replace('Bearer ', '')
    }
    this.prepareResults(this.service.getList(token), res)
}

const service = new Service()
controller.setService(service)
module.exports = controller