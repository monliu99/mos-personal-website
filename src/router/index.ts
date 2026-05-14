import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  { path: '/', component: () => import('../Home.vue') },
  { path: '/about', component: () => import('../Home.vue') },
  { path: '/projects', component: () => import('../Home.vue') },
  { path: '/interests', component: () => import('../Home.vue') },
  { path: '/contact', component: () => import('../Home.vue') },
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
    return false
  },
})

export default router
