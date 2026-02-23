<script setup lang="ts">
import { ref } from 'vue'
import About from './components/About.vue'
import Projects from './components/Projects.vue'
import Interests from './components/Interests.vue'
import Contact from './components/Contact.vue'
import AboutSite from './components/AboutSite.vue'

const tabs = ['About Me', 'Projects', 'Interests', 'Contact', 'About This Site'] as const
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
      <section
        ref="aboutSection"
        class="content-section"
        aria-label="About Me"
        v-reveal-on-scroll
      >
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

      <section
        ref="contactSection"
        class="content-section"
        aria-label="Contact"
        v-reveal-on-scroll
      >
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
  background-color: #f7f7f7;
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.7),
      rgba(255, 255, 255, 0.7)
    ),
    url('/monstera_print.png');
  background-repeat: repeat;
  background-size: 320px 320px;
  color: #111111;
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
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.site-header-inner {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.75rem 1rem;
  border-radius: 0.9rem;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
}

.name {
  margin: 0;
  font-weight: 700;
  letter-spacing: -0.03em;
}

.tabs {
  display: flex;
  gap: 0.5rem;
}

.tab {
  background: transparent;
  border-radius: 999px;
  border: 1px solid transparent;
  padding: 0.4rem 0.9rem;
  cursor: pointer;
  color: #666666;
  font-size: 0.9rem;
  font-family: inherit;
  transition: all 0.15s ease;
}

.tab:hover {
  color: #111111;
  transform: translateY(-1px);
}

.tab.active {
  color: #124731;
  background: rgba(18, 71, 49, 0.08);
  border-color: rgba(18, 71, 49, 0.5);
  font-weight: 600;
}

.content {
  width: 100%;
  max-width: 900px;
  padding: 0.5rem 0;
}

.content-section {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 0.9rem;
  padding: 1.5rem 1.75rem 1.4rem;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
}

.content-section + .content-section {
  margin-top: 1.5rem;
}

.content-section.reveal {
  opacity: 0;
  transform: translateY(12px);
  transition: opacity 0.7s ease-out, transform 0.7s ease-out;
}

.content-section.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.site-footer {
  margin-top: 1rem;
  color: #777777;
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
