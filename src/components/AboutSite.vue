<template>
  <section class="about-site">
    <h2>About This Site</h2>
    <p>
      This site is a single-page app built with Vue 3, using
      <strong>&lt;script setup&gt;</strong> and TypeScript, and bundled with Vite.
    </p>
  </section>
</template>

<script setup lang="ts"></script>

<style scoped>
.about-site {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.about-site p {
  margin: 0;
  color: #444;
}
</style>
