<script setup lang="ts">
import TitleReveal from "./TitleReveal.vue";
import ScrollFillText from "./ScrollFillText.vue";

defineProps<{ eyebrow: string; title: string; lead?: string }>();

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
  <header
    class="mx-auto w-full max-w-[90rem] px-6 pt-40 pb-16 md:px-12 md:pt-56 md:pb-24"
  >
    <p class="eyebrow mb-8">{{ eyebrow }}</p>
    <TitleReveal
      as="h1"
      class="font-display font-light text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95]"
      :lines="splitTitle(title)"
    />
    <ScrollFillText
      v-if="lead"
      class="mt-10 max-w-xl leading-relaxed"
      :text="lead"
    />
  </header>
</template>
