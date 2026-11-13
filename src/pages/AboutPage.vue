<script setup lang="ts">
import PageHero from "../components/PageHero.vue";
import AppContainer from "../components/AppContainer.vue";
import AppButton from "../components/AppButton.vue";
import ScrollReveal from "../components/ScrollReveal.vue";
import ScrollFillText from "../components/ScrollFillText.vue";
import Eyebrow from "../components/Eyebrow.vue";
import SectionTitle from "../components/SectionTitle.vue";
import StatBand from "../components/StatBand.vue";
import { team } from "../data/team";
import { company } from "../data/company";

const principles = [
  {
    title: "Date first.",
    copy: "The handover date is written into the contract. Early, or we pay.",
  },
  {
    title: "Show the work.",
    copy: "Buyers receive monthly photo and video reports. Material swaps need written approval.",
  },
  {
    title: "Stay after handover.",
    copy: "A named customer care contact stays with each buyer through year two. Structural and fit out warranties are in place.",
  },
];

const partners = [
  { name: "Atelier Rhein", discipline: "Architecture" },
  { name: "Studio Maren", discipline: "Architecture" },
  { name: "Northline", discipline: "Engineering" },
  { name: "Meridian Structural", discipline: "Engineering" },
  { name: "Fieldmark", discipline: "Inspection" },
];

const facts = [
  { value: String(company.founded), label: "Founded" },
  { value: String(company.developments), label: "Developments" },
  {
    value: company.homesHandedOver.toLocaleString("en-US"),
    label: "Homes handed over",
  },
  { value: String(company.destinations), label: "Destinations" },
];

const heroMeta = [
  {
    label: "Founded",
    value: `${company.founded} · ${company.foundedIn}`,
  },
  { label: "Developments", value: String(company.developments) },
  {
    label: "Homes handed over",
    value: company.homesHandedOver.toLocaleString("en-US"),
  },
];
</script>

<template>
  <div>
    <PageHero
      eyebrow="About"
      title="Built by people who stay until handover."
      lead="A developer measured by one thing: the date written into the contract."
      image="/img/philosophy.avif"
      image-alt="Concept image of a finished Oakhaven home interior"
      :meta="heroMeta"
    />

    <AppContainer
      as="section"
      class="grid gap-10 py-20 md:grid-cols-12 md:py-28"
    >
      <ScrollReveal mask class="md:col-span-5">
        <img
          src="/img/tree.avif"
          alt="Concept image of a landscaped residential courtyard"
          loading="lazy"
          class="aspect-[4/5] w-full object-cover"
        />
      </ScrollReveal>
      <div
        class="flex flex-col justify-center md:col-span-6 md:col-start-7"
      >
        <Eyebrow class="mb-6">Our story</Eyebrow>
        <SectionTitle
          :lines="[
            { text: `Founded in ${company.founded} in ${company.foundedIn}.` },
          ]"
        />
        <ScrollFillText
          class="mt-8 max-w-xl text-sm leading-relaxed md:text-base"
          text="The founder waited two years past a promised date for his first home. Oakhaven exists so buyers do not."
        />
        <p class="mt-5 text-xs text-muted">Fictional concept history.</p>
      </div>
      <div class="md:col-span-12">
        <StatBand class="mt-4" :columns="4" :items="facts" />
      </div>
    </AppContainer>

    <section class="bg-raised py-20 md:py-28">
      <AppContainer>
        <div class="grid gap-8 md:grid-cols-12">
          <Eyebrow class="md:col-span-3">The rule</Eyebrow>
          <p
            class="font-display text-4xl font-light leading-[1.05] md:col-span-8 md:col-start-5 md:text-6xl"
          >
            We promise a date. And we hand over on it.
          </p>
        </div>
      </AppContainer>
    </section>

    <AppContainer as="section" class="py-20 md:py-28">
      <div class="flex flex-wrap items-end justify-between gap-6">
        <div>
          <Eyebrow class="mb-4">How we work</Eyebrow>
          <SectionTitle
            :lines="[
              { text: 'Three rules.' },
              { text: 'No exceptions.', class: 'text-muted' },
            ]"
          />
        </div>
        <AppButton to="/record" variant="link">
          See the full record →
        </AppButton>
      </div>

      <ol class="mt-12 border-t border-ivory/15">
        <li
          v-for="(principle, index) in principles"
          :key="principle.title"
          class="grid gap-4 border-b border-ivory/15 py-8 md:grid-cols-12 md:gap-6"
        >
          <Eyebrow tone="sand" class="md:col-span-1">0{{ index + 1 }}</Eyebrow>
          <h3
            class="font-display text-3xl font-light md:col-span-4 md:text-4xl"
          >
            {{ principle.title }}
          </h3>
          <p
            class="max-w-xl text-sm leading-relaxed text-muted md:col-span-6 md:col-start-7"
          >
            {{ principle.copy }}
          </p>
        </li>
      </ol>
    </AppContainer>

    <section class="bg-raised py-20 md:py-28">
      <AppContainer>
        <div class="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow class="mb-4">The team</Eyebrow>
            <SectionTitle
              :lines="[{ text: 'People who stay through handover.' }]"
            />
          </div>
          <p class="max-w-xs text-xs leading-relaxed text-muted">
            A named contact from signing through year two.
          </p>
        </div>

        <div class="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-4">
          <article v-for="person in team" :key="person.name" class="group">
            <div class="relative aspect-[4/5] overflow-hidden bg-ink">
              <img
                :src="person.image"
                alt=""
                loading="lazy"
                class="size-full object-cover grayscale transition-all duration-500 ease-out group-hover:scale-[1.03] group-hover:grayscale-0"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent"
              />
            </div>
            <h3 class="mt-4 font-display text-2xl">{{ person.name }}</h3>
            <p class="mt-1 text-xs text-muted">{{ person.role }}</p>
            <p class="mt-2 text-[10px] text-muted">Fictional concept profile.</p>
          </article>
        </div>
      </AppContainer>
    </section>

    <AppContainer as="section" class="py-20 md:py-28">
      <Eyebrow class="mb-4">Partners</Eyebrow>
      <h2 class="sr-only">Concept project partners</h2>
      <ul
        class="mt-8 grid border-t border-ivory/15 sm:grid-cols-2 md:grid-cols-5"
      >
        <li
          v-for="partner in partners"
          :key="partner.name"
          class="border-b border-ivory/15 py-5 sm:border-r sm:pr-5 md:border-b-0"
        >
          <span class="block font-display text-xl">{{ partner.name }}</span>
          <span
            class="mt-1 block text-[10px] uppercase tracking-[0.2em] text-muted"
            >{{ partner.discipline }}</span
          >
        </li>
      </ul>
      <p class="mt-6 text-xs text-muted">
        Fictional concept names. No partner endorsements are implied.
      </p>
    </AppContainer>
  </div>
</template>
