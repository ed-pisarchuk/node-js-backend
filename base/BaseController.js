class BaseController {
    service
    defaultErrorFields = ['code', 'message', 'description']

    setService(service) {
        this.service = service
    }

    prepareResults(result, res) {
        result.then(results => {
            res.json(this.resultEntity(results))
        }).catch(err => {
            res.error(this.resultError(err))
        })
    }

    resultEntity(result) {
        const completable = {}
        completable.items_count = 0
        completable.items = {}
        if (result) {
            if (Array.isArray(result)) {
                completable.items_count = result.length || 0
                completable.items = result
            } else {
                completable.items_count = 1
                completable.items = [result]
            }
        }
        return completable
    }

    resultError(error, fields) {
        fields = fields || this.defaultErrorFields
        let errorObject = {}
        fields.forEach(function (item) {
            switch (item) {
                case 'code':
                    errorObject[item] = error[item] || 400
                    break
                case 'message':
                    errorObject.title = error[item] || null
                    break
                default:
                    errorObject[item] = error[item] || null
                    break
            }
        })
        return errorObject
    }

    show(req, res, next) {
        this.prepareResults(this.service.getById(req.params.id, req.query, req.user), res)
    }

    index(req, res, next) {
        this.prepareResults(this.service.getList(req.query, req.user), res)
    }

    store(req, res, next) {
        this.prepareResults(this.service.createItem(req.body, req.user), res)
    }

    update(req, res, next) {
        this.prepareResults(this.service.updateItem(req.params.id, req.body, req.user), res)
    }

    destroy(req, res, next) {
        this.prepareResults(this.service.destroyItem(req.params.id, req.user), res)
    }

    count(req, res, next) {
        this.prepareResults(this.service.countItems(req.query, req.user), res)
    }
}

module.exports = BaseController