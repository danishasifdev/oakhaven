<script setup lang="ts">
import { useRoute } from "vue-router";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AppHeader from "./components/AppHeader.vue";
import AppFooter from "./components/AppFooter.vue";
import router from "./router";
const route = useRoute();
gsap.registerPlugin(ScrollTrigger);
// Route components are lazy-loaded, so the first page (and its pinned hero)
// mounts after the footer has already registered its ScrollTrigger. GSAP
// refreshes triggers in registration order, so the footer would be measured
// with the hero's pin spacing reverted. Sort triggers into document order
// first, then refresh.
const refreshTriggers = () => {
  ScrollTrigger.sort((a, b) => a.start - b.start);
  ScrollTrigger.refresh();
};
router.isReady().then(() => requestAnimationFrame(refreshTriggers));
</script>
<template>
  <a
    class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-sand focus:px-4 focus:py-3 focus:text-ink"
    href="#main-content"
    >Skip to content</a
  >
  <AppHeader />
  <main id="main-content" tabindex="-1">
    <RouterView v-slot="{ Component }">
      <Transition
        enter-active-class="transition-opacity duration-[450ms] ease-out"
        enter-from-class="opacity-0"
        leave-active-class="transition-opacity duration-[450ms] ease-in"
        leave-to-class="opacity-0"
        mode="out-in"
        @after-enter="refreshTriggers"
      >
        <component :is="Component" :key="route.path" />
      </Transition>
    </RouterView>
  </main>
  <AppFooter />
</template>
