// Fetches public repo metadata from GitHub so project cards can show live links,
// GitHub icons, and an "Updated" month. Runs before `dev` and `build`.
// Fails soft: on any error it keeps the committed snapshot and exits 0.
import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

const OWNER = 'monliu99'
const API_URL = process.env.GITHUB_API_URL ?? 'https://api.github.com'
const OUT_FILE = fileURLToPath(new URL('../src/data/github-meta.json', import.meta.url))
const TIMEOUT_MS = 5000

export function toMeta(repos) {
  const entries = repos
    .filter((repo) => !repo.private && !repo.fork)
    .map((repo) => [
      repo.name,
      { homepage: repo.homepage || null, pushed: repo.pushed_at?.slice(0, 7) ?? null },
    ])
    .sort(([a], [b]) => a.localeCompare(b))
  return Object.fromEntries(entries)
}

async function fetchRepos(fetchImpl, token) {
  const headers = { Accept: 'application/vnd.github+json', 'User-Agent': 'mos-personal-website' }
  if (token) headers.Authorization = `Bearer ${token}`
  const response = await fetchImpl(`${API_URL}/users/${OWNER}/repos?per_page=100&type=owner`, {
    headers,
    signal: AbortSignal.timeout(TIMEOUT_MS),
  })
  if (!response.ok) throw new Error(`HTTP ${response.status}`)
  return response.json()
}

export async function sync({
  fetchImpl = fetch,
  token = process.env.GITHUB_TOKEN,
  outFile = OUT_FILE,
  log = console.log,
} = {}) {
  let meta
  try {
    meta = toMeta(await fetchRepos(fetchImpl, token))
    // An empty list would hide every GitHub link, so treat it as a failed fetch.
    if (Object.keys(meta).length === 0) throw new Error('no public repos returned')
  } catch (error) {
    log(`github-meta: WARNING using committed snapshot (${error.message})`)
    return false
  }

  const next = `${JSON.stringify(meta, null, 2)}\n`
  const current = await readFile(outFile, 'utf8').catch(() => '')
  if (next !== current) await writeFile(outFile, next)
  log(
    `github-meta: fetched ${Object.keys(meta).length} repos${next === current ? ' (unchanged)' : ''}`
  )
  return true
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  await sync()
}
