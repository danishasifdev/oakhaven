<script setup lang="ts">
import { useSlots } from "vue";
import AppContainer from "./AppContainer.vue";
import Eyebrow from "./Eyebrow.vue";
import TitleReveal from "./TitleReveal.vue";
import ScrollFillText from "./ScrollFillText.vue";
import ScrollReveal from "./ScrollReveal.vue";

type Meta = { label: string; value: string };

// Pages can pass a full-bleed image, a custom background (the locations map),
// or fall back to the shared radial wash.
const slots = useSlots();
const hasBackground = !!slots.background;

withDefaults(
  defineProps<{
    eyebrow: string;
    title: string;
    lead?: string;
    image?: string;
    imageAlt?: string;
    meta?: ReadonlyArray<Meta>;
    imagePosition?: string;
  }>(),
  { imagePosition: "object-[65%_center]" },
);

// Breaks a title into reveal lines: separate sentences first, otherwise a
// balanced two-line split so the tile reveal slides clean rows.
const splitTitle = (title: string) => {
  const sentences = title.match(/[^.!?]+[.!?]+/g);
  if (sentences && sentences.length > 1)
    return sentences.map((sentence) => ({ text: sentence.trim() }));
  const words = title.split(" ");
  if (words.length < 4) return [{ text: title }];
  const midpoint = Math.ceil(words.length / 2);
  return [
    { text: words.slice(0, midpoint).join(" ") },
    { text: words.slice(midpoint).join(" ") },
  ];
};
</script>

<template>
  <header class="relative isolate overflow-hidden border-b border-ivory/10">
    <div v-if="image" class="absolute inset-0 -z-10">
      <img
        :src="image"
        :alt="imageAlt ?? ''"
        fetchpriority="high"
        class="size-full object-cover"
        :class="imagePosition"
      />
      <div
        class="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/25"
      />
      <div
        class="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/25 to-transparent"
      />
    </div>
    <div v-else-if="hasBackground" class="absolute inset-0 -z-10">
      <slot name="background" />
    </div>
    <div
      v-else
      class="absolute inset-0 -z-10 bg-[radial-gradient(120%_120%_at_80%_0%,var(--color-raised)_0%,var(--color-ink)_62%)]"
      aria-hidden="true"
    />

    <AppContainer
      class="flex min-h-[62svh] flex-col justify-end pb-12 pt-40 md:min-h-[68svh] md:pb-20 md:pt-56"
    >
      <Eyebrow class="mb-6 md:mb-8">{{ eyebrow }}</Eyebrow>
      <TitleReveal
        as="h1"
        class="max-w-5xl font-display text-[clamp(2.75rem,7vw,6.5rem)] font-light leading-[0.92]"
        :lines="splitTitle(title)"
      />
      <ScrollFillText
        v-if="lead"
        class="mt-6 max-w-xl text-sm leading-relaxed md:mt-8 md:text-base"
        :text="lead"
      />
      <dl
        v-if="meta?.length"
        class="mt-10 grid gap-6 border-t border-ivory/15 pt-6 sm:grid-cols-3 md:mt-14"
      >
        <ScrollReveal v-for="item in meta" :key="item.label">
          <dt class="text-[10px] uppercase tracking-[0.24em] text-muted">
            {{ item.label }}
          </dt>
          <dd class="mt-1 font-display text-2xl font-light md:text-3xl">
            {{ item.value }}
          </dd>
        </ScrollReveal>
      </dl>
    </AppContainer>
  </header>
</template>
