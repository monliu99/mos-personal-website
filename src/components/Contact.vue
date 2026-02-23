<template>
  <section class="contact">
    <h2>Contact</h2>
    <p class="contact-intro">
      Or, you can also find me on
      <a
        href="https://www.linkedin.com/in/mo-n-liu"
        target="_blank"
        rel="noopener noreferrer"
        >LinkedIn</a
      >
      and
      <a
        href="https://github.com/monliu99"
        target="_blank"
        rel="noopener noreferrer"
        >GitHub</a
      >.
    </p>
    <p class="contact-intro">
      If you'd like to reach out, leave a note here and I'll get back to you.
    </p>

    <form class="contact-form" @submit.prevent="handleSubmit">
      <div class="field-row">
        <label for="name">Name</label>
        <input
          id="name"
          v-model="name"
          type="text"
          name="name"
          autocomplete="name"
          required
        />
      </div>

      <div class="field-row">
        <label for="email">Email</label>
        <input
          id="email"
          v-model="email"
          type="email"
          name="email"
          autocomplete="email"
          required
        />
      </div>

      <div class="field-row">
        <label for="message">Message</label>
        <textarea
          id="message"
          v-model="message"
          name="message"
          rows="4"
          required
        ></textarea>
      </div>

      <button class="submit" type="submit" :disabled="status === 'sending'">
        <span v-if="status === 'sending'">Sending…</span>
        <span v-else>Send message</span>
      </button>

      <p v-if="status === 'success'" class="status status--success">
        Thank you — your message has been sent.
      </p>
      <p v-if="status === 'error'" class="status status--error">
        Something went wrong sending your message. Please try again in a moment.
      </p>
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
    // Replace this URL with the endpoint from your email form service
    // (for example, a Formspree or Netlify Forms endpoint).
    const response = await fetch('https://formspree.io/f/your-endpoint-id', {
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
    })

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
  gap: 0.75rem;
}

.contact-intro {
  margin: 0;
  color: #444;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.field-row {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

label {
  font-size: 0.85rem;
  color: #333;
}

input,
textarea {
  font: inherit;
  padding: 0.4rem 0.5rem;
  border-radius: 0.4rem;
  border: 1px solid #d0d0d0;
  background-color: #fafafa;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: #124731;
  box-shadow: 0 0 0 1px rgba(18, 71, 49, 0.25);
}

.submit {
  align-self: flex-start;
  margin-top: 0.25rem;
  padding: 0.4rem 0.9rem;
  border-radius: 999px;
  border: 1px solid rgba(18, 71, 49, 0.6);
  background: rgba(18, 71, 49, 0.08);
  color: #124731;
  font: inherit;
  cursor: pointer;
  transition: background 0.15s ease, transform 0.1s ease;
}

.submit:hover:enabled {
  background: rgba(18, 71, 49, 0.14);
  transform: translateY(-1px);
}

.submit:disabled {
  opacity: 0.6;
  cursor: default;
}

.status {
  margin: 0;
  font-size: 0.8rem;
}

.status--success {
  color: #13662f;
}

.status--error {
  color: #a02626;
}

.contact-links {
  margin: 0.25rem 0 0;
  font-size: 0.9rem;
}

.contact-links a {
  color: #124731;
}

.contact-links a:hover {
  text-decoration: underline;
}
</style>
