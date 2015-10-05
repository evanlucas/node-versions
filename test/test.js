'use strict'

var test = require('tap').test
  , versions = require('../')

test('should concat', function(t) {
  var len = versions.length
  t.equal(versions[0], '0.0.1')
  t.end()
})
