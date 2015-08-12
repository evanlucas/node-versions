#!/usr/bin/env node

'use strict'

var nopt = require('nopt')
  , knownOpts = { help: Boolean
                , version: Boolean
                , json: Boolean
                , pretty: Boolean
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

if (parsed.help) {
  return help()
}

if (parsed.version) {
  console.log('node-versions', 'v' + pkg.version)
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
