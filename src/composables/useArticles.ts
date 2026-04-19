import { ref, shallowRef } from 'vue'
import MarkdownIt from 'markdown-it'

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
})

// Custom renderer to handle image captions (images followed by italic text)
const defaultRender = md.renderer.rules.image || function(tokens, idx, options, env, self) {
  return self.renderToken(tokens, idx, options)
}

md.renderer.rules.image = function (tokens, idx, options, env, self) {
  const token = tokens[idx]
  const src = token.attrGet('src')
  const alt = token.content
  const nextIdx = idx + 1

  // Check if next token is a paragraph opening with italic text (caption)
  if (nextIdx < tokens.length && tokens[nextIdx].type === 'paragraph_open') {
    const nextNextIdx = nextIdx + 1
    if (
      nextNextIdx < tokens.length &&
      tokens[nextNextIdx].type === 'inline' &&
      tokens[nextNextIdx].children &&
      tokens[nextNextIdx].children?.length === 1 &&
      tokens[nextNextIdx].children[0].type === 'em_open'
    ) {
      // Extract caption text
      const captionToken = tokens[nextNextIdx].children[2] // Text inside em
      const caption = captionToken ? captionToken.content : ''

      // Skip the caption paragraph tokens so they don't render separately
      tokens[nextIdx].hidden = true
      tokens[nextNextIdx].hidden = true
      if (nextNextIdx + 1 < tokens.length) {
        tokens[nextNextIdx + 1].hidden = true // paragraph_close
      }

      return `<figure class="article-figure">
        <img src="${src}" alt="${alt}" class="article-image" />
        <figcaption class="article-caption">${caption}</figcaption>
      </figure>`
    }
  }

  return defaultRender(tokens, idx, options, env, self)
}

interface ArticleMeta {
  title: string
  date: string
  topics: string[]
  description: string
  slug: string
}

interface Article {
  meta: ArticleMeta
  content: string
  html: string
}

const articleCache = new Map<string, Article>()

export function useArticles() {
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadArticle(slug: string): Promise<Article | null> {
    // Check cache first
    if (articleCache.has(slug)) {
      return articleCache.get(slug)!
    }

    loading.value = true
    error.value = null

    try {
      // Import markdown file with ?raw to get raw content
      const module = await import(`/writing-content/${slug}.md?raw`)
      const markdown = module.default as string

      // Parse frontmatter and content
      const { meta, content } = parseFrontmatter(markdown)
      const html = md.render(content)

      const article: Article = {
        meta: {
          ...meta,
          slug,
        },
        content,
        html,
      }

      articleCache.set(slug, article)
      return article
    } catch (e) {
      error.value = `Failed to load article: ${slug}`
      console.error(e)
      return null
    } finally {
      loading.value = false
    }
  }

  return {
    loadArticle,
    loading,
    error,
  }
}

function parseFrontmatter(markdown: string): { meta: Partial<ArticleMeta>; content: string } {
  // Check for YAML frontmatter between ---
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/
  const match = markdown.match(frontmatterRegex)

  if (match) {
    const frontmatterText = match[1]
    const content = match[2]

    const meta: Partial<ArticleMeta> = {}

    // Parse simple YAML-like key: value pairs
    const lines = frontmatterText.split('\n')
    for (const line of lines) {
      const colonIndex = line.indexOf(':')
      if (colonIndex > 0) {
        const key = line.slice(0, colonIndex).trim()
        let value = line.slice(colonIndex + 1).trim()

        // Handle array values
        if (value.startsWith('[') && value.endsWith(']')) {
          value = value
            .slice(1, -1)
            .split(',')
            .map((v) => v.trim().replace(/^['"]|['"]$/g, ''))
        }

        // Remove quotes from string values
        if (typeof value === 'string' && value.match(/^['"].*['"]$/)) {
          value = value.slice(1, -1)
        }

        ;(meta as any)[key] = value
      }
    }

    return { meta, content }
  }

  // No frontmatter, extract title from first heading
  const titleMatch = markdown.match(/^#\s+(.+)$/m)
  const title = titleMatch ? titleMatch[1] : ''
  const content = markdown.replace(/^#\s+.+$/m, '').trim()

  return {
    meta: { title: title || undefined },
    content,
  }
}
