<script setup lang="ts">
withDefaults(defineProps<{ as?: string }>(), { as: "div" });
</script>

<template>
  <component
    :is="as"
    class="mx-auto w-full max-w-page px-6 md:px-12"
  >
    <slot />
  </component>
</template>
