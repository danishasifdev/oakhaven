<script setup lang="ts">
import ScrollReveal from "../components/ScrollReveal.vue";
import ScrollFillText from "../components/ScrollFillText.vue";
import AppContainer from "../components/AppContainer.vue";
import AppButton from "../components/AppButton.vue";
import Eyebrow from "../components/Eyebrow.vue";
import SectionTitle from "../components/SectionTitle.vue";
import LocationMap from "../components/LocationMap.vue";
import { locations } from "../data/locations";
</script>

<template>
  <AppContainer
    as="section"
    id="locations"
    class="grid items-center gap-12 py-20 md:grid-cols-2 md:py-32"
  >
    <div class="relative z-10 max-w-xl">
      <ScrollReveal><Eyebrow class="mb-6">05 · Where we build</Eyebrow></ScrollReveal>
      <SectionTitle :lines="[{ text: 'Eight destinations.' }]" />
      <ScrollFillText
        class="mt-8 text-sm leading-relaxed"
        text="Nine delivered communities and three in progress across the UAE and the wider Gulf."
      />
      <ScrollReveal :delay="0.2">
        <AppButton to="/locations" variant="link" class="mt-8">
          Explore locations →
        </AppButton>
      </ScrollReveal>
    </div>
    <div class="relative overflow-hidden border border-ivory/10 bg-raised">
      <LocationMap class="aspect-[970/600] w-full" />
      <ul
        class="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 p-4 text-[10px] text-ivory/80 sm:grid-cols-4 md:absolute md:inset-x-4 md:bottom-4 md:mt-0 md:bg-ink/75 md:backdrop-blur-sm"
      >
        <li v-for="location in locations" :key="location.name">
          {{ location.name }}
        </li>
      </ul>
    </div>
  </AppContainer>
</template>
