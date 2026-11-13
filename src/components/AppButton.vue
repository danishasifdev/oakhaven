<script setup lang="ts">
import { computed } from "vue";
import { RouterLink } from "vue-router";

type Variant = "primary" | "outline" | "link";

const props = withDefaults(
  defineProps<{
    to?: string;
    href?: string;
    type?: "button" | "submit" | "reset";
    variant?: Variant;
  }>(),
  { type: "button", variant: "primary" },
);

// A single call site for every action: filled sand for the primary action,
// outlined sand for secondary, underline for editorial text links.
const variants: Record<Variant, string> = {
  primary:
    "bg-sand px-6 text-xs uppercase tracking-[0.18em] text-ink hover:bg-ivory",
  outline:
    "border border-sand px-6 text-xs uppercase tracking-[0.18em] text-sand hover:bg-sand hover:text-ink",
  link: "border-b border-sand pb-1 text-sm tracking-normal normal-case text-sand hover:text-ivory",
};

const tag = computed(() => (props.to ? RouterLink : props.href ? "a" : "button"));
</script>

<template>
  <component
    :is="tag"
    :to="to"
    :href="href"
    :type="tag === 'button' ? type : undefined"
    class="inline-flex min-h-11 items-center justify-center gap-2 transition-colors"
    :class="variants[variant]"
  >
    <slot />
  </component>
</template>
