import { UUID } from './uuid.js'

export class Task {
  constructor({ title, description = '', acceptance = [], links = [], notes = '' }) {
    this.id = UUID.v4()
    this.title = String(title)
    this.description = String(description)
    this.acceptance = acceptance.map((s) => String(s))
    this.links = links.map((s) => String(s))
    this.notes = String(notes)
  }

  toMarkdown() {
    const lines = []
    lines.push(`### ${this.title} - \`${this.id}\``)
    lines.push('')
    lines.push(`- **Description**: ${this.description || ''}`)
    lines.push(`- **Acceptance Criteria**:`)
    if (this.acceptance.length) {
      for (const ac of this.acceptance) lines.push(`  - ${ac}`)
    } else {
      lines.push('  - ')
    }
    if (this.links.length) lines.push(`- **Links**: ${this.links.join(', ')}`)
    else lines.push(`- **Links**:`)
    lines.push(`- **Notes**: ${this.notes || ''}`)
    return lines.join('\n')
  }
}
