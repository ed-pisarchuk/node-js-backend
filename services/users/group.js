const BaseService = require('../../base/BaseService')
const models = require('../../models')

class Group extends BaseService {
    getList(data) {
        const params = {}
        params.include = [
            {model: models.user}
        ]
        return models.group.findAll(params)
    }

    createItem(data) {
        return models.group.create(data)
    }

    destroyItem(id) {
        return models.group.destroy({where: {id}}) ? Promise.resolve({result: "success"}) : Promise.reject({result: "error"})
    }
}

module.exports = Group