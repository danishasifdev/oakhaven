<script setup lang="ts">
import { ref } from "vue";
import ScrollReveal from "../components/ScrollReveal.vue";
import AppContainer from "../components/AppContainer.vue";
import AppButton from "../components/AppButton.vue";
import Eyebrow from "../components/Eyebrow.vue";
import SectionTitle from "../components/SectionTitle.vue";
import { useCountUp } from "../composables/useCountUp";

const stats = [
  { value: 9, label: "Handovers on time", format: (n: number) => `${n} of 9` },
  {
    value: 2140,
    label: "Homes handed over",
    format: (n: number) => n.toLocaleString("en-US"),
  },
  {
    value: 38,
    label: "Average early delivery",
    format: (n: number) => `${n} days`,
  },
];

// One count-up per stat, each bound to its own element.
const statEls = stats.map(() => ref<HTMLElement>());
const counts = stats.map((stat, index) => useCountUp(statEls[index], stat.value));
const setStatEl = (index: number) => (el: unknown) => {
  statEls[index].value = el instanceof HTMLElement ? el : undefined;
};

// Concept copy: these fictional owner statements are quoted from the content brief.
const ownerVoices = [
  {
    quote:
      "The keys arrived five weeks early. The finish was what the brochure promised.",
    development: "Palm Quay",
    year: "2022",
  },
  {
    quote:
      "We moved in. Nothing needed fixing. That has never happened to us before.",
    development: "The Linden",
    year: "2016",
  },
  {
    quote: "They sent a progress photo every month for three years.",
    development: "One Creek",
    year: "2024",
  },
];
</script>

<template>
  <section class="relative overflow-hidden py-20 md:py-32">
    <img
      src="/img/skyline.avif"
      alt=""
      loading="lazy"
      class="absolute inset-0 size-full object-cover opacity-25"
    />
    <div class="absolute inset-0 bg-ink/60" />
    <AppContainer class="relative">
      <ScrollReveal><Eyebrow class="mb-6">04 · The record</Eyebrow></ScrollReveal>
      <SectionTitle
        :lines="[{ text: 'Built. Delivered.' }, { text: 'Documented.' }]"
      />
      <dl class="mt-12 grid gap-8 md:mt-16 md:grid-cols-3">
        <ScrollReveal
          v-for="(stat, index) in stats"
          :key="stat.label"
          class="flex flex-col border-t border-ivory/20 pt-6"
        >
          <dt class="order-2 mt-3 text-sm text-muted">{{ stat.label }}</dt>
          <dd
            :ref="setStatEl(index)"
            class="order-1 font-display text-5xl font-light md:text-7xl"
          >
            {{ stat.format(Math.round(counts[index].value)) }}
          </dd>
        </ScrollReveal>
      </dl>
      <p class="mt-8 text-xs text-muted">
        Based on contract dates and signed handover certificates.
      </p>
      <AppButton to="/record" variant="link" class="mt-8">
        See every handover →
      </AppButton>
    </AppContainer>
  </section>

  <AppContainer
    as="section"
    class="py-20 md:py-32"
    aria-labelledby="owner-voices-heading"
  >
    <Eyebrow class="mb-6">Owner voices</Eyebrow>
    <SectionTitle
      id="owner-voices-heading"
      :lines="[{ text: 'After handover.' }]"
    />
    <div class="mt-10 grid gap-10 md:grid-cols-3 md:gap-8">
      <blockquote
        v-for="voice in ownerVoices"
        :key="voice.development"
        class="border-t border-ivory/15 pt-5"
      >
        <p class="font-display text-2xl italic leading-snug md:text-3xl">
          “{{ voice.quote }}”
        </p>
        <footer class="mt-6 text-xs text-muted">
          {{ voice.development }} · {{ voice.year }}
        </footer>
      </blockquote>
    </div>
  </AppContainer>
</template>
