<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import About from './components/About.vue'
import Projects from './components/Projects.vue'
import Interests from './components/Interests.vue'
import Writing from './components/Writing.vue'
import Contact from './components/Contact.vue'

const tabs = ['About Me', 'Projects', 'Writing', 'Interests', 'Contact'] as const
type Tab = (typeof tabs)[number]

const current = ref<Tab>('About Me')

const aboutSection = ref<HTMLElement | null>(null)
const projectsSection = ref<HTMLElement | null>(null)
const interestsSection = ref<HTMLElement | null>(null)
const writingSection = ref<HTMLElement | null>(null)
const contactSection = ref<HTMLElement | null>(null)

const sectionByTab: Record<Tab, typeof aboutSection> = {
  'About Me': aboutSection,
  Projects: projectsSection,
  Interests: interestsSection,
  Writing: writingSection,
  Contact: contactSection,
}

const handleTabClick = (tab: Tab) => {
  current.value = tab
  const el = sectionByTab[tab].value
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

let observer: IntersectionObserver | null = null

onMounted(() => {
  const entries = Object.entries(sectionByTab) as [Tab, typeof aboutSection][]
  observer = new IntersectionObserver(
    (observed) => {
      for (const entry of observed) {
        if (entry.isIntersecting) {
          const matched = entries.find(([, r]) => r.value === entry.target)
          if (matched) current.value = matched[0]
        }
      }
    },
    { threshold: 0.3 },
  )
  for (const [, sectionRef] of entries) {
    if (sectionRef.value) observer.observe(sectionRef.value)
  }
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<template>
  <div class="app">
    <header class="site-header">
      <div class="site-header-inner">
        <h1 class="name">Mo Liu</h1>
        <nav class="tabs" role="navigation" aria-label="Main">
          <button
            v-for="tab in tabs"
            :key="tab"
            :class="['tab', { active: tab === current }]"
            type="button"
            @click="handleTabClick(tab)"
          >
            {{ tab }}
          </button>
        </nav>
      </div>
    </header>

    <main class="content">
      <section ref="aboutSection" class="content-section" aria-label="About Me" v-reveal-on-scroll>
        <About />
      </section>

      <section
        ref="projectsSection"
        class="content-section"
        aria-label="Projects"
        v-reveal-on-scroll
      >
        <Projects />
      </section>

      <section
        ref="writingSection"
        class="content-section"
        aria-label="Writing"
        v-reveal-on-scroll
      >
        <Writing />
      </section>

      <section
        ref="interestsSection"
        class="content-section"
        aria-label="Interests"
        v-reveal-on-scroll
      >
        <Interests />
      </section>

      <section ref="contactSection" class="content-section" aria-label="Contact" v-reveal-on-scroll>
        <Contact />
      </section>
    </main>

    <footer class="site-footer">
      <small>© {{ new Date().getFullYear() }} Mo Liu · Built with Vue 3 + Vite · Deployed on Vercel</small>
    </footer>
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  color: var(--color-text);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--space-8) var(--space-4);
}

.site-header {
  width: 100%;
  max-width: 900px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-6);
  margin-bottom: var(--space-8);
}

.site-header-inner {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  padding: 0;
}

.name {
  margin: 0;
  font-size: 1.75rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--color-text);
}

.tabs {
  display: flex;
  gap: var(--space-1);
}

.tab {
  background: transparent;
  border-radius: 0;
  border: none;
  border-bottom: 2px solid transparent;
  padding: 0.4rem 0.8rem;
  cursor: pointer;
  color: var(--color-text-muted);
  font-size: 0.85rem;
  font-family: inherit;
  font-weight: 400;
  transition:
    color var(--transition-fast),
    border-color var(--transition-fast);
}

.tab:hover {
  color: var(--color-text);
}

.tab.active {
  color: var(--color-primary);
  border-bottom-color: var(--color-primary);
  font-weight: 500;
}

.tab:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}

.content {
  width: 100%;
  max-width: 900px;
  padding: 0;
}

.content-section {
  background: var(--color-card-bg);
  border-radius: var(--radius-md);
  padding: var(--space-8) var(--space-6);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-border);
  transition:
    box-shadow var(--transition-base),
    border-color var(--transition-base);
  margin-bottom: var(--space-6);
}

.content-section:hover {
  box-shadow: var(--shadow-md);
  border-color: var(--color-primary-border);
}

.content-section.reveal {
  opacity: 0;
  transform: translateY(12px);
  transition:
    opacity 0.6s ease-out,
    transform 0.6s ease-out;
}

.content-section.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.site-footer {
  margin-top: var(--space-4);
  color: var(--color-text-muted);
  font-size: 0.75rem;
  letter-spacing: 0.01em;
}

@media (max-width: 768px) {
  .site-header {
    max-width: 100%;
  }

  .content {
    max-width: 100%;
  }
}

@media (max-width: 640px) {
  .app {
    padding: var(--space-6) var(--space-4);
  }

  .site-header {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-4);
    margin-bottom: var(--space-6);
  }

  .tabs {
    width: 100%;
    flex-wrap: wrap;
  }

  .tab {
    padding: 0.75rem 1rem;
    font-size: 0.9rem;
  }

  .content-section {
    padding: var(--space-6) var(--space-5);
  }
}
</style>
