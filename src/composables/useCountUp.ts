import { onBeforeUnmount, onMounted, ref, type Ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from './useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

export function useCountUp(element: Ref<HTMLElement | undefined>, value: number) {
  const count = ref(value)
  const reduced = useReducedMotion()
  const counter = { value: 0 }
  let ctx: gsap.Context | undefined

  onMounted(() => {
    if (reduced.value || !element.value) return
    count.value = 0
    ctx = gsap.context(() => {
      gsap.to(counter, {
        value,
        duration: 1.6,
        ease: 'power2.out',
        snap: { value: 1 },
        onUpdate: () => { count.value = Math.round(counter.value) },
        scrollTrigger: { trigger: element.value, start: 'top 85%', once: true },
      })
    }, element.value)
  })

  onBeforeUnmount(() => ctx?.revert())
  return count
}
