<script setup lang="ts">
import { ref } from 'vue'
import ScrollReveal from '../components/ScrollReveal.vue'
import TitleReveal from '../components/TitleReveal.vue'
import { useCountUp } from '../composables/useCountUp'

const first = ref<HTMLElement>()
const second = ref<HTMLElement>()
const third = ref<HTMLElement>()
const onTime = useCountUp(first, 9)
const homes = useCountUp(second, 2140)
const early = useCountUp(third, 38)

// Concept copy: these fictional owner statements are quoted from the content brief.
const ownerVoices = [
  { quote: 'The keys arrived five weeks early. The finish was what the brochure promised.', development: 'Palm Quay', year: '2022' },
  { quote: 'We moved in. Nothing needed fixing. That has never happened to us before.', development: 'The Linden', year: '2016' },
  { quote: 'They sent a progress photo every month for three years.', development: 'One Creek', year: '2024' },
]
</script>
<template>
  <section class="relative overflow-hidden py-20 md:py-32">
    <img src="/img/skyline.avif" alt="" loading="lazy" class="absolute inset-0 size-full object-cover opacity-25" />
    <div class="absolute inset-0 bg-ink/60" />
    <div class="relative mx-auto w-full max-w-[90rem] px-6 md:px-12">
      <ScrollReveal><p class="eyebrow mb-6">04 · The record</p></ScrollReveal>
      <TitleReveal as="h2" class="font-display headline font-light" :lines="[{ text: 'Built. Delivered.' }, { text: 'Documented.' }]" />
      <dl class="mt-12 grid gap-8 md:mt-16 md:grid-cols-3">
        <ScrollReveal class="flex flex-col border-t border-ivory/20 pt-6">
          <dt class="order-2 mt-3 text-sm text-muted">Handovers on time</dt>
          <dd ref="first" class="order-1 font-display text-5xl font-light md:text-7xl">{{ Math.round(onTime) }} of 9</dd>
        </ScrollReveal>
        <ScrollReveal class="flex flex-col border-t border-ivory/20 pt-6">
          <dt class="order-2 mt-3 text-sm text-muted">Homes handed over</dt>
          <dd ref="second" class="order-1 font-display text-5xl font-light md:text-7xl">{{ Math.round(homes).toLocaleString('en-US') }}</dd>
        </ScrollReveal>
        <ScrollReveal class="flex flex-col border-t border-ivory/20 pt-6">
          <dt class="order-2 mt-3 text-sm text-muted">Average early delivery</dt>
          <dd ref="third" class="order-1 font-display text-5xl font-light md:text-7xl">{{ Math.round(early) }} days</dd>
        </ScrollReveal>
      </dl>
      <p class="mt-8 text-xs text-muted">Based on contract dates and signed handover certificates.</p>
      <RouterLink to="/record" class="mt-8 inline-flex min-h-11 items-center border-b border-sand pb-1 text-sm text-sand">
        See every handover →
      </RouterLink>
    </div>
  </section>

  <section class="mx-auto w-full max-w-[90rem] px-6 py-20 md:px-12 md:py-32" aria-labelledby="owner-voices-heading">
    <p class="eyebrow mb-6">Owner voices</p>
    <TitleReveal as="h2" id="owner-voices-heading" class="font-display headline font-light" :lines="[{ text: 'After handover.' }]" />
    <div class="mt-10 grid gap-10 md:grid-cols-3 md:gap-8">
      <blockquote v-for="voice in ownerVoices" :key="voice.development" class="border-t border-ivory/15 pt-5">
        <p class="font-display text-2xl italic leading-snug md:text-3xl">“{{ voice.quote }}”</p>
        <footer class="mt-6 text-xs text-muted">{{ voice.development }} · {{ voice.year }}</footer>
      </blockquote>
    </div>
  </section>
</template>
