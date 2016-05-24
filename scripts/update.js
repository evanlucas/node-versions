#!/usr/bin/env node

'use strict'

var fs = require('fs')
var path = require('path')
const Transform = require('stream').Transform

const DELIMITER = Buffer('\n')
let buf = ''
const stream = new Transform({
  transform: (chunk, enc, cb) => {
    if (buf) {
      chunk = Buffer.concat([buf, chunk])
    }

    let idx = chunk.indexOf(DELIMITER)
    if (idx === -1) {
      buf = chunk
      return cb()
    }

    let off = 0
    while (idx !== -1) {
      const slice = chunk.slice(0, idx)
      off += slice.length + 1
      stream.push(slice)
      chunk = chunk.slice(idx + 1)
      idx = chunk.indexOf(DELIMITER)
    }

    buf = chunk
    return cb()
  }
})

var out = []
process.stdin.setEncoding('utf8')
process.stdin.pipe(stream).on('data', (item) => {
  out.push(item.toString())
})

stream.on('end', function() {
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
