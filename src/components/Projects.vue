<template>
  <section class="projects">
    <h2 class="section-title">Projects</h2>
    <div v-for="group in groups" :key="group.key" class="projects-category">
      <h3 class="category-title">{{ group.title }}</h3>
      <div class="projects-grid">
        <article
          v-for="(project, index) in group.projects"
          :key="project.slug"
          class="project-card"
          :style="{ animationDelay: `${(group.offset + index) * 100}ms` }"
        >
          <div class="project-heading">
            <h3>
              <a
                v-if="project.liveUrl"
                :href="project.liveUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="project-title-link"
              >
                {{ project.name }}
              </a>
              <span v-else>{{ project.name }}</span>
              <span v-if="project.badge" class="status-badge">{{ project.badge }}</span>
            </h3>
            <a
              v-if="project.githubUrl"
              class="project-link"
              :href="project.githubUrl"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View project on GitHub"
            >
              <svg viewBox="0 0 24 24" class="project-icon" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M12 2C6.5 2 2 6.6 2 12.2c0 4.5 2.9 8.3 6.9 9.6.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.2-3.4-1.2-.4-1.1-.9-1.4-.9-1.4-.8-.6.1-.6.1-.6.9.1 1.4 1 1.4 1 .8 1.4 2.2 1 2.8.8.1-.6.3-1 .6-1.3-2.2-.3-4.4-1.1-4.4-4.9 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.6 0 0 .8-.3 2.8 1 .8-.2 1.6-.3 2.4-.3.8 0 1.6.1 2.4.3 2-1.3 2.8-1 2.8-1 .5 1.3.2 2.3.1 2.6.6.7 1 1.6 1 2.7 0 3.8-2.3 4.6-4.4 4.9.3.3.6.9.6 1.8v2.6c0 .3.2.6.7.5 4-1.3 6.9-5.1 6.9-9.6C22 6.6 17.5 2 12 2Z"
                />
              </svg>
            </a>
          </div>
          <a
            v-if="project.liveUrl"
            :href="project.liveUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="demo-link"
          >
            {{ project.liveLabel ?? 'View Demo' }} →
          </a>
          <span v-else-if="project.demoComingSoon" class="demo-coming-soon">(Demo to come)</span>
          <p class="project-description">
            {{ project.description }}
          </p>
          <p v-if="project.tech" class="project-meta">
            <span class="tech-label">Tech Stack:</span> {{ project.tech }}
          </p>
          <p v-if="project.updated" class="project-updated">Updated {{ project.updated }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { categories, projects, type Project } from '@/data/projects'
import { githubMeta } from '@/data/githubMeta'

const formatMonth = (yearMonth: string) =>
  new Date(`${yearMonth}-01T00:00:00Z`).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  })

// GitHub links and dates only appear for repos the sync found public.
const toCard = (project: Project) => {
  const meta = project.repo ? githubMeta[project.repo] : undefined
  return {
    ...project,
    liveUrl: project.liveUrl || meta?.homepage || undefined,
    githubUrl: meta ? `https://github.com/monliu99/${project.repo}` : undefined,
    updated: meta?.pushed ? formatMonth(meta.pushed) : undefined,
  }
}

let offset = 0
const groups = categories.map((category) => {
  const items = projects.filter((p) => p.category === category.key).map(toCard)
  const group = { ...category, projects: items, offset }
  offset += items.length
  return group
})
</script>

<style scoped>
.section-title {
  margin: 0 0 1rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-text);
}

.projects {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.projects-category {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.category-title {
  margin: 0;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--color-text-secondary);
}

.projects-grid {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.project-card {
  display: flex;
  flex-direction: column;
  background:
    linear-gradient(135deg, var(--color-primary-light), rgba(18, 71, 49, 0.03)),
    var(--color-card-bg);
  border-radius: var(--radius-md);
  padding: 1rem;
  border: 1px solid rgba(18, 71, 49, 0.16);
  transition:
    transform var(--transition-base),
    box-shadow var(--transition-base);
  animation: cardEntrance 0.5s ease-out backwards;
}

.project-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  border-color: var(--color-primary-border);
}

@keyframes cardEntrance {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.project-heading {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: var(--space-2);
  margin-bottom: 0.35rem;
}

.project-heading h3 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
}

.project-title-link {
  color: inherit;
  text-decoration: none;
  transition: color var(--transition-base);
}

.project-title-link:hover {
  color: var(--color-primary);
  text-decoration: underline;
}

.project-link {
  font-size: 0.8rem;
  color: var(--color-primary);
  text-decoration: none;
  transition:
    color var(--transition-fast),
    transform var(--transition-fast);
  display: inline-flex;
  align-items: center;
}

.project-link:hover {
  text-decoration: none;
  transform: scale(1.1);
}

.project-icon {
  width: 20px;
  height: 20px;
  transition: transform var(--transition-fast);
}

.project-link:hover .project-icon {
  transform: scale(1.1);
}

.demo-link {
  display: inline-block;
  margin-top: 0.1rem;
  margin-bottom: 0.4rem;
  font-size: 0.8rem;
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 500;
  transition:
    color var(--transition-fast),
    transform var(--transition-fast);
}

.demo-link:hover {
  color: var(--color-primary-hover);
  text-decoration: underline;
  transform: translateX(2px);
}

.demo-coming-soon {
  display: inline-block;
  margin-top: 0.1rem;
  margin-bottom: 0.4rem;
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--color-primary);
  font-style: italic;
}

.project-description {
  margin: 0.1rem 0 0.4rem;
  color: var(--color-text-secondary);
  font-size: 1rem;
  line-height: 1.6;
}

.project-meta {
  margin: 0;
  margin-top: auto;
  font-size: 0.8rem;
  color: #5b7265;
}

.project-updated {
  margin: 0.25rem 0 0;
  font-size: 0.75rem;
  color: var(--color-text-muted);
}

.tech-label {
  font-weight: 600;
}

.status-badge {
  display: inline-block;
  margin-left: 0.4rem;
  padding: 0.1rem 0.4rem;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--color-primary);
  border: 1px solid var(--color-primary-border);
  border-radius: var(--radius-sm);
  vertical-align: middle;
}

@media (max-width: 640px) {
  .project-card {
    padding: var(--space-3);
  }

  .project-heading {
    gap: var(--space-2);
  }

  .project-heading h3 {
    font-size: 1rem;
  }

  .project-link {
    padding: 0.5rem;
    margin: -0.5rem;
    min-height: 44px;
    min-width: 44px;
    justify-content: center;
  }

  .demo-link {
    padding: 0.5rem 0;
    min-height: 44px;
    display: inline-flex;
    align-items: center;
    font-size: 0.78rem;
  }

  .demo-coming-soon {
    padding: 0.5rem 0;
    min-height: 44px;
    display: inline-flex;
    align-items: center;
    font-size: 0.78rem;
  }

  .category-title {
    font-size: 0.78rem;
    margin-top: var(--space-2);
  }

  .project-description {
    font-size: 0.95rem;
  }

  .project-meta {
    font-size: 0.75rem;
  }
}
</style>
