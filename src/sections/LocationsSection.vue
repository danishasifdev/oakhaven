<script setup lang="ts">
import ScrollReveal from '../components/ScrollReveal.vue'
import TitleReveal from '../components/TitleReveal.vue'
import ScrollFillText from '../components/ScrollFillText.vue'
import { locations } from '../data/locations'
const markerPositions = [
  { left: '69%', top: '39%' }, { left: '65%', top: '45%' }, { left: '64%', top: '35%' }, { left: '72%', top: '43%' },
  { left: '58%', top: '53%' }, { left: '49%', top: '42%' }, { left: '34%', top: '65%' }, { left: '20%', top: '80%' },
]
</script>
<template>
  <section id="locations" class="mx-auto grid w-full max-w-[90rem] items-center gap-12 overflow-hidden px-6 py-20 md:grid-cols-2 md:px-12 md:py-32">
    <div class="relative z-10 max-w-xl">
      <ScrollReveal><p class="eyebrow mb-6">05 · Where we build</p></ScrollReveal>
      <TitleReveal as="h2" class="font-display headline font-light" :lines="[{ text: 'Eight destinations.' }]" />
      <ScrollFillText
        class="mt-8 text-sm leading-relaxed"
        text="Nine delivered communities and three in progress across the UAE and the wider Gulf."
      />
      <ScrollReveal :delay="0.2">
        <RouterLink to="/locations" class="mt-8 inline-flex min-h-11 items-center border-b border-sand pb-1 text-sm text-sand">
          Explore locations →
        </RouterLink>
      </ScrollReveal>
    </div>
    <div class="relative min-h-[24rem] overflow-hidden md:min-h-[36rem]">
      <img src="/img/map.jpg" alt="" loading="lazy" class="absolute inset-0 size-full object-cover opacity-40" />
      <div class="absolute inset-0 bg-ink/35" />
      <span
        v-for="(location, index) in locations"
        :key="location.name"
        role="img"
        :aria-label="`${location.name}, ${location.region}: ${location.status}`"
        class="absolute size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sand shadow-[0_0_16px_4px_rgba(184,169,149,0.65)]"
        :style="markerPositions[index]"
      />
      <ul class="absolute bottom-4 left-4 right-4 grid grid-cols-2 gap-x-4 gap-y-2 bg-ink/75 p-4 text-[10px] text-ivory/80 sm:grid-cols-4">
        <li v-for="location in locations" :key="location.name">{{ location.name }}</li>
      </ul>
    </div>
  </section>
</template>
