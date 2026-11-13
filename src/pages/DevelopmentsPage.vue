<script setup lang="ts">
import { computed, ref } from "vue";
import PageHero from "../components/PageHero.vue";
import AppContainer from "../components/AppContainer.vue";
import AppButton from "../components/AppButton.vue";
import StatusChip from "../components/StatusChip.vue";
import Eyebrow from "../components/Eyebrow.vue";
import SectionTitle from "../components/SectionTitle.vue";
import { deliveredDevelopments } from "../data/record";
import {
  projects,
  projectProgress,
  projectCurrentMilestone,
} from "../data/projects";
import { company } from "../data/company";

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

const counts = computed<Record<Filter, number>>(() => ({
  All: entries.length,
  Delivered: entries.filter((entry) => entry.status === "Delivered").length,
  Building: entries.filter((entry) => entry.status === "Building").length,
  Planned: entries.filter((entry) => entry.status === "Planned").length,
}));

// The three live projects get a larger card above the archive so the page
// opens on what is being built now, not only on history.
const featured = projects.map((project) => ({
  ...project,
  progress: projectProgress(project.milestones),
  milestone: projectCurrentMilestone(project.milestones),
}));

const heroMeta = [
  { label: "In progress", value: String(company.developmentsInProgress) },
  { label: "Delivered", value: String(company.deliveredDevelopments) },
  {
    label: "Homes handed over",
    value: company.homesHandedOver.toLocaleString("en-US"),
  },
];

const index = (value: number) => String(value).padStart(2, "0");
</script>

<template>
  <div>
    <PageHero
      eyebrow="Developments"
      title="Every development. One standard."
      lead="Three in progress. Nine delivered. One date written into every contract."
      image="/img/solenne.avif"
      image-alt="The Solenne rising above Palm Jumeirah"
      :meta="heroMeta"
    />

    <AppContainer
      as="section"
      class="py-20 md:py-28"
      aria-labelledby="building-heading"
    >
      <div class="flex flex-wrap items-end justify-between gap-6">
        <div>
          <Eyebrow class="mb-4">Building now</Eyebrow>
          <SectionTitle
            id="building-heading"
            :lines="[
              { text: 'Three developments.' },
              { text: 'Three dates.', class: 'text-muted' },
            ]"
          />
        </div>
        <AppButton to="/record" variant="link">
          See the delivery record →
        </AppButton>
      </div>

      <div class="mt-12 grid gap-6 md:grid-cols-3">
        <RouterLink
          v-for="(project, projectIndex) in featured"
          :key="project.slug"
          :to="`/developments/${project.slug}`"
          class="group block overflow-hidden border border-ivory/10 bg-raised"
        >
          <div class="relative aspect-[4/5] overflow-hidden">
            <img
              :src="project.img"
              :alt="`${project.name}, ${project.place}`"
              loading="lazy"
              class="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent"
            />
            <span
              class="absolute right-5 top-4 font-display text-5xl text-ivory/40"
              aria-hidden="true"
              >{{ index(projectIndex + 1) }}</span
            >
            <div class="absolute inset-x-5 bottom-5">
              <StatusChip :status="project.status" />
              <h3 class="mt-3 font-display text-4xl font-light">
                {{ project.name }}
              </h3>
              <p class="mt-1 text-sm text-ivory/80">
                {{ project.place }} · {{ project.homes }}
              </p>
              <p class="mt-3 text-xs text-sand">
                Promised {{ project.promisedHandover }}
              </p>
            </div>
          </div>
          <div class="p-5">
            <div class="flex justify-between gap-4 text-xs text-muted">
              <span>{{ project.milestone }}</span>
              <span>{{ project.progress }}%</span>
            </div>
            <div class="mt-3 h-px bg-ivory/20">
              <span
                class="block h-px bg-sand"
                :style="{ width: `${project.progress}%` }"
              />
            </div>
          </div>
        </RouterLink>
      </div>
    </AppContainer>

    <section class="bg-raised py-20 md:py-28" aria-labelledby="archive-heading">
      <AppContainer>
        <div class="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow class="mb-4">The archive</Eyebrow>
            <SectionTitle
              id="archive-heading"
              :lines="[
                { text: 'Every project.' },
                { text: 'Every date.', class: 'text-muted' },
              ]"
            />
          </div>
          <div
            class="flex flex-wrap gap-2"
            role="group"
            aria-label="Filter developments"
          >
            <button
              v-for="filter in filters"
              :key="filter"
              type="button"
              class="inline-flex min-h-11 items-center border px-4 text-[11px] uppercase tracking-[0.18em] transition-colors"
              :class="
                activeFilter === filter
                  ? 'border-sand bg-sand text-ink'
                  : 'border-ivory/20 text-muted hover:border-ivory/40 hover:text-ivory'
              "
              :aria-pressed="activeFilter === filter"
              @click="activeFilter = filter"
            >
              {{ filter }}
              <span class="ml-2 text-[10px] opacity-60">{{
                counts[filter]
              }}</span>
            </button>
          </div>
        </div>

        <ul class="mt-12 border-t border-ivory/15">
          <li
            v-for="(entry, entryIndex) in visibleEntries"
            :key="entry.key"
            class="border-b border-ivory/15"
          >
            <component
              :is="entry.href ? 'RouterLink' : 'article'"
              :to="entry.href"
              class="group grid items-center gap-5 py-6 md:grid-cols-12 md:gap-6"
            >
              <span
                class="font-display text-xl text-muted md:col-span-1"
                aria-hidden="true"
                >{{ index(entryIndex + 1) }}</span
              >
              <span class="flex items-center gap-5 md:col-span-4">
                <img
                  :src="entry.image"
                  :alt="`${entry.name}, ${entry.location}`"
                  loading="lazy"
                  class="h-16 w-20 shrink-0 object-cover transition-opacity duration-300 group-hover:opacity-80 md:h-20 md:w-28"
                />
                <span>
                  <span
                    class="block font-display text-3xl font-light transition-colors group-hover:text-sand md:text-4xl"
                    >{{ entry.name }}</span
                  >
                  <span class="mt-1 block text-xs text-muted md:hidden">{{
                    entry.location
                  }}</span>
                </span>
              </span>
              <span class="hidden text-sm text-muted md:col-span-2 md:block">{{
                entry.location
              }}</span>
              <span class="md:col-span-2">
                <StatusChip :status="entry.status" />
              </span>
              <span class="text-sm text-muted md:col-span-2">
                Promised {{ entry.promised
                }}<span v-if="entry.delivered" class="block"
                  >Delivered {{ entry.delivered }}</span
                >
              </span>
              <span class="hidden md:col-span-1 md:block md:text-right">
                <span
                  class="inline-grid size-11 place-items-center rounded-full border border-ivory/20 text-lg transition-colors group-hover:border-sand group-hover:text-sand"
                  aria-hidden="true"
                  >→</span
                >
              </span>
            </component>
          </li>
          <li
            v-if="visibleEntries.length === 0"
            class="py-12 text-sm text-muted"
          >
            No developments in this category.
          </li>
        </ul>
      </AppContainer>
    </section>

    <AppContainer as="section" class="py-20 md:py-28">
      <div
        class="grid items-center gap-8 border border-ivory/10 bg-raised p-6 md:grid-cols-2 md:p-12"
      >
        <div>
          <Eyebrow class="mb-4">The proof</Eyebrow>
          <p class="font-display text-4xl font-light md:text-5xl">
            Nine handovers. Nine dates kept.
          </p>
        </div>
        <div class="md:justify-self-end">
          <AppButton to="/record">See the full record</AppButton>
        </div>
      </div>
    </AppContainer>
  </div>
</template>
