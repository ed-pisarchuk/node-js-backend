const BaseService = require('../../base/BaseService')
const Account = require('./account')

class Check extends BaseService {
    getList(token) {
        return Account.checkToken(token)
    }
}

module.exports = Check