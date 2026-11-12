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

gsap.registerPlugin(ScrollTrigger)

// Concept footage: public/video/veren (1280×720, 24 fps, 10.1 s), sampled at
// 12 fps into a local AVIF sequence (public/img/frames, native 1280w). The
// clip moves from earthworks through structure, facade and interiors to the
// completed building, so the milestone labels follow its scene cuts at
// ~2.06 s, 4.98 s, 6.35 s and 8.48 s (the last frame lands at 10.0 s).
// Replace with the Solenne time-lapse before launch: re-extract frames there
// and update FRAME_COUNT and the milestone thresholds.
const FRAME_COUNT = 121
const FRAMES_PER_SECOND = 12
const frameSrc = (index: number) => `/img/frames/f_${String(index + 1).padStart(3, '0')}.avif`
const milestones = [
  { label: 'Foundation', at: 0 },
  { label: 'Structure', at: 0.206 },
  { label: 'Facade', at: 0.498 },
  { label: 'Interiors', at: 0.635 },
  { label: 'Handover', at: 0.848 },
]
const lines = ['A different', 'perspective', 'on living.']
// Timeline is normalized to a total duration of 1 so tween positions map
// directly to fractions of the pinned scroll.
const characterCount = lines.join('').length
const characterDuration = 0.5
const characterStagger = (0.8 - characterDuration) / (characterCount - 1)
// Hex twins of --color-muted / --color-ivory from src/styles/main.css.
const muted = '#A6A399'
const ivory = '#F0EDE5'
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

let ctx: gsap.Context | undefined
let timeline: gsap.core.Timeline | undefined

// --- Opening sequence -------------------------------------------------------
// When the hero first comes into view, the build sequence plays by itself
// and the scrollbar moves with it, like a video section that scrolls itself
// into the page. Any scroll input — wheel, touch, key, or grabbing the
// scrollbar — stops it instantly and hands control back.
let autoplay: gsap.core.Tween | undefined
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
  const trigger = timeline?.scrollTrigger
  if (!trigger || !ready.value || autoplay) return scrollDown()
  const pinStart = trigger.start
  const pinEnd = trigger.end
  // A finished sequence replays from the top.
  if (window.scrollY >= pinEnd - 4) window.scrollTo(0, pinStart)
  const state = { p: Math.min(1, Math.max(0, (window.scrollY - pinStart) / (pinEnd - pinStart))) }
  let commanded = window.scrollY
  autoplay = gsap.to(state, {
    p: 1,
    // The opening sequence plays at the footage's own pace, so the five
    // phases read as a build rather than a blur.
    duration: FRAME_COUNT / FRAMES_PER_SECOND,
    ease: 'power1.inOut',
    onUpdate: () => {
      // The scrollbar never outruns the frames decoded so far, so video and
      // scroll stay in lockstep on any connection.
      const p = Math.min(state.p, (loaded.value - 1) / (FRAME_COUNT - 1))
      const y = pinStart + p * (pinEnd - pinStart)
      // A position we did not command means the user took the scrollbar.
      if (Math.abs(window.scrollY - commanded) > 2) return stopAutoplay()
      commanded = y
      window.scrollTo(0, y)
    },
    onComplete: () => {
      autoplay = undefined
      playedThisVisit = true
    },
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
    timeline = gsap.timeline({
      scrollTrigger: {
        trigger: root.value,
        start: 'top top',
        end: shorterPin ? '+=130%' : '+=250%',
        pin: true,
        scrub: true,
        anticipatePin: 1,
        onUpdate: (trigger) => {
          progress.value = trigger.progress
          seek(trigger.progress)
        },
      },
    })

    timeline.fromTo('.hero-character', { color: muted }, {
      color: ivory,
      stagger: characterStagger,
      ease: 'none',
      duration: characterDuration,
    }, 0)
    timeline.fromTo('.hero-proof', { opacity: 0 }, {
      opacity: 1,
      ease: 'none',
      duration: 0.2,
    }, 0.6)
    timeline.fromTo('.hero-hint', { opacity: 1 }, {
      opacity: 0,
      ease: 'none',
      duration: 0.1,
    }, 0)
    timeline.fromTo('.hero-media', { scale: 1.12 }, {
      scale: 1,
      ease: 'none',
      duration: 1,
    }, 0)
  }, root.value)
})

onBeforeUnmount(() => {
  ctx?.revert()
  stopAutoplay()
  autoStart?.kill()
  window.removeEventListener('wheel', onUserInput)
  window.removeEventListener('touchstart', onUserInput)
  window.removeEventListener('keydown', onUserInput)
})
</script>

<template>
  <section id="top" ref="root" class="relative h-svh overflow-hidden">
    <div class="hero-media absolute inset-0 overflow-hidden">
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

    <div class="relative z-10 mx-auto flex h-full w-full max-w-[90rem] flex-col justify-center px-6 md:px-12">
      <div class="max-w-[72%] md:max-w-none">
        <p class="eyebrow mb-8">Luxury real estate development</p>
        <h1
          aria-label="A different perspective on living."
          class="font-display text-[clamp(3.2rem,9vw,8rem)] font-light leading-[0.95] text-ivory"
        >
          <span v-for="(line, i) in lines" :key="i" class="block" aria-hidden="true">
            <span
              v-for="(character, j) in line.split('')"
              :key="j"
              class="hero-character inline-block"
              :class="{ 'w-[0.25em]': character === ' ' }"
            >{{ character === ' ' ? '\u00a0' : character }}</span>
          </span>
        </h1>
        <p class="hero-proof mt-6 text-sm text-ivory md:text-base">
          Nine homes delivered. Nine on time.
        </p>
      </div>
    </div>

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

    <div class="hero-hint absolute bottom-8 z-10 flex items-end justify-between gap-6 inset-x-6 md:inset-x-[max(3rem,calc(50vw-45rem))]">
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
