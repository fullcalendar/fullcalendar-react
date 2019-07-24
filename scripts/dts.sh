#!/usr/bin/env bash

set -e # always immediately exit upon error

# have tsc output a compound .d.ts file
npx tsc --declaration --emitDeclarationOnly --module AMD --outFile tmp/main

# ensure dist directory
mkdir -p dist

# hack to rename the module, which defaults at the filename
cat tmp/main.d.ts | sed -e 's/"FullCalendar"/"@fullcalendar\/react"/g' > dist/main.d.ts
