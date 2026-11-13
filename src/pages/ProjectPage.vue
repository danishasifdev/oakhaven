<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from "vue";
import { useRoute } from "vue-router";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageHero from "../components/PageHero.vue";
import AppContainer from "../components/AppContainer.vue";
import AppButton from "../components/AppButton.vue";
import ScrollReveal from "../components/ScrollReveal.vue";
import ScrollFillText from "../components/ScrollFillText.vue";
import Eyebrow from "../components/Eyebrow.vue";
import SectionTitle from "../components/SectionTitle.vue";
import TitleReveal from "../components/TitleReveal.vue";
import StatusChip from "../components/StatusChip.vue";
import FormField from "../components/FormField.vue";
import Timeline from "../components/Timeline.vue";
import { projects } from "../data/projects";
import { useReducedMotion } from "../composables/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);
const route = useRoute();
const projectIndex = projects.findIndex((item) => item.slug === route.params.slug);
const project = projects[projectIndex];
const nextProject = projects[(projectIndex + 1) % projects.length];
const root = ref<HTMLElement>();
const reduced = useReducedMotion();
const sent = ref(false);
const today = new Date();
const milestoneDate = (value: string) => {
  const [month, year] = value.split(" ");
  return new Date(Number(year), new Date(`${month} 1, 2000`).getMonth(), 1);
};
const currentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
const currentMilestoneIndex = project.milestones.reduce(
  (latest, milestone, index) =>
    milestoneDate(milestone.date) <= currentMonth ? index : latest,
  -1,
);
const milestoneStatus = (index: number) =>
  index < currentMilestoneIndex
    ? "Complete"
    : index === currentMilestoneIndex
      ? "In progress"
      : "Upcoming";
const milestoneCaption = (index: number) => {
  const milestone = project.milestones[index];
  if (milestoneStatus(index) === "Complete")
    return `Completed in ${milestone.date}.`;
  if (milestoneStatus(index) === "In progress")
    return `Under way. Promised handover ${project.promisedHandover}.`;
  return `Planned for ${milestone.date}.`;
};
const timelineItems = project.milestones.map((milestone, index) => ({
  date: milestone.date,
  stage: milestone.stage,
  status: milestoneStatus(index),
  caption: milestoneCaption(index),
  image: milestone.image,
  alt: `${project.name} construction milestone: ${milestone.stage}`,
}));
// Concept copy: the monthly updates below are composed from the milestone
// dates and guarantees in the content brief. No dates beyond those are stated.
const progressReports = project.milestones
  .map((milestone, index) => ({ milestone, index }))
  .filter(({ milestone }) => milestoneDate(milestone.date) <= currentMonth)
  .slice(-3)
  .reverse()
  .map(({ milestone, index }) => {
    const next = project.milestones[index + 1];
    return {
      image: milestone.image,
      alt: `${project.name} progress update: ${milestone.stage}`,
      date: milestone.date,
      stage: milestone.stage,
      lines: [
        "Photos and video from site sent to every buyer.",
        next
          ? `Next milestone: ${next.stage}, ${next.date}.`
          : `Promised handover: ${project.promisedHandover}.`,
      ],
    };
  });
const galleryImages = ["/img/wall.avif", "/img/tree.avif", "/img/skyline.avif"];
const viewingFields = [
  {
    id: "viewing-name",
    label: "Name",
    type: "text",
    autocomplete: "name",
  },
  {
    id: "viewing-email",
    label: "Email",
    type: "email",
    autocomplete: "email",
  },
];
let ctx: gsap.Context | undefined;

onMounted(() => {
  if (reduced.value || !root.value) return;
  ctx = gsap.context(() => {
    gsap.to(".project-parallax", {
      yPercent: 12,
      ease: "none",
      scrollTrigger: {
        trigger: ".project-hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }, root.value);
});

onBeforeUnmount(() => ctx?.revert());
</script>

<template>
  <div ref="root">
    <section class="project-hero relative h-svh overflow-hidden">
      <img
        :src="project.img"
        :alt="`${project.name}, ${project.place}`"
        class="project-parallax absolute inset-x-0 -top-[8%] h-[116%] w-full object-cover"
        fetchpriority="high"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-ink/30" />
      <AppContainer class="absolute inset-x-0 bottom-0 pb-12 md:pb-16">
        <Eyebrow class="mb-4">{{ project.place }}</Eyebrow>
        <StatusChip :status="project.status" />
        <TitleReveal
          as="h1"
          class="mt-5 font-display text-[clamp(3.5rem,12vw,11rem)] font-light leading-[0.9]"
          :lines="[{ text: project.name }]"
        />
      </AppContainer>
    </section>

    <AppContainer
      as="section"
      class="grid gap-12 py-20 md:grid-cols-12 md:py-28"
      aria-labelledby="project-facts-heading"
    >
      <div class="md:col-span-6">
        <Eyebrow class="mb-5">Project facts</Eyebrow>
        <SectionTitle id="project-facts-heading" :lines="[{ text: project.name }]" />
        <ScrollFillText
          v-if="project.features"
          class="mt-6 max-w-xl text-sm leading-relaxed"
          :text="project.features"
        />
      </div>
      <dl class="divide-y divide-ivory/10 text-sm md:col-span-5 md:col-start-8">
        <div
          v-for="(value, label) in project.facts"
          :key="label"
          class="flex justify-between gap-6 py-4"
        >
          <dt class="text-muted">{{ label }}</dt>
          <dd class="text-right">{{ value }}</dd>
        </div>
      </dl>
    </AppContainer>

    <section class="bg-raised py-20 md:py-28" aria-labelledby="timeline-heading">
      <AppContainer>
        <Eyebrow class="mb-5">Construction milestones</Eyebrow>
        <SectionTitle
          id="timeline-heading"
          class="mb-12"
          :lines="[{ text: 'Build timeline.' }]"
        />
        <Timeline :items="timelineItems" />
      </AppContainer>
    </section>

    <AppContainer
      as="section"
      class="py-20 md:py-28"
      aria-labelledby="promise-reality-heading"
    >
      <Eyebrow class="mb-5">Delivery status</Eyebrow>
      <SectionTitle
        id="promise-reality-heading"
        class="mb-8"
        :lines="[{ text: 'Promise versus reality.' }]"
      />
      <dl class="grid gap-0 border-y border-ivory/15 text-sm sm:grid-cols-3">
        <div class="py-5 sm:border-r sm:border-ivory/15 sm:pr-5">
          <dt class="text-muted">Promised handover</dt>
          <dd class="mt-2">{{ project.promisedHandover }}</dd>
        </div>
        <div class="border-t border-ivory/15 py-5 sm:border-r sm:border-t-0 sm:px-5">
          <dt class="text-muted">Current forecast</dt>
          <dd class="mt-2">Not provided</dd>
        </div>
        <div class="border-t border-ivory/15 py-5 sm:border-t-0 sm:pl-5">
          <dt class="text-muted">Days ahead of schedule</dt>
          <dd class="mt-2">Not provided</dd>
        </div>
      </dl>
      <p class="mt-4 text-xs text-muted">
        Forecast and schedule variance were not included in the concept data.
      </p>
    </AppContainer>

    <section class="bg-raised py-20 md:py-28" aria-labelledby="reports-heading">
      <AppContainer>
        <Eyebrow class="mb-5">Buyer updates</Eyebrow>
        <SectionTitle
          id="reports-heading"
          :lines="[{ text: 'Progress report archive.' }]"
        />
        <div class="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          <article
            v-for="report in progressReports"
            :key="`${report.date}-${report.stage}`"
          >
            <ScrollReveal mask>
              <img
                :src="report.image"
                :alt="report.alt"
                loading="lazy"
                class="aspect-[4/3] w-full object-cover"
              />
            </ScrollReveal>
            <Eyebrow tone="sand" class="mt-5">{{ report.date }}</Eyebrow>
            <h3 class="mt-2 font-display text-2xl">{{ report.stage }}</h3>
            <p class="mt-3 text-sm leading-relaxed text-muted">
              {{ report.lines[0] }}<br />{{ report.lines[1] }}
            </p>
          </article>
        </div>
        <p class="mt-10 text-xs text-muted">
          Updates shown are drawn from the construction milestones.
        </p>
      </AppContainer>
    </section>

    <AppContainer
      as="section"
      class="py-20 md:py-28"
      aria-labelledby="residences-heading"
    >
      <div class="grid items-center gap-10 md:grid-cols-2">
        <div>
          <Eyebrow class="mb-5">Residences</Eyebrow>
          <SectionTitle
            id="residences-heading"
            :lines="[{ text: 'Home types.' }]"
          />
          <ul class="mt-8 border-y border-ivory/15">
            <li
              v-for="homeType in project.homeTypes"
              :key="homeType.type"
              class="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-ivory/15 py-4 last:border-b-0"
            >
              <span class="font-display text-xl">{{ homeType.type }}</span>
              <span class="text-sm text-muted">
                {{ homeType.homes
                }}{{ homeType.detail ? ` · ${homeType.detail}` : "" }}
              </span>
            </li>
          </ul>
          <p class="mt-4 text-xs text-muted">
            Home size ranges were not included in the concept data.
          </p>
        </div>
        <figure>
          <ScrollReveal mask>
            <img
              src="/img/wall.avif"
              :alt="`${project.name} floor plan placeholder`"
              loading="lazy"
              class="aspect-[4/3] w-full object-cover"
            />
          </ScrollReveal>
          <figcaption class="mt-3 text-xs text-muted">
            Placeholder image. Floor plans are not part of the concept data.
          </figcaption>
        </figure>
      </div>
    </AppContainer>

    <section class="bg-raised py-20 md:py-28" aria-labelledby="gallery-heading">
      <AppContainer>
        <Eyebrow class="mb-5">Project imagery</Eyebrow>
        <SectionTitle
          id="gallery-heading"
          class="mb-10"
          :lines="[{ text: 'Gallery.' }]"
        />
        <div class="grid gap-5 md:grid-cols-3">
          <figure v-for="(image, index) in galleryImages" :key="image">
            <img
              :src="image"
              :alt="`${project.name} architectural image ${index + 1}`"
              loading="lazy"
              class="aspect-[4/3] w-full object-cover"
            />
            <figcaption class="mt-3 text-xs text-muted">
              {{ project.place }} · {{ project.name }}
            </figcaption>
          </figure>
        </div>
      </AppContainer>
    </section>

    <AppContainer
      as="section"
      class="py-20 md:py-28"
      aria-labelledby="viewing-heading"
    >
      <div class="grid gap-10 md:grid-cols-2">
        <div>
          <Eyebrow class="mb-5">Next step</Eyebrow>
          <SectionTitle
            id="viewing-heading"
            :lines="[{ text: 'Request a viewing.' }]"
          />
        </div>
        <form class="grid gap-6" @submit.prevent="sent = true">
          <FormField
            v-for="field in viewingFields"
            :key="field.id"
            :id="field.id"
            :label="field.label"
            :type="field.type"
            :autocomplete="field.autocomplete"
            :name="field.id"
            required
          />
          <AppButton type="submit" class="justify-self-start">
            Request a viewing
          </AppButton>
          <p v-if="sent" role="status" class="text-sm text-sand">
            Thank you. Your viewing request has been noted.
          </p>
        </form>
      </div>
    </AppContainer>

    <RouterLink
      :to="`/developments/${nextProject.slug}`"
      class="group block border-t border-ivory/10 py-20 md:py-28"
    >
      <AppContainer>
        <Eyebrow class="mb-5">Next development</Eyebrow>
        <p
          class="font-display text-5xl font-light transition-colors group-hover:text-sand md:text-8xl"
        >
          {{ nextProject.name }} →
        </p>
      </AppContainer>
    </RouterLink>
  </div>
</template>
