<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

// Navigate to home on name click
const goToHome = () => {
  router.push('/')
}
</script>

<style>
/* Design System - CSS Custom Properties */
:root {
  /* Colors */
  --color-primary: #0f3d2a;
  --color-primary-light: rgba(15, 61, 42, 0.06);
  --color-primary-hover: rgba(15, 61, 42, 0.12);
  --color-primary-border: rgba(15, 61, 42, 0.2);
  --color-text: #1a1a1a;
  --color-text-muted: #6b6b6b;
  --color-text-secondary: #3a3a3a;
  --color-bg: #faf9f6;
  --color-card-bg: #ffffff;
  --color-input-bg: #f5f4f1;
  --color-border: #e5e4e1;
  --color-success: #0f5c32;
  --color-error: #c41c1c;

  /* Spacing (4px base unit) */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;

  /* Radius */
  --radius-sm: 0.3rem;
  --radius-md: 0.5rem;
  --radius-pill: 999px;

  /* Shadows */
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.05), 0 2px 4px rgba(0, 0, 0, 0.03);
  --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.06), 0 4px 8px rgba(0, 0, 0, 0.04);
  --shadow-focus: 0 0 0 3px rgba(15, 61, 42, 0.1);

  /* Transitions */
  --transition-fast: 0.15s ease;
  --transition-base: 0.2s ease;
  --transition-smooth: 0.3s ease-out;
}

/* Global background for all pages */
body {
  margin: 0;
  background-color: var(--color-bg);
  font-family: 'Lora', Georgia, serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

html {
  background-color: var(--color-bg);
}
</style>

<template>
  <router-view />
</template>

<style scoped>
/* Global styles handled by individual page components */
</style>
