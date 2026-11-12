import { createRouter, createWebHistory } from 'vue-router'
import { projects } from './data/projects'
export default createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    { path: '/', component: () => import('./pages/HomePage.vue') },
    { path: '/developments', component: () => import('./pages/DevelopmentsPage.vue') },
    { path: '/developments/:slug', component: () => import('./pages/ProjectPage.vue'),
      beforeEnter: (to) => projects.some((p) => p.slug === to.params.slug) || '/developments' },
    { path: '/record', component: () => import('./pages/RecordPage.vue') },
    { path: '/about', component: () => import('./pages/AboutPage.vue') },
    { path: '/locations', component: () => import('./pages/LocationsPage.vue') },
    { path: '/contact', component: () => import('./pages/ContactPage.vue') },
    { path: '/:pathMatch(.*)*', component: () => import('./pages/NotFoundPage.vue') },
  ],
})
