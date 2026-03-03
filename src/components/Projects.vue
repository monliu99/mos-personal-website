<template>
  <section class="projects">
    <header class="projects-header">
      <h2>Projects</h2>
      <p class="projects-intro">
        Here are some recent projects I have been working on; check them out by clicking the hyperlink in the project title, or take a look at the Github repository by clicking the icon on the top-right corner: 
      </p>
    </header>

    <div class="projects-grid">
      <article
        v-for="project in projects"
        :key="project.slug"
        class="project-card"
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
          </h3>
          <a
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
        <p class="project-description">
          {{ project.description }}
        </p>
        <p v-if="project.tech" class="project-meta">
          {{ project.tech }}
        </p>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
type Project = {
  slug: string
  name: string
  description: string
  githubUrl: string
  liveUrl?: string
  tech?: string
}

const projects: Project[] = [
  {
    slug: 'daily-brew-2-0',
    name: 'Daily Brew 2.0',
    description:
      'A mood-responsive drink recommendation app that uses machine learning to suggest personalized coffee and tea recipes based on how you\'re feeling, your location\'s weather, and time of day.',
    githubUrl: 'https://github.com/monliu99/daily-brew-2.0',
    liveUrl: 'https://monliu99.github.io/daily-brew-2.0/',
    tech: 'JavaScript · TensorFlow.js · HTML · CSS',
  },
  {
    slug: 'project-2',
    name: 'Project 2',
    description:
      'Coming soon — stay tuned for details on this project.',
    githubUrl: 'https://github.com/monliu99/project-2',
    tech: 'TBD',
  },
  {
    slug: 'project-3',
    name: 'Project 3',
    description:
      'Coming soon — stay tuned for details on this project.',
    githubUrl: 'https://github.com/monliu99/project-3',
    tech: 'TBD',
  },
]
</script>

<style scoped>
.projects {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.projects-header {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.projects-intro {
  margin: 0;
  color: #555;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}

.project-card {
  background: linear-gradient(
      135deg,
      rgba(18, 71, 49, 0.08),
      rgba(18, 71, 49, 0.03)
    ),
    rgba(255, 255, 255, 0.92);
  border-radius: 0.9rem;
  padding: 1rem 1.1rem 0.9rem;
  border: 1px solid rgba(18, 71, 49, 0.16);
}

.project-heading {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 0.5rem;
  margin-bottom: 0.35rem;
}

.project-heading h3 {
  margin: 0;
  font-size: 1rem;
}

.project-title-link {
  color: inherit;
  text-decoration: none;
  transition: color 0.2s ease;
}

.project-title-link:hover {
  color: #124731;
  text-decoration: underline;
}

.project-link {
  font-size: 0.8rem;
  color: #124731;
  text-decoration: none;
}

.project-link:hover {
  text-decoration: underline;
}

.project-icon {
  width: 18px;
  height: 18px;
}

.project-description {
  margin: 0.1rem 0 0.25rem;
  color: #444;
}

.project-meta {
  margin: 0;
  font-size: 0.8rem;
  color: #5b7265;
}

@media (max-width: 640px) {
  .project-heading {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
