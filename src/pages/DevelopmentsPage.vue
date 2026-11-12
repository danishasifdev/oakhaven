<script setup lang="ts">
import { computed, ref } from 'vue'
import PageHero from '../components/PageHero.vue'
import StatusChip from '../components/StatusChip.vue'
import { deliveredDevelopments } from '../data/record'
import { projects } from '../data/projects'

const filters = ['All', 'Delivered', 'Building', 'Planned'] as const
type Filter = typeof filters[number]
const activeFilter = ref<Filter>('All')
const deliveredImages = ['/img/facade.avif', '/img/maison.avif', '/img/residences.avif', '/img/philosophy.avif', '/img/solenne.avif', '/img/skyline.avif', '/img/tree.avif', '/img/wall.avif', '/img/map.jpg']
const entries = [
  ...deliveredDevelopments.map((item, index) => ({
    key: `delivered-${item.number}`,
    name: item.name,
    location: item.location,
    status: 'Delivered',
    promised: item.promised,
    delivered: item.delivered,
    image: deliveredImages[index],
    href: undefined,
  })),
  ...projects.map((project) => ({
    key: project.slug,
    name: project.name,
    location: project.place,
    status: 'Building',
    promised: project.promisedHandover,
    delivered: '',
    image: project.img,
    href: `/developments/${project.slug}`,
  })),
]
const visibleEntries = computed(() => activeFilter.value === 'All'
  ? entries
  : entries.filter((entry) => entry.status === activeFilter.value))
</script>

<template>
  <div>
    <PageHero eyebrow="Developments" title="Every development. One standard." />
    <section class="mx-auto w-full max-w-[90rem] px-6 pb-24 md:px-12 md:pb-32">
      <div class="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter developments">
        <button
          v-for="filter in filters"
          :key="filter"
          type="button"
          class="min-h-11 border px-5 text-xs transition-colors"
          :class="activeFilter === filter ? 'border-sand text-sand' : 'border-ivory/20 text-muted hover:text-ivory'"
          :aria-pressed="activeFilter === filter"
          @click="activeFilter = filter"
        >{{ filter }}</button>
      </div>

      <ul class="border-t border-ivory/15">
        <li v-for="(entry, index) in visibleEntries" :key="entry.key" class="border-b border-ivory/15">
          <component
            :is="entry.href ? 'RouterLink' : 'article'"
            :to="entry.href"
            class="development-row group relative grid items-center gap-4 py-6 md:grid-cols-12 md:gap-6"
          >
            <span class="font-display text-2xl text-muted md:col-span-1">{{ String(index + 1).padStart(2, '0') }}</span>
            <span class="font-display text-3xl font-light md:col-span-4 md:text-5xl">{{ entry.name }}</span>
            <span class="text-sm text-muted md:col-span-2">{{ entry.location }}</span>
            <span class="md:col-span-2"><StatusChip :status="entry.status" /></span>
            <span class="text-sm text-muted md:col-span-3">
              Promised {{ entry.promised }}<span v-if="entry.delivered"><br />Delivered {{ entry.delivered }}</span>
            </span>
            <img
              :src="entry.image"
              :alt="`${entry.name} development`"
              loading="lazy"
              class="development-thumbnail absolute right-0 top-1/2 z-10 hidden aspect-[16/10] w-48 -translate-y-1/2 object-cover opacity-0 transition-opacity duration-300 md:block"
            />
          </component>
        </li>
        <li v-if="visibleEntries.length === 0" class="py-12 text-sm text-muted">No developments in this category.</li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
@media (hover: hover) and (min-width: 768px) {
  .development-row:hover .development-thumbnail,
  .development-row:focus-visible .development-thumbnail { opacity: 1; }
}
@media (hover: none) {
  .development-thumbnail { display: block; position: static; width: 100%; transform: none; opacity: 1; }
}
</style>
