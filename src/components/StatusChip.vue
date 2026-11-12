<script setup lang="ts">
defineProps<{ status: string }>()
</script>

<template>
  <span class="inline-flex min-h-8 items-center border border-sand/50 px-3 text-[10px] uppercase tracking-[0.18em] text-sand">
    {{ status }}
  </span>
</template>
