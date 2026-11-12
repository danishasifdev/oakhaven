<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "../composables/useReducedMotion";
import TitleReveal from "./TitleReveal.vue";
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
      { yPercent: 8, scale: 0.92 },
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
    class="relative overflow-hidden border-t border-ivory/10 min-h-115 py-12"
  >
    <svg
      ref="mark"
      aria-hidden="true"
      viewBox="0 0 1000 400"
      preserveAspectRatio="xMidYMid meet"
      class="pointer-events-none absolute inset-x-0 bottom-[-2vw] h-auto w-full select-none"
    >
      <text
        x="500"
        y="370"
        text-anchor="middle"
        font-size="300"
        class="fill-sand font-display font-light opacity-[0.15]"
      >
        VÉRÉN
      </text>
    </svg>
    <div
      class="relative z-10 mx-auto flex w-full max-w-360 flex-col justify-between gap-10 px-6 text-xs tracking-wide md:flex-row md:px-12"
    >
      <nav class="flex flex-wrap gap-6 md:gap-8" aria-label="Footer">
        <RouterLink
          to="/developments"
          class="inline-flex min-h-11 items-center transition-colors hover:text-sand"
          >Developments</RouterLink
        >
        <RouterLink
          to="/record"
          class="inline-flex min-h-11 items-center transition-colors hover:text-sand"
          >Record</RouterLink
        >
        <RouterLink
          to="/about"
          class="inline-flex min-h-11 items-center transition-colors hover:text-sand"
          >About</RouterLink
        >
        <RouterLink
          to="/locations"
          class="inline-flex min-h-11 items-center transition-colors hover:text-sand"
          >Locations</RouterLink
        >
      </nav>
      <div class="flex flex-wrap items-center gap-6 md:gap-8">
        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noreferrer"
          aria-label="Instagram"
          class="inline-flex min-h-11 items-center transition-colors hover:text-sand"
          >Instagram</a
        >
        <a
          href="https://www.linkedin.com/"
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
          class="inline-flex min-h-11 items-center transition-colors hover:text-sand"
          >LinkedIn</a
        >
        <a
          href="https://www.youtube.com/"
          target="_blank"
          rel="noreferrer"
          aria-label="YouTube"
          class="inline-flex min-h-11 items-center transition-colors hover:text-sand"
          >YouTube</a
        >
        <RouterLink
          to="/contact"
          class="inline-flex min-h-11 items-center border-b border-sand pb-1 text-sand"
          >Request a viewing</RouterLink
        >
      </div>
    </div>
    <TitleReveal
      as="p"
      class="relative z-10 mx-auto w-full max-w-360 px-6 pt-16 font-display headline font-light md:px-12"
      :lines="[{ text: 'Nine homes delivered.' }, { text: 'Nine on time.' }]"
    />
    <p
      class="relative z-10 mx-auto mt-10 w-full max-w-360 px-6 text-xs text-muted md:px-12"
    >
      © 2026 VÉRÉN. Concept project. All names and figures are fictional.
    </p>
  </footer>
</template>
