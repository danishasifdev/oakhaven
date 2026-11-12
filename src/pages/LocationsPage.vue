<script setup lang="ts">
import PageHero from '../components/PageHero.vue'
import ScrollReveal from '../components/ScrollReveal.vue'
import StatusChip from '../components/StatusChip.vue'
import { locations } from '../data/locations'
</script>

<template>
  <div class="relative">
    <img src="/img/map.jpg" alt="" class="absolute right-0 top-0 h-[55svh] w-full object-cover opacity-30" />
    <div class="absolute inset-x-0 top-0 h-[55svh] bg-gradient-to-b from-transparent to-ink" />
    <div class="relative">
      <PageHero eyebrow="Locations" title="Eight destinations." />
      <section class="mx-auto w-full max-w-[90rem] px-6 pb-24 md:px-12 md:pb-32" aria-label="Development locations">
        <ul class="border-t border-ivory/15">
          <li v-for="(location, index) in locations" :key="location.name" class="border-b border-ivory/15">
            <ScrollReveal>
              <component
                :is="location.projectSlug ? 'RouterLink' : 'div'"
                :to="location.projectSlug ? `/developments/${location.projectSlug}` : undefined"
                class="grid min-h-24 items-center gap-3 py-5 md:grid-cols-12 md:gap-5"
              >
                <span class="font-display text-xl text-muted md:col-span-1">{{ String(index + 1).padStart(2, '0') }}</span>
                <span class="font-display text-3xl md:col-span-4 md:text-4xl">{{ location.name }}</span>
                <span class="text-sm text-muted md:col-span-2">{{ location.region }}</span>
                <span class="md:col-span-2"><StatusChip :status="location.status" /></span>
                <span class="text-sm text-muted md:col-span-3">{{ location.homes }}</span>
              </component>
            </ScrollReveal>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>
