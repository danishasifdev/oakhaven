<script setup lang="ts">
import ScrollReveal from "./ScrollReveal.vue";
import StatusChip from "./StatusChip.vue";
import Eyebrow from "./Eyebrow.vue";

defineProps<{
  items: ReadonlyArray<{
    date: string;
    stage: string;
    status?: string;
    caption?: string;
    image?: string;
    alt?: string;
  }>;
}>();
</script>

<template>
  <ol class="relative space-y-16 border-l border-ivory/20 pl-8 md:pl-12">
    <li
      v-for="item in items"
      :key="`${item.date}-${item.stage}`"
      class="relative"
    >
      <span
        class="absolute -left-8 top-2 size-2 -translate-x-1/2 rounded-full bg-sand md:-left-12"
        aria-hidden="true"
      />
      <div
        class="grid items-start gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-10"
      >
        <ScrollReveal v-if="item.image" mask class="max-w-md">
          <img
            :src="item.image"
            :alt="item.alt ?? ''"
            loading="lazy"
            class="aspect-[4/3] w-full object-cover"
          />
        </ScrollReveal>
        <div>
          <Eyebrow tone="sand">{{ item.date }}</Eyebrow>
          <h3 class="mt-2 font-display text-2xl md:text-3xl">{{ item.stage }}</h3>
          <StatusChip v-if="item.status" class="mt-3" :status="item.status" />
          <p
            v-if="item.caption"
            class="mt-3 max-w-md text-sm leading-relaxed text-muted"
          >
            {{ item.caption }}
          </p>
        </div>
      </div>
    </li>
  </ol>
</template>
