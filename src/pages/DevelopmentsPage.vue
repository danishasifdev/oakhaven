<script setup lang="ts">
import { computed, ref } from "vue";
import PageHero from "../components/PageHero.vue";
import AppContainer from "../components/AppContainer.vue";
import StatusChip from "../components/StatusChip.vue";
import { deliveredDevelopments } from "../data/record";
import { projects } from "../data/projects";

const filters = ["All", "Delivered", "Building", "Planned"] as const;
type Filter = (typeof filters)[number];
const activeFilter = ref<Filter>("All");

const entries = [
  ...deliveredDevelopments.map((item) => ({
    key: `delivered-${item.number}`,
    name: item.name,
    location: item.location,
    status: "Delivered",
    promised: item.promised,
    delivered: item.delivered,
    image: item.image,
    href: undefined,
  })),
  ...projects.map((project) => ({
    key: project.slug,
    name: project.name,
    location: project.place,
    status: "Building",
    promised: project.promisedHandover,
    delivered: "",
    image: project.img,
    href: `/developments/${project.slug}`,
  })),
];

const visibleEntries = computed(() =>
  activeFilter.value === "All"
    ? entries
    : entries.filter((entry) => entry.status === activeFilter.value),
);
</script>

<template>
  <div>
    <PageHero eyebrow="Developments" title="Every development. One standard." />
    <AppContainer as="section" class="pb-24 md:pb-32">
      <div
        class="mb-8 flex flex-wrap gap-2"
        role="group"
        aria-label="Filter developments"
      >
        <button
          v-for="filter in filters"
          :key="filter"
          type="button"
          class="min-h-11 border px-5 text-xs transition-colors"
          :class="
            activeFilter === filter
              ? 'border-sand text-sand'
              : 'border-ivory/20 text-muted hover:text-ivory'
          "
          :aria-pressed="activeFilter === filter"
          @click="activeFilter = filter"
        >
          {{ filter }}
        </button>
      </div>

      <ul class="border-t border-ivory/15">
        <li
          v-for="(entry, index) in visibleEntries"
          :key="entry.key"
          class="border-b border-ivory/15"
        >
          <component
            :is="entry.href ? 'RouterLink' : 'article'"
            :to="entry.href"
            class="group relative grid items-center gap-4 py-6 md:grid-cols-12 md:gap-6"
          >
            <span class="font-display text-2xl text-muted md:col-span-1">
              {{ String(index + 1).padStart(2, "0") }}
            </span>
            <span class="font-display text-3xl font-light md:col-span-4 md:text-5xl">
              {{ entry.name }}
            </span>
            <span class="text-sm text-muted md:col-span-2">
              {{ entry.location }}
            </span>
            <span class="md:col-span-2"><StatusChip :status="entry.status" /></span>
            <span class="text-sm text-muted md:col-span-3">
              Promised {{ entry.promised
              }}<span v-if="entry.delivered"><br />Delivered {{ entry.delivered }}</span>
            </span>
            <img
              :src="entry.image"
              :alt="`${entry.name} development`"
              loading="lazy"
              class="mt-2 aspect-[16/10] w-full object-cover md:absolute md:right-0 md:top-1/2 md:z-10 md:mt-0 md:w-48 md:-translate-y-1/2 md:opacity-0 md:transition-opacity md:duration-300 md:group-hover:opacity-100 md:group-focus-visible:opacity-100"
            />
          </component>
        </li>
        <li v-if="visibleEntries.length === 0" class="py-12 text-sm text-muted">
          No developments in this category.
        </li>
      </ul>
    </AppContainer>
  </div>
</template>
