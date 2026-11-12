<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "../composables/useReducedMotion";
gsap.registerPlugin(ScrollTrigger);
const props = defineProps<{ delay?: number; mask?: boolean }>();
const el = ref<HTMLElement>();
const reduced = useReducedMotion();
let ctx: gsap.Context;
onMounted(() => {
  if (reduced.value || !el.value) return;
  ctx = gsap.context(
    () =>
      gsap.from(el.value!, {
        ...(props.mask
          ? { clipPath: "inset(0 0 100% 0)" }
          : { opacity: 0, y: 32 }),
        duration: 1.2,
        delay: props.delay ?? 0,
        ease: "power3.out",
        scrollTrigger: { trigger: el.value, start: "top 88%", once: true },
      }),
    el.value,
  );
});
onBeforeUnmount(() => ctx?.revert());
</script>
<template>
  <div ref="el"><slot /></div>
</template>
