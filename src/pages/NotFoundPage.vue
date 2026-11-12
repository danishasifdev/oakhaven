<script setup lang="ts">
import PageHero from '../components/PageHero.vue'
</script>

<template>
  <div>
    <PageHero eyebrow="Page not found" title="This page has not been handed over." />
    <div class="mx-auto w-full max-w-[90rem] px-6 pb-32 md:px-12">
      <RouterLink to="/" class="inline-flex min-h-11 items-center border-b border-sand text-sm text-sand">Return home →</RouterLink>
    </div>
  </div>
</template>
