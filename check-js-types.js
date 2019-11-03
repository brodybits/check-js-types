#! /usr/bin/env node

const meow = require('meow')

const execa = require('execa')

const cli = meow(`
    Usage
      $ check-js-types files

    Options
      --strict Do strict type checking

    Examples
      $ check-js-types bin/**/*.js,lib/**/*.js

`, {
    flags: {
        strict: { type: 'boolean' }
    }
})

const c = cli;

const files = cli.input

if (files.length === 0) {
    cli.showHelp()
}

console.info(`files: ${files}`)

const flags = cli.flags

console.info(`flags: ${JSON.stringify(flags)}`)

const args = [].concat(
    '--allowJs',
    '--checkJs',
    '--noEmit',
    c.flags.strict ? '--strict' : [],
    '-g',
    c.input[0]
)

execa.sync('glob-tsc', args, { stdio: 'inherit' })
