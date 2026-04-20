<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useArticles } from '../composables/useArticles'

const router = useRouter()
const { loadArticle, loading, error } = useArticles()

const article = ref<{ meta: any; html: string } | null>(null)
const articleSlug = 'responsible-ai-conference-reflection'

const goBack = () => {
  router.push({ name: 'home', hash: '#writing' })
}

onMounted(async () => {
  const loaded = await loadArticle(articleSlug)
  if (loaded) {
    article.value = loaded
  }
})
</script>

<template>
  <article class="article" v-if="article">
    <header class="article-header">
      <button @click="goBack" class="back-link">← Back to Writing</button>
      <h1 class="article-title">{{ article.meta.title }}</h1>
      <p class="article-meta">
        {{ article.meta.date }} · {{ article.meta.topics?.join(' · ') || '' }}
      </p>
    </header>

    <div class="article-content">
      <div v-html="article.html" class="markdown-body"></div>
    </div>
  </article>

  <div v-else-if="loading" class="article">
    <p class="loading">Loading article...</p>
  </div>

  <div v-else-if="error" class="article">
    <p class="error">{{ error }}</p>
  </div>
</template>

<style scoped>
.article {
  max-width: 900px;
  margin: 0 auto;
  padding: var(--space-8) var(--space-4);
  min-height: 100vh;
}

.article-header {
  margin-bottom: var(--space-8);
}

.back-link {
  background: none;
  border: none;
  color: var(--color-text-muted);
  font-family: inherit;
  font-size: 0.85rem;
  cursor: pointer;
  padding: 0;
  margin-bottom: var(--space-4);
  transition: color var(--transition-fast);
}

.back-link:hover {
  color: var(--color-primary);
}

.article-title {
  font-size: 1.8rem;
  font-weight: 500;
  line-height: 1.3;
  margin: 0 0 var(--space-3);
  letter-spacing: -0.02em;
  color: var(--color-text);
}

.article-meta {
  color: var(--color-text-muted);
  font-size: 0.8rem;
  margin: 0;
  letter-spacing: 0.01em;
}

.article-content {
  background: var(--color-card-bg);
  border-radius: var(--radius-md);
  padding: var(--space-8) var(--space-6);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-border);
}

.loading,
.error {
  text-align: center;
  padding: var(--space-8);
  color: var(--color-text-muted);
}

.error {
  color: var(--color-error);
}

/* Markdown content styling */
.markdown-body :deep(p) {
  color: var(--color-text-secondary);
  line-height: 1.75;
  margin: 0 0 var(--space-6);
  font-size: 1rem;
}

.markdown-body :deep(p:last-of-type) {
  margin-bottom: 0;
}

.markdown-body :deep(em) {
  font-style: italic;
  color: var(--color-primary);
}

.markdown-body :deep(.article-figure) {
  margin: var(--space-6) 0;
  max-width: 100%;
}

.markdown-body :deep(.article-figure img) {
  width: 100%;
  height: auto;
  display: block;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
}

.markdown-body :deep(figcaption) {
  margin-top: var(--space-3);
  font-size: 0.73rem;
  color: #888;
  line-height: 1.4;
  text-align: center;
}

@media (max-width: 640px) {
  .article {
    padding: var(--space-5) var(--space-3);
  }

  .back-link {
    padding: 0.75rem 0;
    min-height: 44px;
    display: inline-flex;
    align-items: center;
  }

  .article-title {
    font-size: 1.4rem;
  }

  .article-content {
    padding: var(--space-5) var(--space-4);
  }

  .markdown-body :deep(p) {
    font-size: 0.98rem;
  }

  .markdown-body :deep(.article-figure) {
    margin: var(--space-4) 0;
  }
}
</style>
