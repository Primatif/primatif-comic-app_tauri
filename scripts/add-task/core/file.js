import { appendFile } from 'fs/promises'

export class FileAppender {
  async append(absPath, content) {
    const payload = `\n\n${content}\n`
    await appendFile(absPath, payload, 'utf8')
  }
}
