<template>
  <section class="about">
    <h2 class="section-title">About Me</h2>
    <div class="about-photo">
      <img src="/headshot.jpg" alt="Portrait of Mo" />
    </div>

    <div class="about-text">
      <p>
        I'm a Yale MBA student building toward a career in product management, with a background that
        spans engineering design, strategic deployment, and go-to-market — an engineering degree from
        Brown, McKinsey in New York, and a TechnoServe fellowship in Nairobi. The projects below are things I built myself to solve problems that I see in my daily life,
        integrating AI tools that I continuously learn about and mostly powered by Claude Code.
      </p>
      <p>
        Outside of that, I co-lead the SOM Run Club, have strong opinions about New Haven pizza, and
        keep a Letterboxd account I take perhaps too seriously. I grew up in Beijing, lived in New
        England for the past decade, and love to explore corners of the world.
      </p>
    </div>
  </section>
</template>

<script setup lang="ts"></script>

<style scoped>
.section-title {
  grid-column: 1 / -1;
  margin: 0 0 var(--space-6);
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: var(--color-text);
}

.about {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: var(--space-6);
  align-items: flex-start;
}

.about-photo {
  width: 160px;
  height: 160px;
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  transition: box-shadow var(--transition-base);
}

.about-photo:hover {
  box-shadow: var(--shadow-lg);
}

.about-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 40%;
  transition: transform var(--transition-base);
}

.about-photo:hover img {
  transform: scale(1.05);
}

.about-text {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

p {
  margin: 0;
  color: var(--color-text-secondary);
  line-height: 1.75;
  font-size: 1rem;
}

@media (max-width: 640px) {
  .section-title {
    font-size: 1.3rem;
    margin-bottom: var(--space-4);
  }

  .about {
    grid-template-columns: 1fr;
    justify-items: flex-start;
    gap: var(--space-4);
  }

  .about-photo {
    width: 100px;
    height: 100px;
  }

  p {
    font-size: 0.98rem;
    line-height: 1.65;
  }
}
</style>
