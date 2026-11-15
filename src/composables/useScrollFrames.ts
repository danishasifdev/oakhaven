import { ref, type Ref } from 'vue'

// Scrubs a canvas through a locally hosted image sequence. Frames are drawn
// synchronously as scroll progress changes, so the scrub stays smooth even
// while later frames are still streaming in — the sequence only ever plays
// across the contiguous run of frames the browser has decoded so far.
export function useScrollFrames(
  canvas: Ref<HTMLCanvasElement | undefined>,
  options: { count: number; srcFor: (index: number) => string },
) {
  const ready = ref(false)
  const frames: (HTMLImageElement | null)[] = new Array<HTMLImageElement | null>(options.count).fill(null)
  // Longest run of frames decoded from index 0; the sequence can only ever
  // play up to here. Exposed so callers can pace themselves against loading.
  const contiguous = ref(0)
  // Settled frames (loaded or failed) drive the preloader's progress bar, while
  // `complete` lets callers hold the hero back until the whole sequence is in.
  const loadedCount = ref(0)
  const complete = ref(false)
  let progress = 0
  let drawn = -1
  let started = false
  let disposed = false

  const draw = () => {
    const element = canvas.value
    if (!element || contiguous.value === 0) return
    const index = Math.min(Math.round(progress * (options.count - 1)), contiguous.value - 1)
    const frame = frames[index]
    if (!frame || index === drawn) return
    const context = element.getContext('2d')
    if (!context) return
    if (element.width !== frame.naturalWidth || element.height !== frame.naturalHeight) {
      element.width = frame.naturalWidth
      element.height = frame.naturalHeight
    }
    context.drawImage(frame, 0, 0)
    drawn = index
    ready.value = true
  }

  const load = () => {
    let cursor = 0
    let active = 0
    const next = () => {
      if (disposed) return
      // Keep a small queue so the poster frame wins the bandwidth race.
      while (active < 4 && cursor < options.count) {
        const index = cursor++
        active++
        const image = new Image()
        image.decoding = 'async'
        const settle = () => {
          if (disposed) return
          active--
          frames[index] = image.complete && image.naturalWidth > 0 ? image : null
          while (frames[contiguous.value]) contiguous.value++
          loadedCount.value++
          if (loadedCount.value >= options.count) complete.value = true
          draw()
          next()
        }
        image.onload = settle
        image.onerror = settle
        image.src = options.srcFor(index)
      }
    }
    next()
  }

  // Loading is started by the caller, which knows whether motion is allowed.
  const start = () => {
    if (started || disposed || !canvas.value) return
    started = true
    load()
  }

  const seek = (value: number) => {
    progress = Math.min(1, Math.max(0, value))
    draw()
  }

  // Stops the queue when the hero unmounts mid-load.
  const dispose = () => {
    disposed = true
  }

  return { ready, seek, start, dispose, loaded: contiguous, loadedCount, complete }
}
