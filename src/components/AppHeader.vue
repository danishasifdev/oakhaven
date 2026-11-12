<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

const open = ref(false);
const scrolled = ref(false);
const route = useRoute();
const menuButton = ref<HTMLButtonElement>();
const menu = ref<HTMLElement>();
const links = [
  ["Developments", "/developments"],
  ["Record", "/record"],
  ["About", "/about"],
  ["Locations", "/locations"],
  ["Contact", "/contact"],
] as const;

// The navbar floats over the hero at rest and turns into a solid bar as soon
// as the visitor scrolls, so it stays legible over any imagery below.
const onScroll = () => {
  scrolled.value = window.scrollY > 32;
};

const onKeydown = (event: KeyboardEvent) => {
  if (event.key === "Escape" && open.value) {
    open.value = false;
    menuButton.value?.focus();
  }
};

watch(
  () => route.fullPath,
  () => {
    open.value = false;
  },
);

// Lock the page behind the open menu and move focus into it.
watch(open, async (isOpen) => {
  document.documentElement.style.overflow = isOpen ? "hidden" : "";
  if (isOpen) {
    window.addEventListener("keydown", onKeydown);
    await nextTick();
    const first = menu.value?.querySelector("a");
    if (first instanceof HTMLAnchorElement) first.focus();
  } else {
    window.removeEventListener("keydown", onKeydown);
  }
});

// Closing the menu when the viewport grows past the breakpoint keeps the
// scroll lock from sticking if the menu is hidden by a width change.
const desktop = window.matchMedia("(min-width: 768px)");
const onDesktop = () => {
  if (desktop.matches) open.value = false;
};

onMounted(() => {
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  desktop.addEventListener("change", onDesktop);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", onScroll);
  window.removeEventListener("keydown", onKeydown);
  desktop.removeEventListener("change", onDesktop);
  document.documentElement.style.overflow = "";
});
</script>

<template>
  <header class="fixed inset-x-0 top-0 z-50">
    <!-- At rest a soft wash keeps the links readable over bright footage; it
         cross-fades into a solid bar once the page is scrolled. -->
    <div
      class="pointer-events-none absolute inset-x-0 top-0 h-40 bg-linear-to-b from-ink/70 to-transparent transition-opacity duration-300"
      :class="scrolled || open ? 'opacity-0' : 'opacity-100'"
      aria-hidden="true"
    />
    <div
      class="absolute inset-0 border-b transition-colors duration-300"
      :class="
        scrolled || open
          ? 'border-ivory/10 bg-ink/85'
          : 'border-transparent bg-transparent'
      "
      aria-hidden="true"
    />
    <div
      class="relative z-10 flex items-center justify-between px-6 py-4 md:px-12"
    >
      <RouterLink
        to="/"
        class="font-display text-2xl tracking-[0.3em]"
        aria-label="VÉRÉN home"
        >VÉRÉN</RouterLink
      >
      <nav
        class="hidden gap-10 text-xs tracking-wide md:flex"
        aria-label="Primary"
      >
        <RouterLink
          v-for="[label, to] in links"
          :key="to"
          :to="to"
          class="transition-colors hover:text-sand border-b border-transparent hover:border-sand"
          active-class="text-sand"
          >{{ label }}</RouterLink
        >
      </nav>
      <button
        ref="menuButton"
        class="grid size-11 place-items-center rounded-full border border-ivory/40 md:hidden"
        :aria-expanded="open"
        aria-controls="menu"
        :aria-label="open ? 'Close menu' : 'Open menu'"
        @click="open = !open"
      >
        <span
          class="block h-px w-4 origin-center bg-ivory transition-transform duration-300"
          :class="open ? 'translate-y-[3.5px] rotate-45' : ''"
        />
        <span
          class="-mb-0.5 mt-1.5 block h-px w-4 origin-center bg-ivory transition-transform duration-300"
          :class="open ? 'translate-y-[-3.5px] -rotate-45' : ''"
        />
      </button>
    </div>
    <Transition name="menu">
      <nav
        v-if="open"
        id="menu"
        ref="menu"
        class="fixed inset-0 z-0 flex flex-col justify-center gap-1 bg-ink px-6 md:hidden"
        aria-label="Menu"
      >
        <RouterLink
          v-for="[label, to] in links"
          :key="to"
          :to="to"
          class="inline-flex min-h-11 items-center font-display text-5xl font-light transition-colors hover:text-sand"
          active-class="text-sand"
          @click="open = false"
          >{{ label }}</RouterLink
        >
      </nav>
    </Transition>
  </header>
</template>

<style>
.menu-enter-active,
.menu-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}
.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: translateY(-2rem);
}
</style>
