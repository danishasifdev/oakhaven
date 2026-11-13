<script setup lang="ts">
import PageHero from "../components/PageHero.vue";
import AppContainer from "../components/AppContainer.vue";
import AppButton from "../components/AppButton.vue";
import Eyebrow from "../components/Eyebrow.vue";
import SectionTitle from "../components/SectionTitle.vue";
import StatBand from "../components/StatBand.vue";
import RecordTable from "../components/RecordTable.vue";
import { guarantees } from "../data/record";
import { metrics } from "../data/company";

const summary = [
  { ...metrics[0], note: "Every contract date met." },
  { ...metrics[1], note: "Across nine delivered developments." },
  { ...metrics[2], note: "Average across every handover." },
];

const heroMeta = [
  { label: "Handovers on time", value: metrics[0].value },
  { label: "Homes handed over", value: metrics[1].value },
  { label: "Average early delivery", value: metrics[2].value },
];
</script>

<template>
  <div>
    <PageHero
      eyebrow="Delivery record"
      title="Every promise. Every date."
      lead="We publish the date we promised and the date we delivered."
      image="/img/facade.avif"
      image-alt="Facade detail of a delivered Oakhaven development"
      :meta="heroMeta"
    />

    <AppContainer
      as="section"
      class="py-20 md:py-28"
      aria-label="Delivery summary"
    >
      <div class="grid gap-8 md:grid-cols-12">
        <div class="md:col-span-4">
          <Eyebrow class="mb-4">The record</Eyebrow>
          <SectionTitle
            :lines="[
              { text: 'Nine handovers.' },
              { text: 'Nine dates kept.', class: 'text-muted' },
            ]"
          />
        </div>
        <div class="md:col-span-7 md:col-start-6">
          <p class="max-w-xl text-sm leading-relaxed text-muted">
            Every date below is the one written into the contract. The delivered
            column is the date the keys were handed over. We publish both.
          </p>
        </div>
      </div>

      <StatBand class="mt-12 md:mt-16" :items="summary" />

      <div class="mt-12 md:mt-16">
        <RecordTable />
      </div>
      <p class="mt-6 text-xs text-muted">
        Based on contract dates and signed handover certificates. Fictional
        concept figures.
      </p>
    </AppContainer>

    <section
      class="bg-raised py-20 md:py-28"
      aria-labelledby="guarantees-heading"
    >
      <AppContainer>
        <div class="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow class="mb-4">Our guarantees</Eyebrow>
            <SectionTitle
              id="guarantees-heading"
              :lines="[
                { text: 'The terms we stand behind.' },
              ]"
            />
          </div>
          <p class="max-w-xs text-xs leading-relaxed text-muted">
            Every guarantee is written into the contract, not the brochure.
          </p>
        </div>

        <ol class="mt-12 grid gap-x-8 gap-y-10 md:grid-cols-2">
          <li
            v-for="(guarantee, index) in guarantees"
            :key="guarantee.title"
            class="grid grid-cols-[auto_1fr] gap-5 border-t border-ivory/15 pt-6"
          >
            <Eyebrow tone="sand" class="pt-1">0{{ index + 1 }}</Eyebrow>
            <div>
              <h3 class="font-display text-2xl font-light md:text-3xl">
                {{ guarantee.title }}
              </h3>
              <p class="mt-2 text-sm leading-relaxed text-muted">
                {{ guarantee.detail }}
              </p>
            </div>
          </li>
        </ol>
      </AppContainer>
    </section>

    <section class="relative overflow-hidden py-24 md:py-36">
      <img
        src="/img/skyline.avif"
        alt=""
        loading="lazy"
        class="absolute inset-0 size-full object-cover opacity-30"
      />
      <div class="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-ink/30" />
      <AppContainer class="relative">
        <Eyebrow class="mb-4">Next step</Eyebrow>
        <p class="max-w-3xl font-display text-4xl font-light md:text-6xl">
          See the dates for yourself.
        </p>
        <div class="mt-8 flex flex-wrap items-center gap-6">
          <AppButton to="/developments">Explore developments</AppButton>
          <AppButton to="/contact" variant="link">Request a viewing →</AppButton>
        </div>
      </AppContainer>
    </section>
  </div>
</template>
