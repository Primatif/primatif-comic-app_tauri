import path from 'path'
import { access } from 'fs/promises'

export class TargetResolver {
  constructor(config, rootDir) {
    this.config = config
    this.rootDir = rootDir
  }
  async resolve(alias) {
    const rel = this.config.targets[alias]
    if (!rel) throw new Error(`Unknown target alias: ${alias}. Available: ${Object.keys(this.config.targets).join(', ')}`)
    const abs = path.join(this.rootDir, rel)
    await access(abs).catch(() => {
      throw new Error(`Target file does not exist: ${rel}`)
    })
    return { alias, rel, abs }
  }
}
