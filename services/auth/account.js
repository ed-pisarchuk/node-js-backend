const models = require('../../models')
const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWT_SECRET
const jwtTokenTimeout = process.env.JWT_TOKEN_TIMEOUT
const UnauthorizedError = require('../../errors/NotUnauthorizedError')

class Account {
    static getData(params) {
        return models.user.findOne(params)
    }

    static getToken(username, password) {
        return Account.getData({
            where: {username: username, password: password},
            attributes: ['id', 'email', 'isBlocked', 'expiredDate']
        }).then(userData => {
            if (!userData) {
                throw new UnauthorizedError('User not found', 'Пользователь отсутствует в системе')
            }
            if (userData.dataValues.isBlocked) {
                throw new UnauthorizedError('User account has blocked', 'Учетная запись пользователя заблокирована')
            }
            if (userData.dataValues.expiredDate && userData.dataValues.expiredDate < new Date()) {
                throw new UnauthorizedError('User account has expired', 'Учетная запись пользователя посрочена')
            }
            const tokens = this.generateToken(userData)
            if (tokens && tokens.refreshToken) {
                userData.refreshToken = tokens.refreshToken
                userData.save()
            }
            return tokens
        })
    }

    static refreshToken(refreshToken) {
        const decoded = jwt.verify(refreshToken, jwtSecret)
        if (!decoded.user_id) {
            throw new UnauthorizedError('Refresh Token is invalid', 'Рефреш токен не верен')
        }
        return Account.getData({
            where: {id: decoded.user_id},
            attributes: ['id', 'email', 'isBlocked', 'expiredDate', 'refreshToken']
        }).then(userData => {
            if (!userData) {
                throw new UnauthorizedError('User not found', 'Пользователь уделен из системы')
            }
            if (userData.dataValues.isBlocked) {
                throw new UnauthorizedError('User account has blocked', 'Пользователь заблокирован')
            }
            if (userData.dataValues.expiredDate && userData.dataValues.expiredDate < new Date()) {
                throw new UnauthorizedError('User account has expired', 'Учетная запись пользователя посрочена')
            }
            if (userData.dataValues.refreshToken && userData.dataValues.refreshToken !== refreshToken) {
                throw new UnauthorizedError('Refresh Token is invalid', 'Рефреш токен не верен')
            }
            const tokens = this.generateToken(userData)
            if (tokens && tokens.refreshToken) {
                userData.refreshToken = tokens.refreshToken
                userData.save()
            }
            return tokens
        })
    }

    static generateToken(userData) {
        const currentDate = new Date()
        currentDate.setSeconds(currentDate.getSeconds() + parseInt(jwtTokenTimeout))
        return {
            accessToken: jwt.sign({
                iss: 'back',
                exp: Math.round(currentDate.getTime() / 1000),
                user: userData
            }, jwtSecret),
            refreshToken: jwt.sign({
                iss: 'back',
                nbf: Math.round((new Date()).getTime() / 1000),
                user_id: userData.id
            }, jwtSecret)
        }
    }

    static checkToken(accessToken) {
        let decoded
        try {
            decoded = jwt.verify(accessToken, jwtSecret)
        } catch (e) {
            return Promise.resolve({valid: false})
        }
        if (!decoded && decoded.user) {
            return Promise.resolve({valid: false})
        }
        return Account.getData({
            where: {id: decoded.user.id},
            attributes: ['id', 'email', 'isBlocked', 'expiredDate', 'refreshToken']
        }).then(userData => {
            if (userData) {
                return Promise.resolve({valid: true})
            } else {
                return Promise.resolve({valid: false})
            }
        })
    }
}

module.exports = Account