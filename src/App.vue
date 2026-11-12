<script setup lang="ts">
import { useRoute } from 'vue-router'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import router from './router'
const route = useRoute()
gsap.registerPlugin(ScrollTrigger)
// Route components are lazy-loaded, so the first page (and its pinned hero)
// mounts after the footer has already registered its ScrollTrigger. GSAP
// refreshes triggers in registration order, so the footer would be measured
// with the hero's pin spacing reverted. Sort triggers into document order
// first, then refresh.
const refreshTriggers = () => {
  ScrollTrigger.sort((a, b) => a.start - b.start)
  ScrollTrigger.refresh()
}
router.isReady().then(() => requestAnimationFrame(refreshTriggers))
</script>
<template>
  <a class="skip-link" href="#main-content">Skip to content</a>
  <AppHeader />
  <main id="main-content" tabindex="-1">
    <RouterView v-slot="{ Component }">
      <Transition name="page" mode="out-in" @after-enter="refreshTriggers">
        <component :is="Component" :key="route.path" />
      </Transition>
    </RouterView>
  </main>
  <AppFooter />
</template>
<style>
.page-enter-active, .page-leave-active { transition: opacity .45s ease; }
.page-enter-from, .page-leave-to { opacity: 0; }
@media (prefers-reduced-motion: reduce) {
  .page-enter-active, .page-leave-active { transition: none; }
}
</style>
