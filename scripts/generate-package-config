#!/usr/bin/env node

/*
Generates a package.json for the dist/ directory.
Massages some fields in the root package.json.
*/

const fs = require('fs')
const path = require('path')
const packageConfig = Object.assign({}, require('../package.json')) // copy
const outputPath = path.join(__dirname, '../dist/package.json')

delete packageConfig.private // remove this safeguard
delete packageConfig.devDependencies
delete packageConfig.scripts

packageConfig.main = 'main.umd.js'
packageConfig.module = 'main.esm.js'

fs.writeFileSync(
  outputPath,
  JSON.stringify(packageConfig, null, '  ')
)
