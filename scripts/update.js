#!/usr/bin/env node

'use strict'

var fs = require('fs')
var path = require('path')

var out = []
process.stdin.setEncoding('utf8')
process.stdin.on('data', function(chunk) {
  if (!chunk) return
  var splits = chunk.split('\n')
  if (splits.length > 1) {
    while (splits.length && splits[0]) {
      out.push(splits.shift())
    }
  }
})

process.stdin.on('end', function() {
  var result = format(out)
  var fp = path.join(__dirname, '..', 'index.js')
  fs.rename(fp, fp + '.bak', function(err) {
    fs.writeFile(fp, result, 'utf8', function(err) {
      if (err) throw err
      console.log('done')
    })
  })
})

function format(data) {
  if (!data.length)
    throw new Error('Unexpected data')

  var result = '\'use strict\'\n\n' +
    'module.exports = [\n' +
    '  \'' + data[0] + '\'\n'

  for (var i = 1, len = data.length; i < len; i++) {
    result += ', \'' + data[i] + '\'\n'
  }

  return result + ']\n'
}
