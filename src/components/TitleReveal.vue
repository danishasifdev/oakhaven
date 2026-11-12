<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "../composables/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

// Line-by-line title reveal: a tile sits over each line, then slides up and
// away on scroll while the text rises out from under it. Transform motion
// only — no width/height/top/left animation.
withDefaults(
  defineProps<{
    lines: ReadonlyArray<{ text: string; class?: string }>;
    as?: string;
    tileClass?: string;
  }>(),
  { as: "h2", tileClass: "bg-sand" },
);

const root = ref<HTMLElement>();
const reduced = useReducedMotion();
let ctx: gsap.Context | undefined;

onMounted(() => {
  if (reduced.value || !root.value) return;
  ctx = gsap.context(() => {
    gsap.set(".tr-text", { yPercent: 120 });
    gsap
      .timeline({
        scrollTrigger: { trigger: root.value, start: "top 88%", once: true },
      })
      .to(
        ".tr-tile",
        { xPercent: -101, duration: 0.8, ease: "power4.inOut", stagger: 0.09 },
        0,
      )
      .to(
        ".tr-text",
        { yPercent: 0, duration: 1.05, ease: "power3.out", stagger: 0.09 },
        0.08,
      );
  }, root.value);
});

onBeforeUnmount(() => ctx?.revert());
</script>

<template>
  <component :is="as" ref="root">
    <span
      v-for="(line, index) in lines"
      :key="index"
      class="relative mb-[-0.12em] block overflow-hidden pb-[0.12em]"
    >
      <span class="tr-text block" :class="line.class">{{ line.text }}</span>
      <span
        v-if="!reduced"
        class="tr-tile pointer-events-none absolute inset-0"
        :class="tileClass"
        aria-hidden="true"
      ></span>
    </span>
  </component>
</template>
