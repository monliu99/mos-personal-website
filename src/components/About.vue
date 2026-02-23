<template>
  <section class="about">
    <div class="about-photo">
      <img src="/headshot.jpg" alt="Portrait of Mo" />
    </div>

    <div class="about-text">
      <h2>About Me</h2>
      <p>
        I am currently an MBA student at Yale and a resident of East Rock, New
        Haven, where I serve as co-president of the SOM Running Club and wait
        in line for Sally’s Apizza. My background includes working at McKinsey
        in New York and serving as a TechnoServe Fellow in Nairobi, Kenya,
        following my engineering studies at Brown University.

        This is temporary
      </p>
      <p>
        In my bag, I usually carry a well-loved book, well-worn running shoes,
        my reMarkable, and a Moleskine journal. You can always ask me about
        chasing a new PR in half marathon, my love for Rhode Island (and New
        England in general), my Letterboxd starred movies, or the latest new
        language I've taken on learning.
      </p>
    </div>
  </section>
</template>

<script setup lang="ts"></script>

<style scoped>
.about {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1.5rem;
  align-items: flex-start;
}

.about-photo {
  width: 120px;
  height: 120px;
  border-radius: 0.9rem;
  overflow: hidden;
}

.about-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 40%;
  transition: transform 0.25s ease-out;
}

.about-photo:hover img {
  transform: scale(1.03);
}

.about-text {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

h2 {
  margin: 0;
}

p {
  color: #444;
}

ul {
  margin: 0.5rem 0 0;
  padding-left: 1.1rem;
}

@media (max-width: 640px) {
  .about {
    grid-template-columns: 1fr;
    justify-items: flex-start;
  }
}
</style>
