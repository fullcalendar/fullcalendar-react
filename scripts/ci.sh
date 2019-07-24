#!/usr/bin/env bash

set -e # always immediately exit upon error

npm run clean
npm run meta
npm run build
npm run dts
npm run test:single
npm run lint
