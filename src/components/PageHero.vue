<script setup lang="ts">
import AppContainer from "./AppContainer.vue";
import Eyebrow from "./Eyebrow.vue";
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
  <AppContainer as="header" class="pb-16 pt-40 md:pb-24 md:pt-56">
    <Eyebrow class="mb-8">{{ eyebrow }}</Eyebrow>
    <TitleReveal
      as="h1"
      class="font-display text-[clamp(2.5rem,6vw,5.5rem)] font-light leading-[0.95]"
      :lines="splitTitle(title)"
    />
    <ScrollFillText
      v-if="lead"
      class="mt-10 max-w-xl leading-relaxed"
      :text="lead"
    />
  </AppContainer>
</template>
