<script setup lang="ts">
import PageHero from "../components/PageHero.vue";
import AppContainer from "../components/AppContainer.vue";
import ScrollReveal from "../components/ScrollReveal.vue";
import ScrollFillText from "../components/ScrollFillText.vue";
import Eyebrow from "../components/Eyebrow.vue";
import SectionTitle from "../components/SectionTitle.vue";
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
  "Atelier Rhein · Architecture",
  "Studio Maren · Architecture",
  "Northline · Engineering",
  "Meridian Structural · Engineering",
  "Fieldmark · Inspection",
];
</script>

<template>
  <div>
    <PageHero eyebrow="About" title="Built by people who stay until handover." />

    <AppContainer
      as="section"
      class="grid gap-10 pb-20 md:grid-cols-12 md:pb-32"
    >
      <ScrollReveal mask class="md:col-span-5">
        <img
          src="/img/philosophy.avif"
          alt="Concept image of a finished home interior"
          loading="lazy"
          class="aspect-[4/5] w-full object-cover"
        />
      </ScrollReveal>
      <ScrollReveal class="flex flex-col justify-center md:col-span-6 md:col-start-7">
        <Eyebrow class="mb-6">Our story</Eyebrow>
        <SectionTitle
          :lines="[
            { text: `Founded in ${company.founded} in ${company.foundedIn}.` },
          ]"
        />
        <ScrollFillText
          class="mt-8 text-sm leading-relaxed"
          text="The founder waited two years past a promised date for his first home. Oakhaven exists so buyers do not."
        />
        <p class="mt-5 text-xs text-muted">Fictional concept history.</p>
      </ScrollReveal>
    </AppContainer>

    <section class="bg-raised py-20 md:py-32">
      <AppContainer>
        <Eyebrow class="mb-10">How we work</Eyebrow>
        <div class="grid gap-10 md:grid-cols-3">
          <ScrollReveal
            v-for="(principle, index) in principles"
            :key="principle.title"
          >
            <Eyebrow tone="sand">0{{ index + 1 }}</Eyebrow>
            <h2 class="mt-4 font-display text-3xl md:text-4xl">
              {{ principle.title }}
            </h2>
            <p class="mt-4 text-sm leading-relaxed text-muted">
              {{ principle.copy }}
            </p>
          </ScrollReveal>
        </div>
      </AppContainer>
    </section>

    <AppContainer as="section" class="py-20 md:py-32">
      <Eyebrow class="mb-6">The team</Eyebrow>
      <SectionTitle :lines="[{ text: 'People who stay through handover.' }]" />
      <div class="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-4">
        <article v-for="person in team" :key="person.name">
          <div class="aspect-[4/5] overflow-hidden bg-raised">
            <img
              :src="person.image"
              alt=""
              loading="lazy"
              class="size-full object-cover grayscale transition-all duration-300 ease-in-out hover:scale-105 hover:grayscale-0"
            />
          </div>
          <h3 class="mt-4 font-display text-2xl">{{ person.name }}</h3>
          <p class="mt-1 text-xs text-muted">{{ person.role }}</p>
          <p class="mt-2 text-[10px] text-muted">Fictional concept profile.</p>
        </article>
      </div>
    </AppContainer>

    <section
      class="border-t border-ivory/10 py-16 md:py-20"
      aria-labelledby="partners-heading"
    >
      <AppContainer>
        <Eyebrow class="mb-6">Partners</Eyebrow>
        <h2 id="partners-heading" class="sr-only">Concept project partners</h2>
        <ul class="grid gap-5 text-sm text-muted sm:grid-cols-2 md:grid-cols-5">
          <li v-for="partner in partners" :key="partner">{{ partner }}</li>
        </ul>
        <p class="mt-6 text-xs text-muted">
          Fictional concept names. No partner endorsements are implied.
        </p>
      </AppContainer>
    </section>
  </div>
</template>
