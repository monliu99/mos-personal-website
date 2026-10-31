import assert from 'node:assert/strict'
import { mkdtemp, readFile, stat, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { test } from 'node:test'

import { sync, toMeta } from './sync-github.mjs'

const repos = [
  {
    name: 'parity-app',
    private: false,
    fork: false,
    homepage: 'https://withparity.vercel.app',
    pushed_at: '2026-10-25T18:02:11Z',
  },
  { name: 'loom', private: false, fork: false, homepage: '', pushed_at: '2026-05-11T09:00:00Z' },
  {
    name: 'greencard-chatbot',
    private: true,
    fork: false,
    homepage: 'https://greencard-chatbot.vercel.app',
    pushed_at: '2026-05-15T00:00:00Z',
  },
  {
    name: 'madlibs-fix-MLDT',
    private: false,
    fork: true,
    homepage: null,
    pushed_at: '2026-09-23T00:00:00Z',
  },
]

const okFetch = (body) => async () => ({ ok: true, status: 200, json: async () => body })
const tempFile = async (contents) => {
  const file = join(await mkdtemp(join(tmpdir(), 'github-meta-')), 'github-meta.json')
  if (contents !== undefined) await writeFile(file, contents)
  return file
}
const quiet = () => {}

test('toMeta keeps public non-fork repos with month and normalized homepage', () => {
  assert.deepEqual(toMeta(repos), {
    loom: { homepage: null, pushed: '2026-05' },
    'parity-app': { homepage: 'https://withparity.vercel.app', pushed: '2026-10' },
  })
})

test('toMeta sorts keys so output is stable', () => {
  assert.deepEqual(Object.keys(toMeta([...repos].reverse())), ['loom', 'parity-app'])
})

test('sync writes the snapshot and sends the token when set', async () => {
  const outFile = await tempFile()
  let headers
  const fetchImpl = async (_url, options) => {
    headers = options.headers
    return okFetch(repos)()
  }
  assert.equal(await sync({ fetchImpl, token: 'abc', outFile, log: quiet }), true)
  assert.equal(headers.Authorization, 'Bearer abc')
  assert.deepEqual(JSON.parse(await readFile(outFile, 'utf8')), toMeta(repos))
})

test('sync leaves the file untouched when content is unchanged', async () => {
  const outFile = await tempFile(`${JSON.stringify(toMeta(repos), null, 2)}\n`)
  const before = (await stat(outFile)).mtimeMs
  const logs = []
  await sync({ fetchImpl: okFetch(repos), token: '', outFile, log: (line) => logs.push(line) })
  assert.equal((await stat(outFile)).mtimeMs, before)
  assert.match(logs[0], /fetched 2 repos \(unchanged\)/)
})

for (const [name, fetchImpl] of [
  [
    'a network error',
    async () => {
      throw new Error('getaddrinfo ENOTFOUND')
    },
  ],
  ['a 403 rate limit', async () => ({ ok: false, status: 403 })],
  ['an empty repo list', okFetch([])],
]) {
  test(`sync keeps the snapshot on ${name}`, async () => {
    const outFile = await tempFile('{"loom":{"homepage":null,"pushed":"2026-05"}}\n')
    const logs = []
    assert.equal(
      await sync({ fetchImpl, token: '', outFile, log: (line) => logs.push(line) }),
      false
    )
    assert.equal(await readFile(outFile, 'utf8'), '{"loom":{"homepage":null,"pushed":"2026-05"}}\n')
    assert.match(logs[0], /^github-meta: WARNING using committed snapshot/)
  })
}
