'use strict'

var nodeVersions = require('node-legacy-versions')
  , iojsVersions = require('iojs-versions')

module.exports = nodeVersions.concat(iojsVersions)
