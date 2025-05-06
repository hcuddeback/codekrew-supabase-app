import fs from 'fs'
import path from 'path'

export function loadAstroStarter(): Array<{ path: string; content: string }> {
  const starterDir = path.resolve(process.cwd(), 'templates/astro-starter')
  const files = fs.readdirSync(starterDir)

  return files.map((file) => ({
    path: file,
    content: fs.readFileSync(path.join(starterDir, file), 'utf-8'),
  }))
}
