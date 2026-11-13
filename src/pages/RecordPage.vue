<script setup lang="ts">
import PageHero from "../components/PageHero.vue";
import AppContainer from "../components/AppContainer.vue";
import Eyebrow from "../components/Eyebrow.vue";
import SectionTitle from "../components/SectionTitle.vue";
import RecordTable from "../components/RecordTable.vue";
import { guarantees } from "../data/record";
import { metrics } from "../data/company";
</script>

<template>
  <div>
    <PageHero
      eyebrow="Delivery record"
      title="Every promise. Every date."
      lead="We publish the date we promised and the date we delivered."
    />
    <AppContainer
      as="section"
      class="pb-20 md:pb-28"
      aria-label="Delivery summary"
    >
      <dl class="grid gap-6 border-y border-ivory/15 py-7 sm:grid-cols-3">
        <div
          v-for="metric in metrics"
          :key="metric.label"
          class="flex flex-col"
        >
          <dt class="order-2 mt-2 text-xs text-muted">{{ metric.label }}</dt>
          <dd class="order-1 font-display text-4xl md:text-5xl">
            {{ metric.value }}
          </dd>
        </div>
      </dl>
      <div class="mt-10"><RecordTable /></div>
    </AppContainer>
    <section class="bg-raised py-20 md:py-28" aria-labelledby="guarantees-heading">
      <AppContainer>
        <Eyebrow class="mb-5">Our guarantees</Eyebrow>
        <SectionTitle
          id="guarantees-heading"
          class="mb-10"
          :lines="[{ text: 'The terms we stand behind.' }]"
        />
        <ol class="grid gap-6 md:grid-cols-2">
          <li
            v-for="(guarantee, index) in guarantees"
            :key="guarantee.title"
            class="border-t border-ivory/15 pt-5"
          >
            <Eyebrow tone="sand">0{{ index + 1 }}</Eyebrow>
            <h3 class="mt-3 font-display text-2xl">{{ guarantee.title }}</h3>
            <p class="mt-2 text-sm text-muted">{{ guarantee.detail }}</p>
          </li>
        </ol>
      </AppContainer>
    </section>
  </div>
</template>
