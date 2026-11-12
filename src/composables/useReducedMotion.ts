import { ref, onMounted, onBeforeUnmount } from 'vue'
export function useReducedMotion() {
  const reduced = ref(false)
  let mq: MediaQueryList
  const sync = () => (reduced.value = mq.matches)
  onMounted(() => { mq = matchMedia('(prefers-reduced-motion: reduce)'); sync(); mq.addEventListener('change', sync) })
  onBeforeUnmount(() => mq?.removeEventListener('change', sync))
  return reduced
}
