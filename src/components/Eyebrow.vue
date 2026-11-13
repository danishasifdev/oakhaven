<script setup lang="ts">
withDefaults(
  defineProps<{ as?: string; tone?: "muted" | "sand" }>(),
  { as: "p", tone: "muted" },
);
</script>

<template>
  <component
    :is="as"
    class="text-[11px] uppercase tracking-[0.28em]"
    :class="tone === 'sand' ? 'text-sand' : 'text-muted'"
  >
    <slot />
  </component>
</template>
