import path from 'path'
import { fileURLToPath } from 'url'
import { ConfigLoader } from './core/config.js'
import { ArgParser } from './core/args.js'
import { TargetResolver } from './core/target.js'
import { FileAppender } from './core/file.js'
import { Task } from './core/task.js'

export async function run(argv) {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)
  const rootDir = path.resolve(__dirname, '..', '..')

  const opts = ArgParser.parse(argv)
  if (opts.help) {
    console.log(ArgParser.usage())
    return 0
  }
  if (!opts.title) {
    console.error('Missing required --title')
    return 1
  }

  const config = await new ConfigLoader(rootDir).load()
  const target = await new TargetResolver(config, rootDir).resolve(opts.target)

  const task = new Task({
    title: opts.title,
    description: opts.description,
    acceptance: opts.acceptance,
    links: opts.links,
    notes: opts.notes,
  })

  if (opts.dry) {
    console.log(`[DRY RUN] Would append to ${target.rel} with id ${task.id}`)
    console.log('\n--- Generated Markdown ---')
    console.log(task.toMarkdown())
    console.log('--- End Markdown ---')
    return 0
  }

  await new FileAppender().append(target.abs, task.toMarkdown())

  console.log(`Added task to ${target.rel} with id ${task.id}`)
  return 0
}
