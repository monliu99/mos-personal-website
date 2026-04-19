import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

// Lazy load article views
const ResponsibleAIConference = () => import('../views/ResponsibleAIConference.vue')

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('../Home.vue'),
  },
  {
    path: '/writing/responsible-ai-conference',
    name: 'article-responsible-ai-conference',
    component: ResponsibleAIConference,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    return { top: 0 }
  },
})

export default router
