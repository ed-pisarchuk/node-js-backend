const router = require('express').Router()
const baseRoute = require('../../base/BaseCrud')
const controller = require('../../controllers').auth.login
baseRoute.getBaseRoutes(router, controller)
module.exports = router


/*
const router = require('express').Router()
router.get('/', function(req, res) {
    res.send('hello world');
});
module.exports = router*/
