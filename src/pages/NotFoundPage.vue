<script setup lang="ts">
import PageHero from "../components/PageHero.vue";
import AppContainer from "../components/AppContainer.vue";
import AppButton from "../components/AppButton.vue";
</script>

<template>
  <div>
    <PageHero eyebrow="Page not found" title="This page has not been handed over." />
    <AppContainer class="pb-32">
      <AppButton to="/" variant="link">Return home →</AppButton>
    </AppContainer>
  </div>
</template>
