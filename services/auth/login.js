const BaseService = require('../../base/BaseService')
const Account = require('./account')
const UnauthorizedError = require('../../errors/NotUnauthorizedError')

class Login extends BaseService {
    createItem(data) {
        if (!data.username) {
            throw new UnauthorizedError('Username not set', 'Не указано имя пользователя')
        }
        if (!data.password) {
            throw new UnauthorizedError('Password not set', 'Не указан пароль пользователя')
        }
        return Account.getToken(data.username, data.password).catch(onerror => {
            console.error(onerror)
            return Promise.reject(onerror)
        })
    }
}

module.exports = Login