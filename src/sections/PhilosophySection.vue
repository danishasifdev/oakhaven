<script setup lang="ts">
import ScrollReveal from "../components/ScrollReveal.vue";
import TitleReveal from "../components/TitleReveal.vue";
import ScrollFillText from "../components/ScrollFillText.vue";
</script>
<template>
  <section
    id="promise"
    class="mx-auto grid w-full max-w-[90rem] items-center gap-12 px-6 py-20 md:grid-cols-2 md:px-12 md:py-32"
  >
    <div class="md:col-span-1">
      <ScrollReveal><p class="eyebrow mb-8">01 · Our promise</p></ScrollReveal>
      <TitleReveal
        as="h2"
        class="font-display headline font-light"
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
        <RouterLink
          to="/record"
          class="mt-8 inline-flex min-h-11 items-center border-b border-sand pb-1 text-sm text-sand"
        >
          See the full record →
        </RouterLink>
      </ScrollReveal>
    </div>
    <ScrollReveal mask class="md:col-span-1">
      <img
        src="/img/skyline.avif"
        alt="City skyline at dusk"
        loading="lazy"
        class="aspect-[4/3] w-full object-contain md:aspect-[9/16]"
      />
    </ScrollReveal>
  </section>
</template>
