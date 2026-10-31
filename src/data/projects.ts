export type ProjectCategory = 'ai' | 'research' | 'personal'

export type Project = {
  slug: string
  name: string
  description: string
  repo?: string
  liveUrl?: string
  liveLabel?: string
  demoComingSoon?: boolean
  badge?: 'WIP' | 'Planning'
  tech?: string
  category: ProjectCategory
}

export const categories: { key: ProjectCategory; title: string }[] = [
  { key: 'ai', title: 'AI-Powered Projects' },
  { key: 'research', title: 'Research & Analysis' },
  { key: 'personal', title: 'Personal Projects' },
]

export const projects: Project[] = [
  {
    slug: 'parity',
    name: 'Parity',
    description:
      "Most couples don't lack budgeting tools — they lack a shared way to talk about money. Parity gives both partners the same real-time view of their finances, and uses AI for the parts that usually turn into awkward conversations: drafting the monthly budget, running a monthly review that scores how well spending lines up with shared priorities, and turning a joint life plan into concrete next steps, with a chat assistant grounded in the couple's own data. Currently in alpha with 10 users.",
    repo: 'parity-app',
    liveUrl: 'https://withparity.vercel.app/',
    liveLabel: 'View App',
    badge: 'WIP',
    tech: 'Next.js for the web app, Claude for budgets, reviews, life planning and chat, Prisma with Neon Postgres for the database, NextAuth for accounts, Tailwind and shadcn/ui for the interface.',
    category: 'ai',
  },
  {
    slug: 'loom',
    name: 'Loom.ai',
    description:
      "Most relationship tools are built for sales pipelines, not genuine connections. The real barrier to keeping up with your network isn't memory — it's the activation energy of reaching back out after too long. Loom tracks who you've talked to, how things left off, and when it's time to reconnect. An AI trained on how you write drafts the follow-up so the message actually sounds like you sent it.",
    repo: 'loom',
    demoComingSoon: true,
    badge: 'WIP',
    tech: 'Next.js for the web app, Claude with personalized prompting to match your writing voice, Prisma for the database, Tailwind for styling.',
    category: 'ai',
  },
  {
    slug: 'soup-ai',
    name: 'soup.ai',
    description:
      "Pet health advice online is easy to find and hard to trust, and the stakes feel high when it's your own animal. soup.ai is a pet health assistant where every answer cites an authoritative veterinary source, and when it can't find one, it says \"I don't know\" instead of guessing. I'm building it largely solo, in preparation for Yale Tsai CITY's Launchpad program this fall.",
    badge: 'Planning',
    tech: 'Planned around Next.js on Vercel, the AI SDK with Claude for the agent, Meilisearch for searching veterinary sources, and Neon for the database.',
    category: 'ai',
  },
  {
    slug: 'ensemble-transfer-attacks',
    name: 'Ensemble Transfer Attacks',
    description:
      "Adversarial images crafted against public models often fool unseen models too, and attackers improve their odds by combining several \"surrogate\" models into one ensemble, which matters for anyone deploying image models. With Connor Kilrain for Yale's Trustworthy Deep Learning course, we're studying which surrogates actually drive that success. My part attacks every subset of 8 surrogate models (255 combinations), tests each one on 6 held-out target models, and uses Shapley values to measure how much each surrogate contributes on its own and in pairs. Final report due in December.",
    repo: 'ensemble-attacks-research',
    badge: 'WIP',
    tech: 'Python and PyTorch for the attack pipeline (MI-FGSM on ImageNet-compatible images), LaTeX for the write-up.',
    category: 'research',
  },
  {
    slug: 'nyc311-analysis',
    name: 'NYC 311 Analysis',
    description:
      "Nearly twelve years of New York City 311 service requests (28 million rows across 33 GB of raw JSON) don't fit comfortably in the 32 GB cluster job a class gets, and a one-off notebook makes it hard to trust or rerun any of the numbers. For a data lab in MGT 634, I built a pipeline that runs end to end with one command: it checks every file and recovers records from cut-off ones, cleans the data in a single streaming pass, and works through the lab's 11 questions into an HTML report, so every number can be reproduced from scratch.",
    repo: 'nyc311-analysis',
    liveUrl: 'https://monliu99.github.io/nyc311-analysis/',
    liveLabel: 'View Report',
    tech: 'Python, DuckDB and Parquet for processing data larger than memory, pandas and PyArrow for the analysis, GitHub Pages for the report.',
    category: 'research',
  },
  {
    slug: 'daily-brew-2-0',
    name: 'Daily Brew 2.0',
    description:
      "Most people spend the one ritual they fully control — their morning — on autopilot. Daily Brew is a small bet that a more intentional choice can shift how the next few hours feel: it asks how you're feeling, checks the weather, and suggests a coffee or tea recipe to match. Built in college and rebuilt years later with AI-powered recommendations, it's a project that started as a curiosity and became a daily habit.",
    repo: 'daily-brew-2.0',
    liveUrl: 'https://daily-brew-20.vercel.app/',
    tech: 'Claude Haiku for the drink recommendations (routed through a Cloudflare Worker), a small classifier trained in the browser as a fallback, Open-Meteo for the weather, and plain JavaScript, HTML and CSS for the app.',
    category: 'personal',
  },
  {
    slug: 'mos-library',
    name: "Mo's Library",
    description:
      "The way we store books — by title and author — doesn't match how we remember them: by a line, a feeling, a half-remembered argument. Standard search assumes you know what you're looking for. Mo's Library is a personal search engine built around how memory actually works — fast, forgiving of typos, and useful when all you have is a fragment instead of a title.",
    repo: 'mos-library',
    liveUrl: 'https://mos-library.vercel.app/',
    tech: 'Meilisearch for typo-tolerant full-text search, InstantSearch for the search UI, JavaScript for the logic, Vercel for hosting.',
    category: 'personal',
  },
]
