import { describe, it, expect } from 'bun:test'
import { ArgParser } from '../core/args.js'

describe('ArgParser', () => {
  it('parses basic options with defaults', () => {
    const argv = ['node', 'index.js', '--title', 'Hello']
    const opts = ArgParser.parse(argv)
    expect(opts.title).toBe('Hello')
    expect(opts.target).toBe('current')
    expect(opts.description).toBe('')
    expect(opts.acceptance).toEqual([])
    expect(opts.links).toEqual([])
    expect(opts.notes).toBe('')
    expect(opts.dry).toBe(false)
  })

  it('parses multiple acceptance criteria and links, including delimited forms', () => {
    const argv = [
      'node',
      'index.js',
      '--title',
      'T',
      '--ac',
      'A1',
      '--ac',
      'A2',
      '--acceptance',
      'B1; B2',
      '--link',
      'https://u1',
      '--links',
      'https://u2, https://u3',
      '--notes',
      'N',
      '--target',
      'backlog',
      '--dry',
    ]
    const opts = ArgParser.parse(argv)
    expect(opts.target).toBe('backlog')
    expect(opts.acceptance).toEqual(['A1', 'A2', 'B1', 'B2'])
    expect(opts.links).toEqual(['https://u1', 'https://u2', 'https://u3'])
    expect(opts.notes).toBe('N')
    expect(opts.dry).toBe(true)
  })
})
