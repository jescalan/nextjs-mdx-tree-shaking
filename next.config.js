const {
  withHashicorp,
  defineStaticRoutes
} = require('@hashicorp/next-hashicorp')
const routes = require('./routes')
const path = require('path')

module.exports = withHashicorp({
  async exportPathMap() {
    return defineStaticRoutes(routes)
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.yml$/,
      use: [
        { loader: path.join(__dirname, 'node_modules/json-loader') },
        { loader: path.join(__dirname, 'node_modules/yaml-loader') }
      ]
    })
    return config
  }
})
