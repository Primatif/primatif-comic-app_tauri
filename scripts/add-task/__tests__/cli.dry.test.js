import { describe, it, expect } from 'bun:test'

// Run the CLI via node with --dry and ensure no write occurs and output is as expected

describe('add-task CLI --dry', () => {
  it('generates markdown and exits 0 without writing', async () => {
    const proc = Bun.spawn({
      cmd: [
        'node',
        'scripts/add-task/index.js',
        '--title',
        'Test Task',
        '--target',
        'current',
        '--description',
        'Desc',
        '--ac',
        'A1',
        '--ac',
        'A2',
        '--link',
        'https://example.com',
        '--notes',
        'Note',
        '--dry',
      ],
      cwd: process.cwd(),
      stdout: 'pipe',
      stderr: 'pipe',
    })

    const out = await new Response(proc.stdout).text()
    const err = await new Response(proc.stderr).text()
    const code = await proc.exited

    expect(code).toBe(0)
    expect(err).toBe('')
    expect(out).toContain('[DRY RUN] Would append to docs/sprints/current.md')
    expect(out).toContain('--- Generated Markdown ---')
    expect(out).toContain('### Test Task - `')
    expect(out).toContain('- **Description**: Desc')
    expect(out).toContain('  - A1')
    expect(out).toContain('  - A2')
    expect(out).toContain('- **Links**: https://example.com')
    expect(out).toContain('- **Notes**: Note')
  })
})
