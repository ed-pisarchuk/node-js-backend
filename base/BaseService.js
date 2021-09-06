class BaseService {
    createItem(data) {
        return Promise.reject({message: 'Object not supported method', code: 405})
    }

    updateItem(id, data) {
        return Promise.reject({message: 'Object not supported method', code: 405})
    }

    destroyItem(id) {
        return Promise.reject({message: 'Object not supported method', code: 405})
    }

    getById(id) {
        return Promise.reject({message: 'Object not supported method', code: 405})
    }

    getList(data) {
        return Promise.reject({message: 'Object not supported method', code: 405})
    }

    countItems(data) {
        return Promise.reject({message: 'Object not supported method', code: 405})
    }
}

module.exports = BaseService