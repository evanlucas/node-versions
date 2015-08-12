'use strict'

var test = require('tap').test
  , iojsVersions = require('iojs-versions')
  , nodeVersions = require('node-legacy-versions')
  , versions = require('../')

test('should concat', function(t) {
  var len = versions.length
  t.equal(len, iojsVersions.length + nodeVersions.length)
  t.equal(versions[0], '0.0.1')
  t.end()
})
