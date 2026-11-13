<script setup lang="ts">
import ScrollReveal from "../components/ScrollReveal.vue";
import ScrollFillText from "../components/ScrollFillText.vue";
import AppContainer from "../components/AppContainer.vue";
import AppButton from "../components/AppButton.vue";
import Eyebrow from "../components/Eyebrow.vue";
import SectionTitle from "../components/SectionTitle.vue";
</script>

<template>
  <AppContainer
    as="section"
    id="promise"
    class="grid items-center gap-12 py-20 md:grid-cols-2 md:py-32"
  >
    <div class="md:col-span-1">
      <ScrollReveal><Eyebrow class="mb-8">01 · Our promise</Eyebrow></ScrollReveal>
      <SectionTitle
        :lines="[
          { text: 'We promise a date.' },
          { text: 'And we hand over on it.', class: 'text-muted' },
        ]"
      />
      <ScrollFillText
        class="mt-8 max-w-md text-sm leading-relaxed"
        text="Every VÉRÉN contract names a handover date. Nine times we have reached it early. We publish every date we promised next to the date we delivered."
      />
      <ScrollReveal :delay="0.2">
        <AppButton to="/record" variant="link" class="mt-8">
          See the full record →
        </AppButton>
      </ScrollReveal>
    </div>
    <ScrollReveal mask class="md:col-span-1">
      <img
        src="/img/skyline.avif"
        alt="City skyline at dusk"
        loading="lazy"
        class="aspect-[4/3] w-full object-cover md:aspect-[4/5]"
      />
    </ScrollReveal>
  </AppContainer>
</template>
