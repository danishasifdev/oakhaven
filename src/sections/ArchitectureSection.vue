<script setup lang="ts">
import ScrollReveal from '../components/ScrollReveal.vue'
import TitleReveal from '../components/TitleReveal.vue'

const steps = [
  { title: 'Design locked.', detail: 'The finish specification is signed before construction starts.', image: '/img/wall.avif', alt: 'Concept image illustrating an exterior finish detail', ratio: 'aspect-[4/3]' },
  { title: 'Monthly reports.', detail: 'Photos and video from site go to every buyer each month.', image: '/img/solenne.avif', alt: 'Concept image illustrating a residential development', ratio: 'aspect-[4/3]' },
  { title: 'Independent inspection.', detail: 'A third party signs off before handover.', image: '/img/maison.avif', alt: 'Concept image illustrating a residential building detail', ratio: 'aspect-[4/3]' },
  { title: 'Handover day.', detail: 'Every home is checked with the owner room by room.', image: '/img/philosophy.avif', alt: 'Concept image illustrating a finished home interior', ratio: 'aspect-[4/3]' },
]
</script>

<template>
  <section class="bg-raised py-20 md:py-32">
    <div class="mx-auto w-full max-w-[90rem] px-6 md:px-12">
      <ScrollReveal><p class="eyebrow mb-6">03 · How we build</p></ScrollReveal>
      <TitleReveal
        as="h2"
        tile-class="bg-ink"
        class="max-w-4xl font-display headline font-light"
        :lines="[{ text: 'Nothing is a surprise.' }, { text: 'We show you every month.' }]"
      />
      <div class="mt-12 grid gap-x-8 gap-y-12 md:mt-20 md:grid-cols-2">
        <figure v-for="(step, index) in steps" :key="step.title" class="min-w-0">
          <ScrollReveal mask :delay="index * 0.08">
            <img :src="step.image" :alt="step.alt" loading="lazy" :class="['w-full object-cover', step.ratio]" />
          </ScrollReveal>
          <figcaption class="mt-5 min-h-20">
            <h3 class="font-display text-3xl">{{ step.title }}</h3>
            <p class="mt-2 max-w-md text-sm text-muted">{{ step.detail }}</p>
          </figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>
