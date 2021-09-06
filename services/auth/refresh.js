const BaseService = require('../../base/BaseService')
const Account = require('./account')
const UnauthorizedError = require('../../errors/NotUnauthorizedError')

class Refresh extends BaseService {
    createItem(data) {
        if (!data.refreshToken) {
            throw new UnauthorizedError('Refresh Token not set', 'Рефреш токен не указан')
        }
        return Account.refreshToken(data.refreshToken)
    }
}

module.exports = Refresh