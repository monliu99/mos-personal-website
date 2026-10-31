import data from './github-meta.json'

// Written by scripts/sync-github.mjs. Only public, non-fork repos appear here.
export type RepoMeta = { homepage: string | null; pushed: string | null }

export const githubMeta: Record<string, RepoMeta> = data
