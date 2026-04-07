<script setup lang="ts">
import { ref } from 'vue'
import About from './components/About.vue'
import Projects from './components/Projects.vue'
import Interests from './components/Interests.vue'
import Contact from './components/Contact.vue'
import AboutSite from './components/AboutSite.vue'

const tabs = ['About Me', 'Interests', 'Projects', 'Contact', 'About This Site'] as const
type Tab = (typeof tabs)[number]

const current = ref<Tab>('About Me')

const aboutSection = ref<HTMLElement | null>(null)
const projectsSection = ref<HTMLElement | null>(null)
const interestsSection = ref<HTMLElement | null>(null)
const contactSection = ref<HTMLElement | null>(null)
const aboutSiteSection = ref<HTMLElement | null>(null)

const sectionByTab: Record<Tab, typeof aboutSection> = {
  'About Me': aboutSection,
  Projects: projectsSection,
  Interests: interestsSection,
  Contact: contactSection,
  'About This Site': aboutSiteSection,
}

const handleTabClick = (tab: Tab) => {
  current.value = tab
  const el = sectionByTab[tab].value
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>

<style>
/* Design System - CSS Custom Properties */
:root {
  /* Colors */
  --color-primary: #124731;
  --color-primary-light: rgba(18, 71, 49, 0.08);
  --color-primary-hover: rgba(18, 71, 49, 0.14);
  --color-primary-border: rgba(18, 71, 49, 0.5);
  --color-text: #111111;
  --color-text-muted: #666666;
  --color-text-secondary: #444444;
  --color-bg: #f7f7f7;
  --color-card-bg: rgba(255, 255, 255, 0.9);
  --color-input-bg: #fafafa;
  --color-border: #d0d0d0;
  --color-success: #13662f;
  --color-error: #a02626;

  /* Spacing (4px base unit) */
  --space-1: 0.25rem;
  /* 4px */
  --space-2: 0.5rem;
  /* 8px */
  --space-3: 0.75rem;
  /* 12px */
  --space-4: 1rem;
  /* 16px */
  --space-6: 1.5rem;
  /* 24px */

  /* Radius */
  --radius-sm: 0.4rem;
  --radius-md: 0.9rem;
  --radius-pill: 999px;

  /* Shadows */
  --shadow-sm: 0 6px 18px rgba(0, 0, 0, 0.06);
  --shadow-md: 0 12px 24px rgba(0, 0, 0, 0.1);
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
        ref="interestsSection"
        class="content-section"
        aria-label="Interests"
        v-reveal-on-scroll
      >
        <Interests />
      </section>

      <section
        ref="projectsSection"
        class="content-section"
        aria-label="Projects"
        v-reveal-on-scroll
      >
        <Projects />
      </section>

      <section ref="contactSection" class="content-section" aria-label="Contact" v-reveal-on-scroll>
        <Contact />
      </section>

      <section
        ref="aboutSiteSection"
        class="content-section"
        aria-label="About This Site"
        v-reveal-on-scroll
      >
        <AboutSite />
      </section>
    </main>

    <footer class="site-footer">
      <small>© {{ new Date().getFullYear() }} Mo Liu — all rights reserved </small>
    </footer>
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  background-color: var(--color-bg);
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), url('/monstera_print.png');
  background-repeat: repeat;
  background-size: 320px 320px;
  color: var(--color-text);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2.5rem 1rem;
  font-family: 'Computer Modern Serif', 'Computer Modern Sans', serif;
}

.site-header {
  width: 100%;
  max-width: 900px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  margin-bottom: var(--space-6);
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
  font-weight: 700;
  letter-spacing: -0.03em;
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
  font-size: 0.9rem;
  font-family: inherit;
  transition: all var(--transition-fast);
  position: relative;
}

.tab:hover {
  color: var(--color-text);
  transform: translateY(-2px);
}

.tab.active {
  color: var(--color-primary);
  background: var(--color-primary-light);
  border-color: var(--color-primary-border);
  font-weight: 600;
}

.tab.active::after {
  content: '';
  position: absolute;
  bottom: 2px;
  left: 50%;
  transform: translateX(-50%);
  width: 70%;
  height: 2px;
  background: var(--color-primary);
  border-radius: 2px;
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    width: 0;
    opacity: 0;
  }
  to {
    width: 70%;
    opacity: 1;
  }
}

.content {
  width: 100%;
  max-width: 900px;
  padding: 0.5rem 0;
}

.content-section {
  background: var(--color-card-bg);
  border-radius: var(--radius-md);
  padding: 1.5rem 1.75rem 1.4rem;
  box-shadow: var(--shadow-sm);
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
  transform: translateY(12px);
  transition:
    opacity 0.7s ease-out,
    transform 0.7s ease-out;
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
