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

## Project Structure

```
src/
├── components/     # Reusable Vue components (About, Projects, Writing, etc.)
├── composables/    # Vue composables (useArticles for markdown content)
├── router/         # Vue Router configuration
├── views/          # Page-level components
├── App.vue         # Root component with global CSS variables
└── main.ts         # Application entry point

writing-content/    # Markdown files for blog posts/articles
public/             # Static assets (images, etc.)
```

## Writing

Articles are written as markdown files in the `writing-content/` directory. Each file includes frontmatter with title, date, topics, and description.

## License

MIT
