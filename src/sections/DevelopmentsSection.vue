<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, ref } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  projects,
  projectProgress,
  projectCurrentMilestone,
} from "../data/projects";
import StatusChip from "../components/StatusChip.vue";
import Eyebrow from "../components/Eyebrow.vue";
import SectionTitle from "../components/SectionTitle.vue";
import { useReducedMotion } from "../composables/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);
const root = ref<HTMLElement>();
const track = ref<HTMLElement>();
const reduced = useReducedMotion();
const cards = computed(() =>
  projects.map((project) => ({
    ...project,
    progress: projectProgress(project.milestones),
    currentMilestone: projectCurrentMilestone(project.milestones),
  })),
);
let ctx: gsap.Context | undefined;

onMounted(() => {
  if (reduced.value || !root.value || !track.value) return;
  // One behaviour at every width: the section pins and vertical scrolling
  // drives the row sideways, exactly as it does on desktop.
  ctx = gsap.context(() => {
    const distance = () =>
      Math.max(0, track.value!.scrollWidth - window.innerWidth);
    gsap.to(track.value!, {
      x: () => -distance(),
      ease: "none",
      scrollTrigger: {
        trigger: root.value,
        start: "top top",
        end: () => `+=${distance()}`,
        pin: true,
        scrub: true,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      },
    });
  }, root.value);
});

onBeforeUnmount(() => {
  ctx?.revert();
});
</script>

<template>
  <section
    id="developments"
    ref="root"
    class="developments-section h-svh overflow-hidden motion-reduce:snap-x motion-reduce:snap-mandatory motion-reduce:overflow-x-auto"
  >
    <div
      ref="track"
      class="developments-track flex h-full w-max flex-row items-center gap-4 px-6 md:gap-6 md:px-12"
    >
      <div
        class="developments-intro w-[84vw] shrink-0 pr-4 motion-reduce:snap-start md:w-[50vw] md:max-w-[50rem] md:pr-12"
      >
        <Eyebrow class="mb-6">02 · Building now</Eyebrow>
        <SectionTitle
          :lines="[{ text: 'Three developments.' }, { text: 'Three dates.' }]"
        />
        <p class="mt-6 max-w-sm text-sm text-muted">
          Follow each one from foundation to handover.
        </p>
      </div>

      <RouterLink
        v-for="(project, index) in cards"
        :key="project.slug"
        :to="`/developments/${project.slug}`"
        class="development-card group relative block h-[68svh] w-[84vw] min-h-0 shrink-0 overflow-hidden motion-reduce:snap-start md:h-[62svh] md:w-[52vw]"
      >
        <img
          :src="project.img"
          :alt="`${project.name} development`"
          loading="lazy"
          class="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
        <div
          class="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/15 to-ink/10"
        />
        <span
          class="absolute right-8 top-6 font-display text-6xl text-ivory/50"
          aria-hidden="true"
          >0{{ index + 1 }}</span
        >
        <div class="absolute inset-x-0 bottom-0 p-6 md:p-10">
          <StatusChip :status="project.status" />
          <h3 class="mt-4 font-display text-4xl font-light md:text-6xl">
            {{ project.name }}
          </h3>
          <p class="mt-2 text-sm text-ivory/90">
            {{ project.homes }} · Promised {{ project.promisedHandover }}
          </p>
          <div class="mt-5">
            <div class="flex justify-between gap-4 text-xs text-ivory/80">
              <span>{{ project.currentMilestone }}</span>
              <span>{{ project.progress }}%</span>
            </div>
            <div class="mt-2 h-px bg-ivory/30">
              <span
                class="block h-px bg-sand"
                :style="{ width: `${project.progress}%` }"
              />
            </div>
          </div>
        </div>
      </RouterLink>

      <RouterLink
        to="/developments"
        class="all-developments grid h-[68svh] w-[60vw] min-h-0 shrink-0 place-items-center motion-reduce:snap-start md:h-[72svh] md:w-[40vw] xl:w-[20vw]"
      >
        <span class="font-display text-3xl">All developments →</span>
      </RouterLink>
    </div>
  </section>
</template>
