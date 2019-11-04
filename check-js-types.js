#! /usr/bin/env node

const meow = require('meow')

const globby = require('globby')

const execa = require('execa')

const cli = meow(`
    Usage
      $ check-js-types files

    Options
      --strict Do strict type checking

    Examples
      $ check-js-types --strict bin/**/*.js lib/**/*.js

`, {
    flags: {
        strict: { type: 'boolean' }
    }
})

const files = cli.input

if (files.length === 0) {
    cli.showHelp()
}

console.info(`files: ${files}`)

const filesList = globby.sync(files)

console.info(`files, expanded using globby: ${filesList}`)

const flags = cli.flags

console.info(`flags: ${JSON.stringify(flags)}`)

const args = [].concat(
    '--allowJs',
    '--checkJs',
    '--noEmit',
    flags.strict ? '--strict' : [],
    filesList
)

// FUTURE TODO: put this into a more descriptive try/catch block
// and add testing to ensure this works properly
console.log('check for valid tsc (TypeScript compiler) version')
execa.sync('tsc', ['--version'], { stdio: 'inherit' })
console.log('valid tsc version found')

execa.sync('tsc', args, { stdio: 'inherit' })
