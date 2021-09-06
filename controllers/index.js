const getModules = require('../base/getModules')
const modules = {}
getModules(__dirname, (moduleName, moduleBody) => {
    modules[moduleName] = moduleBody
})
module.exports = modules