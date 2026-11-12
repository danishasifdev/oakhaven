<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "../composables/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

// Scroll-linked text fill: words start muted and take on ivory one by one as
// the paragraph crosses the viewport. Scrubbed, so it reverses when
// scrolling back up. Color motion only — no layout animation.
defineProps<{ text: string }>();

const root = ref<HTMLElement>();
const reduced = useReducedMotion();
// Hex twins of --color-muted / --color-ivory from src/styles/main.css.
const muted = "#A6A399";
const ivory = "#F0EDE5";
let ctx: gsap.Context | undefined;

onMounted(() => {
  if (reduced.value || !root.value) return;
  ctx = gsap.context(() => {
    const words = root.value!.querySelectorAll(".fill-word");
    gsap.fromTo(
      words,
      { color: muted },
      {
        color: ivory,
        ease: "none",
        duration: 0.3,
        stagger: 0.7 / Math.max(1, words.length - 1),
        scrollTrigger: {
          trigger: root.value,
          start: "top 85%",
          end: "bottom 60%",
          scrub: true,
        },
      },
    );
  }, root.value);
});

onBeforeUnmount(() => ctx?.revert());
</script>

<template>
  <p ref="root" :class="reduced ? 'text-ivory' : 'text-muted'">
    <span
      v-for="(word, index) in text.split(' ')"
      :key="index"
      class="fill-word"
      >{{ word + " " }}</span
    >
  </p>
</template>
