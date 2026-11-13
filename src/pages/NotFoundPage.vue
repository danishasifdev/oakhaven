<script setup lang="ts">
import AppContainer from "../components/AppContainer.vue";
import AppButton from "../components/AppButton.vue";
import Eyebrow from "../components/Eyebrow.vue";
</script>

<template>
  <section
    class="relative isolate flex min-h-svh items-end overflow-hidden pb-16 pt-40 md:pb-24"
  >
    <img
      src="/img/wall.avif"
      alt=""
      class="absolute inset-0 -z-10 size-full object-cover opacity-30"
    />
    <div
      class="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/80 to-ink/40"
    />
    <div
      class="absolute inset-0 -z-10 bg-gradient-to-r from-ink/80 via-transparent to-transparent"
    />

    <AppContainer>
      <Eyebrow class="mb-6">Error 404</Eyebrow>
      <p
        class="font-display text-[clamp(7rem,28vw,22rem)] font-light leading-[0.78] text-ivory"
        aria-hidden="true"
      >
        404
      </p>
      <div
        class="mt-10 grid gap-8 border-t border-ivory/15 pt-8 md:grid-cols-12"
      >
        <h1
          class="font-display text-4xl font-light leading-[1.02] md:col-span-6 md:text-6xl"
        >
          This page has not been handed over.
        </h1>
        <div class="md:col-span-5 md:col-start-8">
          <p class="max-w-sm text-sm leading-relaxed text-muted">
            The address may have moved, or the page was never built. Start from
            one of these instead.
          </p>
          <div class="mt-7 flex flex-wrap gap-5">
            <AppButton to="/">Return home</AppButton>
            <AppButton to="/developments" variant="outline">
              View developments
            </AppButton>
          </div>
        </div>
      </div>
    </AppContainer>
  </section>
</template>
