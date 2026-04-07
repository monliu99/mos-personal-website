<template>
  <section class="contact">
    <h2>Contact</h2>
    <p class="contact-intro">
      You can find me on
      <a href="https://www.linkedin.com/in/mo-n-liu" target="_blank" rel="noopener noreferrer"
        >LinkedIn</a
      >
      and
      <a href="https://github.com/monliu99" target="_blank" rel="noopener noreferrer">GitHub</a>.
    </p>
    <p class="contact-intro">
      If you'd like to reach out, leave a note here and I'll get back to you.
    </p>

    <form class="contact-form" @submit.prevent="handleSubmit">
      <div class="field-row">
        <label for="name">Name</label>
        <input id="name" v-model="name" type="text" name="name" autocomplete="name" required />
      </div>

      <div class="field-row">
        <label for="email">Email</label>
        <input id="email" v-model="email" type="email" name="email" autocomplete="email" required />
      </div>

      <div class="field-row">
        <label for="message">Message</label>
        <textarea id="message" v-model="message" name="message" rows="4" required></textarea>
      </div>

      <button class="submit" type="submit" :disabled="status === 'sending'">
        <span v-if="status === 'sending'" class="button-content">
          <svg class="spinner" viewBox="0 0 24 24" aria-hidden="true">
            <circle
              cx="12"
              cy="12"
              r="10"
              fill="none"
              stroke="currentColor"
              stroke-width="3"
              stroke-dasharray="32"
              stroke-dashoffset="32"
            />
          </svg>
          Sending…
        </span>
        <span v-else>Send message</span>
      </button>

      <Transition name="slide-fade">
        <p v-if="status === 'success'" class="status status--success">
          Thank you — your message has been sent.
        </p>
      </Transition>

      <Transition name="slide-fade">
        <p v-if="status === 'error'" class="status status--error">
          Something went wrong sending your message. Please try again in a moment.
        </p>
      </Transition>
    </form>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const message = ref('')
const status = ref<'idle' | 'sending' | 'success' | 'error'>('idle')

const handleSubmit = async () => {
  if (!name.value || !email.value || !message.value) return

  status.value = 'sending'

  try {
    const response = await fetch(
      import.meta.env.VITE_FORMSPREE_ENDPOINT || 'https://formspree.io/f/your-endpoint-id',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: name.value,
          email: email.value,
          message: message.value,
        }),
      }
    )

    if (!response.ok) {
      throw new Error('Request failed')
    }

    status.value = 'success'
    name.value = ''
    email.value = ''
    message.value = ''
  } catch (e) {
    status.value = 'error'
  }
}
</script>

<style scoped>
.contact {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.contact-intro {
  margin: 0;
  color: var(--color-text-secondary);
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.field-row {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

label {
  font-size: 0.85rem;
  color: #333;
  font-weight: 500;
}

input,
textarea {
  font: inherit;
  padding: 0.5rem 0.6rem;
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-border);
  background-color: var(--color-input-bg);
  transition:
    border-color var(--transition-fast),
    box-shadow var(--transition-fast),
    transform var(--transition-fast);
}

input:focus,
textarea:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow:
    0 0 0 3px rgba(18, 71, 49, 0.1),
    0 0 0 1px var(--color-primary);
  transform: translateY(-1px);
}

.submit {
  align-self: flex-start;
  margin-top: var(--space-1);
  padding: 0.5rem 1.2rem;
  border-radius: var(--radius-pill);
  border: none;
  background: linear-gradient(135deg, var(--color-primary) 0%, #0f3c29 100%);
  color: white;
  font: inherit;
  font-weight: 500;
  cursor: pointer;
  transition:
    transform var(--transition-fast),
    box-shadow var(--transition-fast);
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
}

.submit:hover:enabled {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(18, 71, 49, 0.3);
}

.submit:active:enabled {
  transform: translateY(0);
}

.submit:disabled {
  opacity: 0.7;
  cursor: default;
  transform: none;
}

.button-content {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
}

.spinner {
  width: 16px;
  height: 16px;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
    stroke-dashoffset: 32;
  }
  to {
    transform: rotate(360deg);
    stroke-dashoffset: 0;
  }
}

.spinner circle {
  animation: dash 1.5s ease-in-out infinite;
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
}

.status {
  margin: 0;
  font-size: 0.85rem;
  padding: var(--space-2);
  border-radius: var(--radius-sm);
  animation: statusIn 0.3s ease-out;
}

@keyframes statusIn {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.status--success {
  color: var(--color-success);
  background-color: rgba(19, 102, 47, 0.1);
}

.status--error {
  color: var(--color-error);
  background-color: rgba(160, 38, 38, 0.1);
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(-8px);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

.contact-links {
  margin: var(--space-1) 0 0;
  font-size: 0.9rem;
}

.contact-links a {
  color: var(--color-primary);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.contact-links a:hover {
  color: var(--color-text);
  text-decoration: underline;
}
</style>
