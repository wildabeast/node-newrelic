/*
 * Copyright 2020 New Relic Corporation. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict'

const logger = require('./logger.js').child({ component: 'proc-meminfo' })

module.exports = parseProcMeminfo

function parseProcMeminfo(data) {
  // In some rare cases the OS may be locked down so that you cannot retrieve this info.
  if (!data) {
    console.log('No memory data to parse.')
    return null
  }

  const memTotal = parseInt(data.replace(/MemTotal:\s*(\d*)\skB/, '$1'), 10)

  if (memTotal) {
    return memTotal / 1024
  }

  console.log('Unable to parse memory string:', data)
  return null
}
