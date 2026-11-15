<script setup lang="ts">
import { computed, ref } from "vue";
import PageHero from "../components/PageHero.vue";
import AppContainer from "../components/AppContainer.vue";
import AppButton from "../components/AppButton.vue";
import ScrollReveal from "../components/ScrollReveal.vue";
import StatusChip from "../components/StatusChip.vue";
import Eyebrow from "../components/Eyebrow.vue";
import SectionTitle from "../components/SectionTitle.vue";
import LocationMap from "../components/LocationMap.vue";
import { locations } from "../data/locations";

const active = ref<string>(locations[0].name);
const countByStatus = (status: string) =>
  locations.filter((location) => location.status === status).length;

const heroMeta = [
  { label: "Destinations", value: String(locations.length) },
  { label: "In progress", value: String(countByStatus("Building")) },
  { label: "Delivered", value: String(countByStatus("Delivered")) },
];

// The same eight places grouped by region, so the page answers "where do you
// build?" before the full list does.
const regionSummary = computed(() =>
  Object.entries(
    locations.reduce<
      Record<
        string,
        { total: number; delivered: number; building: number; planned: number }
      >
    >((summary, location) => {
      const entry = (summary[location.region] ??= {
        total: 0,
        delivered: 0,
        building: 0,
        planned: 0,
      });
      entry.total += 1;
      if (location.status === "Delivered") entry.delivered += 1;
      if (location.status === "Building") entry.building += 1;
      if (location.status === "Planned") entry.planned += 1;
      return summary;
    }, {}),
  ).map(([region, counts]) => ({ region, ...counts })),
);

const index = (value: number) => String(value).padStart(2, "0");
</script>

<template>
  <div>
    <PageHero
      eyebrow="Locations"
      title="Eight destinations."
      lead="Nine delivered communities and three in progress across the UAE and the wider Gulf."
      :meta="heroMeta"
    >
      <template #background>
        <LocationMap
          :markers="false"
          fit="slice"
          class="size-full opacity-50"
        />
        <div
          class="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/35"
        />
        <div
          class="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/30 to-transparent"
        />
      </template>
    </PageHero>

    <AppContainer
      as="section"
      class="py-16 md:py-20"
      aria-label="Destinations by region"
    >
      <div class="flex flex-wrap items-end justify-between gap-4">
        <Eyebrow>By region</Eyebrow>
        <p class="max-w-md text-xs leading-relaxed text-muted">
          One standard of delivery, from Palm Jumeirah to the Red Sea.
        </p>
      </div>
      <dl
        class="mt-8 grid gap-px border border-ivory/10 bg-ivory/10 sm:grid-cols-2 lg:grid-cols-5"
      >
        <div
          v-for="(region, index) in regionSummary"
          :key="region.region"
          class="bg-ink p-5"
        >
          <ScrollReveal mask :delay="index * 0.08">
            <dt class="font-display text-2xl font-light">
              {{ region.region }}
            </dt>
            <dd class="mt-2 text-xs leading-relaxed text-muted">
              {{ region.total }} destination{{ region.total === 1 ? "" : "s" }}
              <span class="block text-[10px] text-sand">
                {{ region.delivered }} delivered<template
                  v-if="region.building"
                >
                  · {{ region.building }} building</template
                ><template v-if="region.planned">
                  · {{ region.planned }} planned</template
                >
              </span>
            </dd>
          </ScrollReveal>
        </div>
      </dl>
    </AppContainer>

    <AppContainer
      as="section"
      class="pb-20 md:pb-32"
      aria-label="Development locations"
    >
      <div class="grid gap-12 md:grid-cols-12 md:gap-10">
        <div class="md:col-span-5">
          <div class="md:sticky md:top-24">
            <LocationMap
              :active="active"
              class="h-[52svh] w-full border border-ivory/10 bg-raised/40 md:h-[68vh]"
            />
            <div
              class="mt-4 flex flex-wrap items-baseline justify-between gap-2 border-t border-ivory/15 pt-4"
            >
              <Eyebrow>Active destination</Eyebrow>
              <p class="font-display text-2xl font-light text-sand">
                {{ active }}
              </p>
            </div>
            <p class="mt-2 text-xs text-muted">
              Hover or focus a location to place it on the map.
            </p>
          </div>
        </div>

        <div class="md:col-span-6 md:col-start-7">
          <Eyebrow class="mb-4">The list</Eyebrow>
          <SectionTitle
            :lines="[
              { text: 'Where we build.' },
              { text: 'And what is there.', class: 'text-muted' },
            ]"
          />

          <ul class="mt-10 border-t border-ivory/15">
            <li
              v-for="(location, locationIndex) in locations"
              :key="location.name"
              class="border-b border-ivory/15"
              @mouseenter="active = location.name"
              @focusin="active = location.name"
            >
              <ScrollReveal>
                <component
                  :is="location.projectSlug ? 'RouterLink' : 'div'"
                  :to="
                    location.projectSlug
                      ? `/developments/${location.projectSlug}`
                      : undefined
                  "
                  class="group relative grid gap-3 px-4 py-6 pr-16 transition-colors xl:grid-cols-12 xl:items-center xl:gap-5"
                  :class="
                    active === location.name
                      ? 'bg-sand/[0.06]'
                      : 'hover:bg-ivory/[0.03]'
                  "
                >
                  <span class="xl:col-span-5">
                    <span class="flex items-baseline gap-4">
                      <span
                        class="font-display text-lg transition-colors"
                        :class="
                          active === location.name ? 'text-sand' : 'text-muted'
                        "
                        aria-hidden="true"
                        >{{ index(locationIndex + 1) }}</span
                      >
                      <span
                        class="block font-display text-3xl font-light transition-colors xl:text-4xl"
                        :class="
                          active === location.name ? 'text-sand' : 'text-ivory'
                        "
                        >{{ location.name }}</span
                      >
                    </span>
                    <span class="mt-1 block text-xs text-muted xl:hidden">{{
                      location.region
                    }}</span>
                  </span>
                  <span
                    class="hidden text-sm text-muted xl:col-span-2 xl:block"
                    >{{ location.region }}</span
                  >
                  <span class="xl:col-span-3">
                    <StatusChip :status="location.status" />
                  </span>
                  <span class="text-sm text-muted xl:col-span-2">{{
                    location.homes
                  }}</span>
                  <span
                    v-if="location.projectSlug"
                    class="absolute right-4 top-6 xl:top-1/2 xl:-translate-y-1/2"
                  >
                    <span
                      class="inline-grid size-10 place-items-center rounded-full border border-ivory/20 text-lg transition-colors group-hover:border-sand group-hover:text-sand"
                      aria-hidden="true"
                      >→</span
                    >
                  </span>
                </component>
              </ScrollReveal>
            </li>
          </ul>
        </div>
      </div>
    </AppContainer>

    <AppContainer as="section" class="pb-24 md:pb-32">
      <div
        class="grid items-center gap-8 border border-ivory/10 bg-raised p-6 md:grid-cols-2 md:p-12"
      >
        <div>
          <Eyebrow class="mb-4">Next step</Eyebrow>
          <p class="font-display text-4xl font-light md:text-5xl">
            Visit the place before you choose the home.
          </p>
        </div>
        <div class="flex flex-wrap gap-5 md:justify-self-end">
          <AppButton to="/contact">Arrange a visit</AppButton>
          <AppButton to="/developments" variant="link">
            Explore developments →
          </AppButton>
        </div>
      </div>
    </AppContainer>
  </div>
</template>
