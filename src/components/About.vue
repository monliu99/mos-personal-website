<template>
  <section class="about">
    <h2 class="section-title">About Me</h2>
    <div class="about-photo">
      <img src="/headshot.jpg" alt="Portrait of Mo" />
    </div>

    <div class="about-text">
      <p>
        I'm an MBA student at Yale, living in East Rock, where I co-lead the SOM Run Club and have
        strong feelings about the New Haven-ish pizza at Atticus Market. Before this there was
        McKinsey in New York and a fellowship with TechnoServe in Nairobi, and before that Brown,
        where I studied engineering and sailed on the varsity women's team (Go Bruno!).
      </p>
      <p>
        In my bag you will find a book that's been read too many times, running shoes that have gone
        too many miles, a reMarkable, and a MacBook that's too old. You can ask me about half
        marathons and the PR I'm always chasing, or about Rhode Island and the particular way it
        feels like home, or about the movies I've starred on Letterboxd. I'm also trying to learn to
        bake sourdough, which is going about as well as you'd expect.
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
