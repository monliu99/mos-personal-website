<template>
  <section class="contact">
    <div class="social-links">
      <a
        href="https://www.linkedin.com/in/mo-n-liu"
        target="_blank"
        rel="noopener noreferrer"
        class="social-pill"
      >
        <svg class="social-icon" viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
          />
        </svg>
        LinkedIn
      </a>
      <a
        href="https://github.com/monliu99"
        target="_blank"
        rel="noopener noreferrer"
        class="social-pill"
      >
        <svg class="social-icon" viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M12 2C6.5 2 2 6.6 2 12.2c0 4.5 2.9 8.3 6.9 9.6.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.2-3.4-1.2-.4-1.1-.9-1.4-.9-1.4-.8-.6.1-.6.1-.6.9.1 1.4 1 1.4 1 .8 1.4 2.2 1 2.8.8.1-.6.3-1 .6-1.3-2.2-.3-4.4-1.1-4.4-4.9 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.6 0 0 .8-.3 2.8 1 .8-.2 1.6-.3 2.4-.3.8 0 1.6.1 2.4.3 2-1.3 2.8-1 2.8-1 .5 1.3.2 2.3.1 2.6.6.7 1 1.6 1 2.7 0 3.8-2.3 4.6-4.4 4.9.3.3.6.9.6 1.8v2.6c0 .3.2.6.7.5 4-1.3 6.9-5.1 6.9-9.6C22 6.6 17.5 2 12 2Z"
          />
        </svg>
        GitHub
      </a>
    </div>
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
import { ref, onUnmounted } from 'vue'

const name = ref('')
const email = ref('')
const message = ref('')
const status = ref<'idle' | 'sending' | 'success' | 'error'>('idle')

let dismissTimer: ReturnType<typeof setTimeout> | null = null

const scheduleDismiss = () => {
  if (dismissTimer) clearTimeout(dismissTimer)
  dismissTimer = setTimeout(() => {
    status.value = 'idle'
  }, 5000)
}

onUnmounted(() => {
  if (dismissTimer) clearTimeout(dismissTimer)
})

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
    scheduleDismiss()
    name.value = ''
    email.value = ''
    message.value = ''
  } catch (e) {
    console.error('Form submission failed:', e)
    status.value = 'error'
    scheduleDismiss()
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

.submit:focus-visible {
  outline: 2px solid white;
  outline-offset: -4px;
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

.social-links {
  display: flex;
  gap: var(--space-2);
  flex-wrap: wrap;
}

.social-pill {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: 0.4rem 0.9rem;
  border-radius: var(--radius-pill);
  border: 1px solid var(--color-primary-border);
  background: var(--color-primary-light);
  color: var(--color-primary);
  font-size: 0.9rem;
  font-family: inherit;
  font-weight: 500;
  text-decoration: none;
  transition: all var(--transition-fast);
}

.social-pill:hover {
  background: var(--color-primary-hover);
  transform: translateY(-2px);
  box-shadow: var(--shadow-sm);
}

.social-pill:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.social-icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}
</style>
