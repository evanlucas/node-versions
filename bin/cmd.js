#!/usr/bin/env node

'use strict'

var nopt = require('nopt')
  , knownOpts = { help: Boolean
                , version: Boolean
                , json: Boolean
                , pretty: Boolean
                , latest: Boolean
                , lts: Boolean
                }
  , shortHand = { h: ['--help']
                , v: ['--version']
                , j: ['--json']
                , p: ['--pretty']
                }
  , parsed = nopt(knownOpts, shortHand)
  , help = require('help')()
  , pkg = require('../package')
  , versions = require('../')

var LTS_MAJOR = '4'

if (parsed.help) {
  return help()
}

if (parsed.version) {
  console.log('node-versions', 'v' + pkg.version)
  return
}

if (parsed.lts) {
  console.log(versions.filter(function(v) {
    return v.split('.')[0] === LTS_MAJOR
  }).reverse()[0])
  return
}

if (parsed.latest) {
  console.log(versions[versions.length - 1])
  return
}

if (parsed.json || parsed.pretty) {
  if (parsed.pretty) {
    console.log(JSON.stringify(versions, null, 2))
  } else {
    console.log(JSON.stringify(versions))
  }
} else {
  console.log(versions)
}
