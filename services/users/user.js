const BaseService = require('../../base/BaseService')
const models = require('../../models')

class User extends BaseService {
    getList(data) {
        const params = {}
        params.include = [
            {model: models.group}
        ]
        return models.user.findAll(params)
    }

    createItem(data) {
        return models.user.create(data)
    }

    destroyItem(id) {
        return models.user.destroy({where: {id}}) ? Promise.resolve({result: "success"}) : Promise.reject({result: "error"});
    }
}

module.exports = User