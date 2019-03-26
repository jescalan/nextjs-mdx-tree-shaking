const defineDynamicRoutes = require('@hashicorp/next-hashicorp/dist/routes')

const routes = []

module.exports = routes
module.exports.Link = defineDynamicRoutes(routes).Link
