<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "../composables/useReducedMotion";
import TitleReveal from "./TitleReveal.vue";
import AppContainer from "./AppContainer.vue";
import AppButton from "./AppButton.vue";
import { footerNav, socialLinks } from "../data/navigation";
gsap.registerPlugin(ScrollTrigger);
const root = ref<HTMLElement>(),
  mark = ref<SVGElement>();
const reduced = useReducedMotion();
let ctx: gsap.Context | undefined;
onMounted(() => {
  if (reduced.value) return;
  ctx = gsap.context(() => {
    gsap.fromTo(
      mark.value!,
      { yPercent: 2, scale: 0.5 },
      {
        yPercent: 0,
        scale: 1,
        ease: "none",
        scrollTrigger: {
          trigger: root.value,
          start: "top bottom",
          end: "bottom bottom",
          scrub: true,
        },
      },
    );
  }, root.value);
});
onBeforeUnmount(() => ctx?.revert());
</script>
<template>
  <footer
    ref="root"
    class="relative flex min-h-140 flex-col overflow-hidden border-t border-ivory/10 py-12"
  >
    <!-- Brand wordmark opens the footer. -->
    <svg
      ref="mark"
      aria-hidden="true"
      viewBox="0 130 1000 250"
      preserveAspectRatio="xMidYMid meet"
      class="pointer-events-none h-auto w-full select-none"
    >
      <text
        x="500"
        y="370"
        text-anchor="middle"
        font-size="300"
        class="fill-sand font-display font-light opacity-[0.1]"
      >
        VÉRÉN
      </text>
    </svg>

    <AppContainer class="relative z-10 mt-auto flex flex-col">
      <TitleReveal
        as="p"
        class="pt-16 font-display text-display font-light"
        :lines="[{ text: 'Nine homes delivered.' }, { text: 'Nine on time.' }]"
      />

      <div
        class="flex flex-col justify-between gap-10 pt-8 text-xs tracking-wide md:flex-row"
      >
        <div class="flex flex-wrap items-center gap-6 md:gap-8">
          <a
            v-for="social in socialLinks"
            :key="social.label"
            :href="social.href"
            target="_blank"
            rel="noreferrer"
            :aria-label="social.label"
            class="inline-flex min-h-11 items-center transition-colors hover:text-sand"
            >{{ social.label }}</a
          >
          <AppButton to="/contact">Request a viewing ➚</AppButton>
        </div>
        <nav class="flex flex-wrap gap-6 md:gap-8" aria-label="Footer">
          <RouterLink
            v-for="item in footerNav"
            :key="item.to"
            :to="item.to"
            class="inline-flex min-h-11 items-center transition-colors hover:text-sand"
            >{{ item.label }} ➚</RouterLink
          >
        </nav>
      </div>

      <p class="mt-6 text-end text-xs text-muted">
        © 2026 VÉRÉN. Concept project. All names and figures are fictional.
      </p>
    </AppContainer>
  </footer>
</template>
