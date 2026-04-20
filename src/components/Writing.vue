<template>
  <section class="writing">
    <h2 class="section-title">Writing</h2>
    <div class="writing-list">
      <article v-for="piece in writing" :key="piece.title" class="writing-piece">
        <div class="piece-header">
          <h3>
            <RouterLink
              v-if="piece.routeName"
              :to="{ name: piece.routeName }"
              class="piece-title"
            >
              {{ piece.title }}
            </RouterLink>
            <a
              v-else-if="piece.url"
              :href="piece.url"
              target="_blank"
              rel="noopener noreferrer"
              class="piece-title"
            >
              {{ piece.title }}
            </a>
            <span v-else>{{ piece.title }}</span>
          </h3>
          <span class="piece-date">{{ piece.date }}</span>
        </div>
        <p class="piece-description">{{ piece.description }}</p>
        <p v-if="piece.topics" class="piece-topics">
          <span v-for="topic in piece.topics" :key="topic" class="topic-tag">{{ topic }}</span>
        </p>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

interface WritingPiece {
  title: string
  description: string
  date: string
  routeName?: string
  url?: string
  topics?: string[]
}

const writing: WritingPiece[] = [
  {
    title: "Reflections from Yale SOM's Responsible AI Conference",
    description:
      'After serving on the leadership team for Yale SOM\'s Responsible AI Conference, I reflect on the balance between safety and enabling extraordinary things.',
    date: 'April 19, 2026',
    routeName: 'article-responsible-ai-conference',
    topics: ['AI Safety', 'Red-teaming', 'Consumer Protection'],
  },
]
</script>

<style scoped>
.section-title {
  margin: 0 0 1rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-text);
}

.writing {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.writing-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.writing-piece {
  padding: 1rem;
  background:
    linear-gradient(135deg, var(--color-primary-light), rgba(18, 71, 49, 0.03)),
    var(--color-card-bg);
  border-radius: var(--radius-md);
  border: 1px solid rgba(18, 71, 49, 0.16);
  transition:
    transform var(--transition-base),
    box-shadow var(--transition-base);
}

.writing-piece:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  border-color: var(--color-primary-border);
}

.piece-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: var(--space-2);
  margin-bottom: 0.6rem;
}

.writing-piece h3 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
}

.piece-title {
  color: inherit;
  text-decoration: none;
  transition: color var(--transition-base);
}

.piece-title:hover {
  color: var(--color-primary);
  text-decoration: underline;
}

.piece-date {
  font-size: 0.8rem;
  color: var(--color-text-muted);
  flex-shrink: 0;
  line-height: 1.5;
}

.piece-description {
  margin: 0 0 0.7rem;
  color: var(--color-text-secondary);
  font-size: 1rem;
  line-height: 1.6;
}

.piece-topics {
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.topic-tag {
  font-size: 0.75rem;
  padding: 0.25rem 0.6rem;
  border-radius: var(--radius-pill);
  background: var(--color-primary-light);
  color: var(--color-primary);
  font-weight: 500;
}

@media (max-width: 640px) {
  .writing-piece {
    padding: var(--space-3);
  }

  .piece-header {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-1);
  }

  .piece-date {
    font-size: 0.75rem;
  }

  .writing-piece h3 {
    font-size: 1rem;
  }

  .piece-description {
    font-size: 0.95rem;
  }
}
</style>
