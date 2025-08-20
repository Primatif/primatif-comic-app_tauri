import { readFile } from 'fs/promises'
import path from 'path'

export class Config {
  constructor(targets) {
    this.targets = targets // Record<string, string>
  }
}

export class ConfigLoader {
  constructor(rootDir) {
    this.rootDir = rootDir
    // Prefer new location under the add-task package
    this.primaryPath = path.join(this.rootDir, 'scripts', 'add-task', 'task-targets.json')
    // Fallback to legacy location for backward compatibility
    this.legacyPath = path.join(this.rootDir, 'scripts', 'task-targets.json')
  }
  async load() {
    let raw
    try {
      raw = await readFile(this.primaryPath, 'utf8')
    } catch (err) {
      if (err && err.code === 'ENOENT') {
        raw = await readFile(this.legacyPath, 'utf8')
      } else {
        throw err
      }
    }
    const data = JSON.parse(raw)
    if (!data || typeof data !== 'object' || typeof data.targets !== 'object') {
      throw new Error('Invalid config: missing "targets" map')
    }
    return new Config(data.targets)
  }
}
