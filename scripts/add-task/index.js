#!/usr/bin/env node
import path from 'path'
import { fileURLToPath } from 'url'
import { run } from './cli.js'

export { run } from './cli.js'

// If executed directly: run as CLI
const __filename = fileURLToPath(import.meta.url)
if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
  run(process.argv).then((code) => process.exit(code)).catch((err) => {
    console.error(err?.message || String(err))
    process.exit(1)
  })
}
