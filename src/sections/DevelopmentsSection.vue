<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '../data/projects'
import StatusChip from '../components/StatusChip.vue'
import TitleReveal from '../components/TitleReveal.vue'
import { useReducedMotion } from '../composables/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)
const root = ref<HTMLElement>()
const track = ref<HTMLElement>()
const reduced = useReducedMotion()
const now = new Date()
const getProgress = (milestones: readonly { date: string; stage: string }[]) => {
  const parseMonth = (value: string) => {
    const [month, year] = value.split(' ')
    return new Date(Number(year), new Date(`${month} 1, 2000`).getMonth(), 1).getTime()
  }
  const start = parseMonth(milestones[0].date)
  const end = parseMonth(milestones[milestones.length - 1].date)
  const current = new Date(now.getFullYear(), now.getMonth(), 1).getTime()
  return Math.min(100, Math.max(0, Math.round(((current - start) / (end - start)) * 100)))
}
const cards = computed(() => projects.map((project) => {
  const today = new Date(now.getFullYear(), now.getMonth(), 1).getTime()
  const milestones = project.milestones.filter((item) => {
    const [month, year] = item.date.split(' ')
    return new Date(Number(year), new Date(`${month} 1, 2000`).getMonth(), 1).getTime() <= today
  })
  return {
    ...project,
    progress: getProgress(project.milestones),
    currentMilestone: milestones.at(-1)?.stage ?? 'Foundation',
  }
}))
let ctx: gsap.Context | undefined

onMounted(() => {
  if (reduced.value || !root.value || !track.value) return
  // One behaviour at every width: the section pins and vertical scrolling
  // drives the row sideways, exactly as it does on desktop.
  ctx = gsap.context(() => {
    const distance = () => Math.max(0, track.value!.scrollWidth - window.innerWidth)
    gsap.to(track.value!, {
      x: () => -distance(),
      ease: 'none',
      scrollTrigger: {
        trigger: root.value,
        start: 'top top',
        end: () => `+=${distance()}`,
        pin: true,
        scrub: true,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      },
    })
  }, root.value)
})

onBeforeUnmount(() => {
  ctx?.revert()
})
</script>

<template>
  <section id="developments" ref="root" class="developments-section overflow-hidden">
    <div ref="track" class="developments-track">
      <div class="developments-intro">
        <p class="eyebrow mb-6">02 · Building now</p>
        <TitleReveal as="h2" class="font-display headline font-light" :lines="[{ text: 'Three developments.' }, { text: 'Three dates.' }]" />
        <p class="mt-6 max-w-sm text-sm text-muted">Follow each one from foundation to handover.</p>
      </div>

      <RouterLink
        v-for="(project, index) in cards"
        :key="project.slug"
        :to="`/developments/${project.slug}`"
        class="development-card group"
      >
        <img :src="project.img" :alt="`${project.name} development`" loading="lazy" class="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
        <div class="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/15 to-ink/10" />
        <span class="absolute right-8 top-6 font-display text-6xl text-ivory/50" aria-hidden="true">0{{ index + 1 }}</span>
        <div class="absolute inset-x-0 bottom-0 p-6 md:p-10">
          <StatusChip :status="project.status" />
          <h3 class="mt-4 font-display text-4xl font-light md:text-6xl">{{ project.name }}</h3>
          <p class="mt-2 text-sm text-ivory/90">{{ project.homes }} · Promised {{ project.promisedHandover }}</p>
          <div class="mt-5">
            <div class="flex justify-between gap-4 text-xs text-ivory/80">
              <span>{{ project.currentMilestone }}</span>
              <span>{{ project.progress }}%</span>
            </div>
            <div class="mt-2 h-px bg-ivory/30">
              <span class="block h-px bg-sand" :style="{ width: `${project.progress}%` }" />
            </div>
          </div>
        </div>
      </RouterLink>

      <RouterLink to="/developments" class="all-developments">
        <span class="font-display text-3xl">All developments →</span>
      </RouterLink>
    </div>
  </section>
</template>

<style scoped>
/* The pinned horizontal row is the layout at every breakpoint. Only the
   measurements scale with the viewport, so phones get the same experience. */
.developments-section { height: 100svh; }
.developments-track { display: flex; width: max-content; height: 100%; flex-direction: row; align-items: center; gap: 1rem; padding: 0 1.5rem; }
.developments-intro { width: 84vw; flex: none; padding-right: 1rem; }
.development-card { position: relative; display: block; width: 84vw; height: 68svh; min-height: 0; flex: none; overflow: hidden; }
.all-developments { display: grid; width: 60vw; height: 68svh; min-height: 0; flex: none; place-items: center; }
@media (min-width: 768px) {
  .developments-track { gap: 1.5rem; padding: 0 3rem; }
  .developments-intro { width: 34vw; max-width: 34rem; padding-right: 3rem; }
  .development-card { width: 62vw; height: 72svh; }
  .all-developments { width: 40vw; height: 72svh; }
}
@media (min-width: 1280px) {
  .all-developments { width: 20vw; }
}
@media (prefers-reduced-motion: reduce) {
  .developments-section { overflow-x: auto; scroll-snap-type: x mandatory; }
  .developments-intro, .development-card, .all-developments { scroll-snap-align: start; }
}
</style>
