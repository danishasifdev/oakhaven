<script lang="ts">
// Module scope, so it is remembered for the lifetime of the page: the
// opening sequence auto-plays once per visit, not on every route change.
let playedThisVisit = false
</script>

<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, ref, watch } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '../composables/useReducedMotion'
import { useScrollFrames } from '../composables/useScrollFrames'
import AppContainer from '../components/AppContainer.vue'
import Eyebrow from '../components/Eyebrow.vue'

gsap.registerPlugin(ScrollTrigger)

// Concept footage: public/video/oakhaven (1280×720, 24 fps, 10.1 s), sampled at
// its native 24 fps into a local AVIF sequence (public/img/frames, native
// 1280w) so scrolling steps a frame every ~0.42% of the pin instead of every
// ~0.83%. The clip moves from earthworks through structure, facade and
// interiors to the completed building, so the milestone labels follow its
// scene cuts at ~2.06 s, 4.98 s, 6.35 s and 8.48 s (the last frame lands at
// 10.0 s). Replace with the Solenne time-lapse before launch: re-extract
// frames there and update FRAME_COUNT and the milestone thresholds.
const FRAME_COUNT = 241
const FRAMES_PER_SECOND = 24
const frameSrc = (index: number) => `/img/frames/f_${String(index + 1).padStart(3, '0')}.avif`
const milestones = [
  { label: 'Foundation', at: 0 },
  { label: 'Structure', at: 0.206 },
  { label: 'Facade', at: 0.498 },
  { label: 'Interiors', at: 0.635 },
  { label: 'Handover', at: 0.848 },
]
// Copy rotates with the build: one approved brief headline per 2 s of
// footage. The clip is 10 s long, so each line owns an even 20% band of the
// pinned scroll. All headings are split into three lines to keep the hero
// layout fixed as the copy changes.
const headings = [
  { lines: ['A different', 'perspective', 'on living.'] },
  { lines: ['Built.', 'Delivered.', 'Documented.'] },
  { lines: ['We promise', 'a date. And we', 'hand over on it.'] },
  { lines: ['Three', 'developments.', 'Three dates.'] },
  { lines: ['Every', 'promise.', 'Every date.'] },
]
const VIDEO_SECONDS = (FRAME_COUNT - 1) / FRAMES_PER_SECOND
const HEADING_BAND = 2 / VIDEO_SECONDS
const root = ref<HTMLElement>()
const canvas = ref<HTMLCanvasElement>()
const progress = ref(0)
const reduced = useReducedMotion()
const { ready, seek, start, loaded } = useScrollFrames(canvas, { count: FRAME_COUNT, srcFor: frameSrc })
const activeMilestone = computed(() => {
  let index = 0
  for (let i = 0; i < milestones.length; i++) {
    if (progress.value >= milestones[i].at) index = i
  }
  return index
})

const headingIndex = computed(() =>
  Math.min(Math.floor(progress.value / HEADING_BAND), headings.length - 1),
)
const activeHeading = computed(() => headings[headingIndex.value])
const activeHeadingLabel = computed(() => activeHeading.value.lines.join(' '))
const headingLines = computed(() => {
  let index = 0
  return activeHeading.value.lines.map((line) =>
    line.split('').map((character) => ({ character, index: index++ })),
  )
})
const headingCharacterCount = computed(() => activeHeading.value.lines.join('').length)
// Characters fill across the first 70% of each 2 s band, then hold until the
// next heading, so the colour sweep reads as part of the copy change.
const headingFill = computed(() => {
  if (reduced.value) return headingCharacterCount.value
  const local = Math.min(1, Math.max(0, (progress.value - headingIndex.value * HEADING_BAND) / HEADING_BAND))
  return Math.floor(Math.min(1, local / 0.7) * headingCharacterCount.value)
})

// The remaining scroll-linked states use the same eased playhead as the
// frames, so the zoom, proof line and hint stay in step at any scroll speed.
const mediaScale = computed(() => (reduced.value ? 1 : 1.12 - 0.12 * progress.value))
const proofOpacity = computed(() => (reduced.value ? 1 : Math.min(1, Math.max(0, (progress.value - 0.6) / 0.2))))
const hintOpacity = computed(() => (reduced.value ? 1 : Math.min(1, Math.max(0, 1 - progress.value / 0.1))))

let ctx: gsap.Context | undefined
let pinTrigger: ScrollTrigger | undefined

// Scroll position sets a target; the playhead closes that gap at no more than
// ~48 frames per second, so even a violent flick plays the build through in
// order instead of skipping ahead. Easing keeps ordinary scrolling responsive.
const PLAYHEAD_TIME_CONSTANT = 0.32
const MAX_PROGRESS_PER_SECOND = 0.2
let targetProgress = 0
let lastTick = 0
let autoplay: gsap.core.Tween | undefined

const followPlayhead = () => {
  if (autoplay) return
  const now = performance.now()
  const dt = lastTick ? Math.min(0.05, (now - lastTick) / 1000) : 1 / 60
  lastTick = now
  const delta = targetProgress - progress.value
  if (Math.abs(delta) < 0.0002) {
    if (progress.value !== targetProgress) {
      progress.value = targetProgress
      seek(targetProgress)
    }
    return
  }
  const eased = delta * (1 - Math.exp(-dt / PLAYHEAD_TIME_CONSTANT))
  const maxStep = dt * MAX_PROGRESS_PER_SECOND
  const step = Math.sign(eased) * Math.min(Math.abs(eased), maxStep)
  progress.value += step
  seek(progress.value)
}

// --- Opening sequence -------------------------------------------------------
// When the hero first comes into view, the build sequence plays by itself
// and the scrollbar moves with it, like a video section that scrolls itself
// into the page. Any scroll input — wheel, touch, key, or grabbing the
// scrollbar — stops it instantly and hands control back.
let autoStart: gsap.core.Tween | undefined
let userTookControl = false

const stopAutoplay = () => {
  autoplay?.kill()
  autoplay = undefined
}

const onUserInput = () => {
  userTookControl = true
  autoStart?.kill()
  stopAutoplay()
}

const scrollDown = () => {
  // Fallback when there is nothing to play, or motion is reduced.
  window.scrollBy({ top: window.innerHeight, behavior: reduced.value ? 'auto' : 'smooth' })
}

const playThrough = () => {
  const trigger = pinTrigger
  if (!trigger || !ready.value || autoplay) return scrollDown()
  const pinStart = trigger.start
  const pinEnd = trigger.end
  // A finished sequence replays from the top.
  if (window.scrollY >= pinEnd - 4) window.scrollTo(0, pinStart)
  const state = { p: Math.min(1, Math.max(0, (window.scrollY - pinStart) / (pinEnd - pinStart))) }
  let commanded = window.scrollY
  const finishWhenLoaded = () => {
    if (loaded.value < FRAME_COUNT) {
      autoplay = gsap.delayedCall(0.1, finishWhenLoaded)
      return
    }
    targetProgress = 1
    progress.value = 1
    seek(1)
    commanded = pinEnd
    window.scrollTo(0, pinEnd)
    autoplay = undefined
    playedThisVisit = true
  }
  autoplay = gsap.to(state, {
    p: 1,
    duration: FRAME_COUNT / FRAMES_PER_SECOND,
    ease: 'none',
    onUpdate: () => {
      const p = Math.min(state.p, (loaded.value - 1) / (FRAME_COUNT - 1))
      targetProgress = p
      progress.value = p
      seek(p)
      const y = pinStart + p * (pinEnd - pinStart)
      // A position we did not command means the user took the scrollbar.
      if (Math.abs(window.scrollY - commanded) > 2) return stopAutoplay()
      commanded = y
      window.scrollTo(0, y)
    },
    onComplete: finishWhenLoaded,
  })
}

watch(ready, (isReady) => {
  if (!isReady) return
  autoStart?.kill()
  autoStart = gsap.delayedCall(0.8, () => {
    // Auto-play only on the first visit, only while the hero is in view at
    // the top of the page, and only if the visitor has not scrolled yet.
    if (!userTookControl && !playedThisVisit && !autoplay && window.scrollY <= 4) playThrough()
  })
})

onMounted(() => {
  if (reduced.value) return
  start()
  window.addEventListener('wheel', onUserInput, { passive: true })
  window.addEventListener('touchstart', onUserInput, { passive: true })
  window.addEventListener('keydown', onUserInput)

  const shorterPin = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 1280
  ctx = gsap.context(() => {
    pinTrigger = ScrollTrigger.create({
      trigger: root.value,
      start: 'top top',
      end: shorterPin ? '+=130%' : '+=250%',
      pin: true,
      anticipatePin: 1,
      onUpdate: (self) => {
        targetProgress = self.progress
      },
      onRefresh: (self) => {
        targetProgress = self.progress
      },
    })
    gsap.ticker.add(followPlayhead)
  }, root.value)
})

onBeforeUnmount(() => {
  ctx?.revert()
  pinTrigger?.kill()
  gsap.ticker.remove(followPlayhead)
  stopAutoplay()
  autoStart?.kill()
  window.removeEventListener('wheel', onUserInput)
  window.removeEventListener('touchstart', onUserInput)
  window.removeEventListener('keydown', onUserInput)
})
</script>

<template>
  <section id="top" ref="root" class="relative h-svh overflow-hidden">
    <div class="hero-media absolute inset-0 overflow-hidden" :style="{ transform: `scale(${mediaScale})` }">
      <!-- The first sequence frame doubles as the poster: it is fetched with
           priority, the canvas cross-fades over it once frame one is decoded,
           and it is the static fallback when frames cannot load. With reduced
           motion the poster is the final frame, so the page opens on the
           completed building rather than the first moment of the build. -->
      <img
        class="absolute inset-0 size-full object-cover object-[70%_center] md:object-[65%_center]"
        :src="frameSrc(reduced ? FRAME_COUNT - 1 : 0)"
        alt=""
        fetchpriority="high"
      />
      <canvas
        v-if="!reduced"
        ref="canvas"
        class="absolute inset-0 size-full object-cover object-[70%_center] md:object-[65%_center] transition-opacity duration-500"
        :class="ready ? 'opacity-100' : 'opacity-0'"
        aria-hidden="true"
      ></canvas>
    </div>
    <div class="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/30 to-transparent" />

    <AppContainer class="relative z-10 flex h-full flex-col justify-center">
      <div class="max-w-[76%] md:max-w-none">
        <Eyebrow class="mb-8">Luxury real estate development</Eyebrow>
        <Transition
          enter-active-class="transition duration-150 ease-out"
          enter-from-class="opacity-0 translate-y-2.5"
          leave-active-class="transition duration-150 ease-in"
          leave-to-class="opacity-0 -translate-y-1.5"
          mode="out-in"
        >
          <h1
            :key="headingIndex"
            :aria-label="activeHeadingLabel"
            class="font-display text-[clamp(3.2rem,9vw,8rem)] max-md:text-[clamp(2rem,10vw,8rem)] font-light leading-[0.95] text-ivory"
          >
            <span v-for="(line, i) in headingLines" :key="i" class="block" aria-hidden="true">
              <span
                v-for="(char, j) in line"
                :key="j"
                class="hero-character inline-block transition-colors duration-150"
                :class="[char.character === ' ' ? 'w-[0.25em]' : '', char.index < headingFill ? 'text-ivory' : 'text-muted']"
              >{{ char.character === ' ' ? '\u00a0' : char.character }}</span>
            </span>
          </h1>
        </Transition>
        <p class="hero-proof mt-6 text-sm text-ivory md:text-base" :style="{ opacity: proofOpacity }">
          Nine homes delivered. Nine on time.
        </p>
      </div>
    </AppContainer>

    <ol
      class="absolute top-1/2 z-10 flex -translate-y-1/2 flex-col gap-3 text-right text-[10px] uppercase tracking-[0.16em] [text-shadow:0_1px_10px_rgb(16_17_15/0.75)] right-6 md:gap-5 md:text-xs md:right-[max(3rem,calc(50vw-45rem))]"
      aria-hidden="true"
    >
      <li
        v-for="(milestone, index) in milestones"
        :key="milestone.label"
        :class="index === activeMilestone ? 'text-ivory' : index < activeMilestone ? 'text-sand' : 'text-muted'"
      >{{ milestone.label }}</li>
    </ol>
    <p class="sr-only">
      The Solenne construction milestones: {{ milestones.map((milestone) => milestone.label).join(', ') }}.
    </p>

    <div class="hero-hint absolute bottom-8 z-10 flex items-end justify-between gap-6 inset-x-6 md:inset-x-[max(3rem,calc(50vw-45rem))]" :style="{ opacity: hintOpacity }">
      <button
        type="button"
        class="flex min-h-11 items-center gap-4 text-left text-xs"
        @click="playThrough"
      >
        <span class="grid size-11 shrink-0 place-items-center rounded-full border border-ivory/40 text-lg" aria-hidden="true">↓</span>
        <span>Watch it get built</span>
      </button>
      <p class="max-w-48 text-right text-xs text-ivory/80 md:max-w-none">
        The Solenne · Palm Jumeirah · Handover Nov 2026
      </p>
    </div>
  </section>
</template>
