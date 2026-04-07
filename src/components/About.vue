<template>
  <section class="about">
    <div class="about-photo">
      <img src="/headshot.jpg" alt="Portrait of Mo" />
    </div>

    <div class="about-text">
      <h2>About Me</h2>
      <p>
        I am currently an MBA student at Yale and a resident of East Rock, New Haven, where I serve
        as co-president of the SOM Running Club and wait in line for Sally’s Apizza. My background
        includes working at McKinsey in New York and serving as a TechnoServe Fellow in Nairobi,
        Kenya, following my undergraduate engineering studies at Brown University.
      </p>
      <p>
        In my bag, I usually carry a well-loved book, well-worn running shoes, my reMarkable, and a
        Moleskine journal. You can always ask me about chasing a new PR in half marathon, my love
        for Rhode Island (and New England in general), my Letterboxd starred movies, or the latest
        new language I've taken on learning.
      </p>
    </div>
  </section>
</template>

<script setup lang="ts"></script>

<style scoped>
.about {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: var(--space-6);
  align-items: flex-start;
}

.about-photo {
  width: 120px;
  height: 120px;
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: box-shadow var(--transition-base);
}

.about-photo:hover {
  box-shadow: var(--shadow-md);
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
  gap: var(--space-3);
}

h2 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.02em;
}

p {
  color: var(--color-text-secondary);
  line-height: 1.6;
}

ul {
  margin: var(--space-2) 0 0;
  padding-left: 1.1rem;
}

@media (max-width: 640px) {
  .about {
    grid-template-columns: 1fr;
    justify-items: flex-start;
    gap: var(--space-4);
  }

  .about-photo {
    width: 100px;
    height: 100px;
  }

  h2 {
    font-size: 1.25rem;
  }
}
</style>
