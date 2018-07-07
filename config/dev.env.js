var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_URL: '"http://api.laravue.org/api/v1"',
  API_URI: '"http://api.laravue.org"'
})
