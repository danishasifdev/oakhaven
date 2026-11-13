<script setup lang="ts">
import TitleReveal from "./TitleReveal.vue";

withDefaults(
  defineProps<{
    lines: ReadonlyArray<{ text: string; class?: string }>;
    as?: string;
    tileClass?: string;
  }>(),
  { as: "h2" },
);
</script>

<template>
  <TitleReveal
    :as="as"
    :lines="lines"
    :tile-class="tileClass"
    class="font-display text-display font-light"
  />
</template>
