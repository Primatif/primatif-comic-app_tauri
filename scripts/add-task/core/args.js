export class ArgParser {
  static parse(argv) {
    const map = {}
    for (let i = 2; i < argv.length; i++) {
      const token = argv[i]
      if (!token.startsWith('--')) continue
      const key = token.slice(2)
      const next = argv[i + 1]
      if (!next || next.startsWith('--')) {
        map[key] = map[key] ?? true
      } else {
        if (map[key] === undefined) map[key] = next
        else if (Array.isArray(map[key])) map[key].push(next)
        else map[key] = [map[key], next]
        i++
      }
    }
    return ArgParser.#toOptions(map)
  }

  static #toArray(val) {
    if (val === undefined || val === true) return []
    return Array.isArray(val) ? val : [String(val)]
  }

  static #splitMany(items, splitter) {
    const out = []
    for (const item of ArgParser.#toArray(items)) {
      const parts = String(item)
        .split(splitter)
        .map((s) => s.trim())
        .filter(Boolean)
      out.push(...parts)
    }
    return out
  }

  static #toOptions(map) {
    const help = Boolean(map.help || map.h)
    const title = map.title || map.t
    const target = (map.target || 'current').toString()
    const description = map.description || map.desc || map.d || ''

    const acceptance = [
      ...ArgParser.#splitMany(map.ac, /\n|\r\n/),
      ...ArgParser.#splitMany(map.acceptance, /;|\n|\r\n/),
    ]

    const links = [
      ...ArgParser.#splitMany(map.link, /\n|\r\n/),
      ...ArgParser.#splitMany(map.links, /,|\n|\r\n/),
    ]

    const notes = map.notes || ''
    const dry = Boolean(map.dry)

    return { help, title, target, description, acceptance, links, notes, dry }
  }

  static usage() {
    return 'Usage: node scripts/add-task/index.js --title "Title" [--target current|backlog|alias] [--description "..."] [--ac "crit 1" --ac "crit 2" | --acceptance "a; b; c"] [--link url --link url2 | --links "u1, u2"] [--notes "..."] [--dry]'
  }
}
