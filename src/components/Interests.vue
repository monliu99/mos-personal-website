<template>
  <section class="interests">
    <header class="interests-header">
      <h2>Interests</h2>
      <p class="interests-intro">
        There are a few things that I love doing in my free time; click on the icons to check out my
        profiles:
      </p>
    </header>

    <div class="interests-grid">
      <article
        v-for="(interest, index) in interests"
        :key="interest.title"
        class="interest-card"
        :style="{ animationDelay: `${index * 100}ms` }"
      >
        <div class="interest-heading" v-if="interest.icon">
          <h3>{{ interest.title }}</h3>
          <a
            :href="interest.icon.url"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="interest.icon.label"
            class="interest-icon-link"
          >
            <span class="icon" aria-hidden="true">
              <img :src="interest.icon.img" alt="" class="icon-img" />
            </span>
          </a>
        </div>
        <h3 v-else>{{ interest.title }}</h3>
        <p class="interest-body">
          {{ interest.description }}
        </p>
        <ul class="interest-list">
          <li v-for="item in interest.details" :key="item.label">
            <strong>{{ item.label }}:</strong> {{ item.value }}
          </li>
        </ul>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
interface InterestDetail {
  label: string
  value: string
}

interface Interest {
  title: string
  description: string
  details: InterestDetail[]
  icon?: {
    url: string
    label: string
    img: string
  }
}

const interests: Interest[] = [
  {
    title: 'Running',
    description:
      'I love running outdoors. As the Co-President of the Yale SOM Run Club and a member of the New Haven Road Runners, I am often running around East Rock and on the Canal Trail.',
    details: [
      { label: 'Recent races', value: 'Amica Newport Half-Marathon' },
      { label: 'Favorite routes', value: 'East Rock summit, East Bay bike path' },
    ],
    icon: {
      url: 'https://www.strava.com/athletes/160188151',
      label: 'View my runs on Strava',
      img: '/strava_icon.png',
    },
  },
  {
    title: 'Reading',
    description:
      'I mostly read fiction but have recently ventured into biographies. My favorite authors include Lorrie Moore, Elif Batuman, and Yiyun Li.',
    details: [
      { label: 'Currently reading', value: 'The Book of Goose' },
      {
        label: 'Recent favorites',
        value: 'Either/Or, The Sound and the Fury, Emporer of Gladness',
      },
    ],
    icon: {
      url: 'https://www.goodreads.com/user/show/123977622-mo',
      label: 'See more on Goodreads',
      img: '/goodreads_icon.png',
    },
  },
  {
    title: 'Music',
    description:
      'I grew up playing the piano, and have fallen in love with chamber music in recent years; often, I am at the Yale School of Music chamber series.',
    details: [
      { label: 'Currently playing', value: 'The Hadyn Trumpet Concerto' },
      {
        label: 'Favorite composers',
        value: 'Franz Schubert, Johannes Brahms, Dmitri Shostakovich',
      },
    ],
  },
]
</script>

<style scoped>
.interests {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.interests-header {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.interests-intro {
  margin: 0;
  color: var(--color-text-secondary);
}

.interests-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: var(--space-4);
}

.interest-card {
  background:
    linear-gradient(135deg, var(--color-primary-light), rgba(18, 71, 49, 0.03)),
    var(--color-card-bg);
  border-radius: var(--radius-md);
  padding: 1rem 1.1rem 0.9rem;
  border: 1px solid rgba(18, 71, 49, 0.16);
  transition:
    transform var(--transition-base),
    box-shadow var(--transition-base);
  animation: cardEntrance 0.5s ease-out backwards;
}

.interest-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
  border-color: var(--color-primary-border);
}

@keyframes cardEntrance {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.interest-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-2);
}

.interest-card h3 {
  margin: 0 0 0.25rem;
}

.interest-body {
  margin: 0 0 0.4rem;
  color: var(--color-text-secondary);
}

.interest-list {
  margin: 0;
  padding-left: 1.1rem;
  color: var(--color-text-secondary);
}

.interest-link {
  margin: 0.4rem 0 0;
  font-size: 0.85rem;
}

.interest-link a {
  color: var(--color-primary);
  text-decoration: none;
}

.interest-link a:hover {
  text-decoration: underline;
}

.icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.icon-svg {
  width: 18px;
  height: 18px;
}

.icon-img {
  width: 20px;
  height: 20px;
  display: block;
  transition: transform var(--transition-fast);
}

.interest-icon-link:hover .icon-img {
  transform: scale(1.15);
}

.interest-icon-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: transform var(--transition-fast);
}

.interest-icon-link:hover {
  transform: scale(1.1);
}

@media (max-width: 640px) {
  .interests-grid {
    grid-template-columns: 1fr;
  }
}
</style>
