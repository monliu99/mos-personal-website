<template>
  <section class="interests">
    <header class="interests-header">
      <h2>Interests</h2>
      <p class="interests-intro">
       There are a few things that I love doing in my free time:
      </p>
    </header>

    <div class="interests-grid">
      <article class="interest-card">
        <div class="interest-heading">
          <h3>Running</h3>
          <a
            href="https://www.strava.com/athletes/160188151"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View my runs on Strava"
            class="interest-icon-link"
          >
            <span class="icon" aria-hidden="true">
              <img
                src="/strava_icon.png"
                alt=""
                class="icon-img icon-img--strava"
              />
            </span>
          </a>
        </div>
        <p class="interest-body">
          I am not fast, but I love running. As a member of the Yale SOM Run Club and the New Haven Road Runners, I am often running around East Rock and on the Canal Trail. 
        </p>
        <ul class="interest-list">
          <li><strong>Recent races:</strong> Amica Newport Half-Marathon</li>
          <li>
            <strong>Favorite routes:</strong> East Rock summit, East Bay bike path (Providence)
          </li>
        </ul>
      </article>

      <article class="interest-card">
        <div class="interest-heading">
          <h3>Reading</h3>
          <a
            href="https://www.goodreads.com/user/show/123977622-mo"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="See more on Goodreads"
            class="interest-icon-link"
          >
            <span class="icon" aria-hidden="true">
              <img
                src="/goodreads_icon.png"
                alt=""
                class="icon-img"
              />
            </span>
          </a>
        </div>
        <p class="interest-body">
          I mostly read fiction but have recently ventured into biographies. My favorite authors include Lorrie Moore, Elif Batuman, and Yiyun Li. 
        </p>
        <ul class="interest-list">
          <li><strong>Currently reading:</strong> The Book of Goose</li>
          <li><strong>Recent favorites:</strong> Either/Or, The Sound and the Fury, Emporer of Gladness</li>
        </ul>
      </article>

      <article class="interest-card">
        <h3>Music</h3>
        <p class="interest-body">
          I grew up playing the piano, and have fallen in love with chamber music in recent years; often, I am at the Yale School of Music chamber series. 
        </p>
        <ul class="interest-list">
          <li><strong>Currently playing:</strong> The Hadyn Trumpet Concerto</li>
          <li><strong>Favorite composers:</strong> Franz Schubert, Johannes Brahms, Dmitri Shostakovich</li>
        </ul>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts"></script>

<style scoped>
.interests {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.interests-header {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.interests-intro {
  margin: 0;
  color: #555;
}

.interests-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}

.interest-card {
  background: linear-gradient(
      135deg,
      rgba(18, 71, 49, 0.08),
      rgba(18, 71, 49, 0.03)
    ),
    rgba(255, 255, 255, 0.92);
  border-radius: 0.9rem;
  padding: 1rem 1.1rem 0.9rem;
  border: 1px solid rgba(18, 71, 49, 0.16);
}

.interest-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.interest-card h3 {
  margin: 0 0 0.25rem;
}

.interest-body {
  margin: 0 0 0.4rem;
  color: #444;
}

.interest-list {
  margin: 0;
  padding-left: 1.1rem;
  color: #444;
}

.interest-link {
  margin: 0.4rem 0 0;
  font-size: 0.85rem;
}

.interest-link a {
  color: #124731;
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
}

@media (max-width: 640px) {
  .interests-grid {
    grid-template-columns: 1fr;
  }
}
</style>
