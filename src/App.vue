<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import About from './components/About.vue'
import Projects from './components/Projects.vue'
import Interests from './components/Interests.vue'
import Contact from './components/Contact.vue'

const tabs = ['About Me', 'Projects', 'Interests', 'Contact'] as const
type Tab = (typeof tabs)[number]

const current = ref<Tab>('About Me')

const aboutSection = ref<HTMLElement | null>(null)
const projectsSection = ref<HTMLElement | null>(null)
const interestsSection = ref<HTMLElement | null>(null)
const contactSection = ref<HTMLElement | null>(null)

const sectionByTab: Record<Tab, typeof aboutSection> = {
  'About Me': aboutSection,
  Projects: projectsSection,
  Interests: interestsSection,
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

<style>
/* Design System - CSS Custom Properties */
:root {
  /* Colors */
  --color-primary: #124731;
  --color-primary-light: rgba(18, 71, 49, 0.07);
  --color-primary-hover: rgba(18, 71, 49, 0.13);
  --color-primary-border: rgba(18, 71, 49, 0.4);
  --color-text: #1c1917;
  --color-text-muted: #78716c;
  --color-text-secondary: #44403c;
  --color-bg: #f3ede3;
  --color-card-bg: rgba(255, 251, 244, 0.93);
  --color-input-bg: #faf6ee;
  --color-border: #d6cfc5;
  --color-success: #13662f;
  --color-error: #a02626;

  /* Spacing (4px base unit) */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;

  /* Radius */
  --radius-sm: 0.4rem;
  --radius-md: 0.9rem;
  --radius-pill: 999px;

  /* Shadows */
  --shadow-sm: 0 4px 16px rgba(28, 20, 10, 0.07);
  --shadow-md: 0 10px 28px rgba(28, 20, 10, 0.11);
  --shadow-focus: 0 0 0 1px rgba(18, 71, 49, 0.25);

  /* Transitions */
  --transition-fast: 0.15s ease;
  --transition-base: 0.2s ease;
  --transition-smooth: 0.3s ease-out;
}
</style>

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
  background-color: var(--color-bg);
  background-image:
    linear-gradient(rgba(243, 237, 227, 0.75), rgba(243, 237, 227, 0.75)),
    url('/monstera_print.png');
  background-repeat: repeat;
  background-size: 320px 320px;
  color: var(--color-text);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2.5rem 1rem;
  font-family: 'Lora', 'Computer Modern Serif', Georgia, serif;
}

.site-header {
  width: 100%;
  max-width: 900px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  margin-bottom: 2.5rem;
}

.site-header-inner {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  padding: 0.75rem 1rem;
  border-radius: var(--radius-md);
  background: var(--color-card-bg);
  box-shadow: var(--shadow-sm);
  backdrop-filter: blur(10px);
  transition: box-shadow var(--transition-base);
}

.site-header-inner:hover {
  box-shadow: var(--shadow-md);
}

.name {
  margin: 0;
  font-size: 1.45rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  font-style: italic;
}

.tabs {
  display: flex;
  gap: var(--space-2);
}

.tab {
  background: transparent;
  border-radius: var(--radius-pill);
  border: 1px solid transparent;
  padding: 0.4rem 0.9rem;
  cursor: pointer;
  color: var(--color-text-muted);
  font-size: 0.875rem;
  font-family: inherit;
  transition:
    color var(--transition-fast),
    background var(--transition-fast),
    border-color var(--transition-fast);
}

.tab:hover {
  color: var(--color-text);
}

.tab.active {
  color: var(--color-primary);
  background: var(--color-primary-light);
  border-color: var(--color-primary-border);
  font-weight: 600;
}

.tab:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.content {
  width: 100%;
  max-width: 900px;
  padding: 0.5rem 0;
}

.content-section {
  background: var(--color-card-bg);
  border-radius: var(--radius-md);
  padding: 2rem 2.25rem 1.85rem;
  box-shadow: var(--shadow-sm);
  border: 1px solid rgba(214, 207, 197, 0.6);
  transition: box-shadow var(--transition-base);
}

.content-section:hover {
  box-shadow: var(--shadow-md);
}

.content-section + .content-section {
  margin-top: var(--space-6);
}

.content-section.reveal {
  opacity: 0;
  transform: translateY(8px);
  transition:
    opacity 0.55s ease-out,
    transform 0.55s ease-out;
}

.content-section.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.site-footer {
  margin-top: var(--space-4);
  color: var(--color-text-muted);
  font-size: 0.8rem;
}

@media (max-width: 640px) {
  .site-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .tabs {
    width: 100%;
    flex-wrap: wrap;
  }
}
</style>
