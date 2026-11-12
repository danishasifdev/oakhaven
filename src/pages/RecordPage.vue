<script setup lang="ts">
import PageHero from '../components/PageHero.vue'
import TitleReveal from '../components/TitleReveal.vue'
import RecordTable from '../components/RecordTable.vue'
import { guarantees } from '../data/record'
import { metrics } from '../data/company'
</script>

<template>
  <div>
    <PageHero eyebrow="Delivery record" title="Every promise. Every date." lead="We publish the date we promised and the date we delivered." />
    <section class="mx-auto w-full max-w-[90rem] px-6 pb-20 md:px-12 md:pb-28" aria-label="Delivery summary">
      <dl class="grid gap-6 border-y border-ivory/15 py-7 sm:grid-cols-3">
        <div v-for="metric in metrics" :key="metric.label" class="flex flex-col">
          <dt class="order-2 mt-2 text-xs text-muted">{{ metric.label }}</dt>
          <dd class="order-1 font-display text-4xl md:text-5xl">{{ metric.value }}</dd>
        </div>
      </dl>
      <div class="mt-10"><RecordTable /></div>
    </section>
    <section class="bg-raised py-20 md:py-28" aria-labelledby="guarantees-heading">
      <div class="mx-auto w-full max-w-[90rem] px-6 md:px-12">
        <p class="eyebrow mb-5">Our guarantees</p>
        <TitleReveal as="h2" id="guarantees-heading" class="mb-10 font-display headline font-light" :lines="[{ text: 'The terms we stand behind.' }]" />
        <ol class="grid gap-6 md:grid-cols-2">
          <li v-for="(guarantee, index) in guarantees" :key="guarantee.title" class="border-t border-ivory/15 pt-5">
            <p class="eyebrow text-sand">0{{ index + 1 }}</p>
            <h3 class="mt-3 font-display text-2xl">{{ guarantee.title }}</h3>
            <p class="mt-2 text-sm text-muted">{{ guarantee.detail }}</p>
          </li>
        </ol>
      </div>
    </section>
  </div>
</template>
