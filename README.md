# Mo's Personal Website

A personal website built with Vue 3, TypeScript, and Vite.

## Tech Stack

- **Framework:** Vue 3 with Composition API
- **Language:** TypeScript
- **Build Tool:** Vite
- **Deployment:** Vercel
- **Routing:** Vue Router
- **Styling:** Scoped CSS with CSS custom properties

## Project Setup

```sh
npm install
```

### Development

```sh
npm run dev
```

### Build for Production

```sh
npm run build
```

### Tests

```sh
npm test
```

## Project Cards and GitHub Sync

Project cards live in `src/data/projects.ts`. Each card can name a `repo`; its GitHub link, live
link (the repo's homepage), and "Updated" month come from `src/data/github-meta.json`.

`scripts/sync-github.mjs` refreshes that file from the GitHub API before every `npm run dev` and
`npm run build` (run it on its own with `npm run sync:github`). Only public, non-fork repos are
included, so a private repo never gets a GitHub link. If GitHub can't be reached, the script logs
`github-meta: WARNING using committed snapshot` and the build uses the committed file. On Vercel,
an optional `GITHUB_TOKEN` env var (a fine-grained token with public, read-only access) avoids
GitHub's unauthenticated rate limit.

### Weekly redeploy

`.github/workflows/weekly-redeploy.yml` triggers a Vercel deploy every Monday so the GitHub data
stays fresh between code changes. It needs a deploy hook for `main` (Vercel → Project Settings →
Git → Deploy Hooks) saved as the `VERCEL_DEPLOY_HOOK_URL` repo secret. GitHub turns off scheduled
workflows after 60 days with no repo activity; re-enable it from the Actions tab if that happens.

## Project Structure

```
src/
├── components/     # Reusable Vue components (About, Projects, Writing, etc.)
├── composables/    # Vue composables (useArticles for markdown content)
├── data/           # Project cards and synced GitHub metadata
├── router/         # Vue Router configuration
├── views/          # Page-level components
├── App.vue         # Root component with global CSS variables
└── main.ts         # Application entry point

scripts/            # GitHub metadata sync and its tests
writing-content/    # Markdown files for blog posts/articles
public/             # Static assets (images, etc.)
```

## Writing

Articles are written as markdown files in the `writing-content/` directory. Each file includes frontmatter with title, date, topics, and description.

## License

MIT
